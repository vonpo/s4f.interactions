var SocketIo = require('socket.io');
var io = null;

function bootstrap(app) {
	io = new SocketIo(app, { key : true});

	io.on('connection', function (socket) {
		socket.on('disconnect', function () {
			console.log('user disconnected');
		});

		socket.on('vote', function (msg) {
			console.log('message: ' + msg);
			io.emit(msg.parent + ':vote', msg);
		});

		socket.on('newParticipant', function (msg) {
			console.log('message: ' + msg);
			io.emit(msg.parent + ':newParticipant', msg);
		});

		socket.on('changeScreen', function(msg) {
			io.emit(msg.parent + ':changeScreen', msg);
		});
	});
}

function getIo() {
	if (io === null) {
		throw 'IO is not set';
	}
	return io;
}

exports.bootstrap = bootstrap;
exports.io = getIo;
