require('dotenv').config();
const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

//const db = require('./db');
//db.query('select * from player', (_, rows) => {
//  console.log(rows);
//});

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:2000',
    methods: ['GET', 'POST'],
  },
});
const PORT = 9000;

io.on('connection', socket => {
  socket.on('join', gameRoomId => {
    const playerNum = getPlayerNum(io, gameRoomId);

    if (playerNum === 2) {
      return socket.emit('full', 'room is full');
    }

    socket.join(gameRoomId);
    socket.emit('joined', playerNum);
    //console.log(io.sockets.adapter.rooms.get(gameRoomId));

    if (playerNum === 0) {
      socket.emit('waiting', 'waiting for another player to join');
    }

    if (playerNum === 1) {
      io.to(gameRoomId).emit('isTwoPlayer', 'press start to play Tetris!');
    }

    socket.on('nickname', nickname => {
      socket.broadcast.to(gameRoomId).emit('nickname', nickname);
    });

    socket.on('arena-updated', arena => {
      socket.broadcast.to(gameRoomId).emit('arena-updated', arena);
    });

    socket.on('isReady', isReady => {
      socket.broadcast.to(gameRoomId).emit('isReady', isReady);
    });

    socket.on('start', () => io.to(gameRoomId).emit('start', true));

    socket.on('item', item => socket.broadcast.to(gameRoomId).emit('item', item));

    socket.on('paused', () => io.to(gameRoomId).emit('paused', true));

    socket.on('resume', () => io.to(gameRoomId).emit('paused', false));

    socket.on('disconnect', () => {
      //console.log(getPlayerNum(io, gameRoomId));
      socket.broadcast.to(gameRoomId).emit('opponentLeft', 'opponent left the room');
    });
  });
});

const getPlayerNum = (io, roomId) => {
  const joinedPlayers = io.sockets.adapter.rooms.get(roomId);

  return joinedPlayers ? joinedPlayers.size : 0;
};

server.listen(PORT, () => console.log(`listening on port: ${PORT}`));
