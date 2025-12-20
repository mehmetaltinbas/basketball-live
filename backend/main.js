import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs/promises'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import { dummyData } from './dummy-data.js'
import { websocketService } from './services/websocket.service.js'

dotenv.config()

const app = express()
const port = process.env.PORT
const server = createServer(app)
const io = new Server(server, {
    path: '/websocket/',
    cors: {
        origin: process.env.FRONTEND_URL,
        methods: ['GET', 'POST'],
        credentials: true
    }
})

app.use(
    cors({
        origin: `${process.env.FRONTEND_URL}`,
        credentials: true,
    }),
);
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

async function loadControllers() {
    try {
        const files = await fs.readdir('./controllers');
        console.log('\n\tloaded controllers');
        for (const file of files) {
            const route = file.replace('.controller.js', '').toLowerCase();
            const controller = await import(`./controllers/${file}`);
            console.log(`/${route}`);
            app.use(`/${route}`, controller.default);
        }
        console.log('\n');
    } catch (err) {
        console.error('Error loading controllers:', err);
    }
}

(async () => {
    await loadControllers();

    io.on('connection', (socket) => {
        console.log("a client connected")

        io.emit('games', dummyData)

        socket.on('disconnect', () => {
            console.log('client disconnected')
        })
    })

    server.listen(port, () => {
        console.log(`Server running... on port: ${port}`);
    });

    await new Promise(resolve => setTimeout(resolve, 5 * 1000))

    websocketService.startPollingGames(io)

})();
