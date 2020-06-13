 //chercher la librairie express qui permet de créer rapidement un serveur HTTP
const express = require('express')

//appeler la fct express() qui est dans la librairie express
const app = express();

const PORT = process.env.PORT || 3000

// set up HTTP server
const server = app.listen(PORT, showListen);

//callback pour s'assurer que le serveur a commencé à écouter le port 3000
function showListen() {
	const port = server.address().port;
	console.log("J'écoute le port: " + port);
}

app.use(express.static('public'))

//WEBSOCKET

const io =  require('socket.io')(server);

// (arguments) => {le code de la fct}
io.sockets.on('connection', (socket) => {
	//we are in the callback function
	console.log ("We have a new websocket connection, " + socket.id)

	socket.on('trigger-clicked-cell', (data) => {
	console.log(data)

	io.sockets.emit('clickcell', data);

	})
});
	