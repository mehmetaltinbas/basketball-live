import { updateGames } from "./update-games.js";

const socket = io("http://localhost:8000", {
  path: "/websocket/"
});

console.log(socket)

socket.on('connect', () => {
    console.log('connected to server')
    // socket.emit('games', { msg: 'hello from frontend' })
})

socket.on('games', (data) => {
    console.log(data.response)
    updateGames(data.response);
})

socket.on('disconnect', () => {
    console.log('Disconnected from server');
});
