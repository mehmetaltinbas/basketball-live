const socket = io("http://localhost:8000", {
  path: "/websocket/"
});

socket.on('connect', () => {
    console.log('connected to server')
    // socket.emit('games', { msg: 'hello from frontend' })
})

const inputElement = document.getElementById('input');

let message = '';
inputElement.addEventListener('keydown', (event) => {
    if (event.key === "Backspace") message = message.slice(0, -1)
    else if (event.key !== "Enter") message = message += event.key
    console.log(message)
})

const button = document.getElementById('button')
button.addEventListener('click', () => {
    socket.emit('games', { message })
})