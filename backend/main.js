import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import express from 'express'
import fs from 'fs/promises'

dotenv.config()

const app = express()
const port = process.env.PORT

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

    app.listen(port, () => {
        console.log(`Server running... on port: ${port}`);
    });
})();
