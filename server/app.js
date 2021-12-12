require('dotenv').config();
const app = require('express')();
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

//const db = require('./db');
// db.query('select * from player', (_, rows) => {
//   console.log(rows);
// });

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3090',
    methods: ['GET', 'POST'],
  },
});
const PORT = 9000;

io.on('connection', socket => {
  console.log('connected');

  socket.on('enter', gameRoomId => {
    let playerNum = getPlayerNum(io, gameRoomId);

    if (playerNum === 2) {
      socket.emit('full', 'room is full');
      return;
    }

    console.log('entered');
    const data = '';
    socket.join(gameRoomId);
    ++playerNum;
    console.log(io.sockets.adapter.rooms.get(gameRoomId));

    if (playerNum === 1) {
      socket.emit('waiting', 'waiting for another player to join');
    }

    if (playerNum === 2) {
      io.to(gameRoomId).emit('start', 'game will start in 5 secs');
    }

    socket.on('arena-updated', arena => {
      socket.broadcast.to(gameRoomId).emit('arena-updated', {
        arena,
      });
    });

    socket.emit('init', data);

    socket.on('disconnect', () => {
      console.log(getPlayerNum(io, gameRoomId));
      io.to(gameRoomId).emit('end', 'opponent leaved the room');
    });
  });
});

const getPlayerNum = (io, roomId) => {
  const joinedPlayers = io.sockets.adapter.rooms.get(roomId);
  console.log(joinedPlayers);
  if (!joinedPlayers) {
    return 0;
  }
  return joinedPlayers.size;
};

server.listen(PORT, () => console.log(`listening on port: ${PORT}`));
