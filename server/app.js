const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: './.env.dev' });
}

//const db = require('./db');

const mailRouter = require('./routes/mail');
//const playerRouter = require('./routes/player');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({ origin: process.env.CLIENT_URL }));

// app.get('/', (req, res) => {
//   db.query('select * from players', (err, row) => {
//     res.send(row);
//   });
// });

app.use('/email', mailRouter);
//app.use('/players', playerRouter);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST'],
  },
});

io.on('connection', socket => {
  socket.on('join', gameRoomId => {
    const playerNum = getPlayerNum(io, gameRoomId);

    if (playerNum === 2) {
      return socket.emit('full', 'room is full');
    }

    socket.join(gameRoomId);
    socket.emit('joined', playerNum);

    if (playerNum === 0) {
      socket.emit('waiting', 'waiting for another player to join');
    }

    if (playerNum === 1) {
      io.to(gameRoomId).emit('isTwoPlayer', 'press start to play Tetris!');
    }

    socket.on('nickname', nickname => {
      socket.broadcast.to(gameRoomId).emit('nickname', nickname);
    });

    const updatedEvents = ['arena-updated', 'score-updated', 'level-updated', 'preview-updated'];

    updatedEvents.forEach(event => {
      socket.on(event, data => {
        socket.broadcast.to(gameRoomId).emit(event, data);
      });
    });

    socket.on('isReady', isReady => {
      socket.broadcast.to(gameRoomId).emit('isReady', isReady);
    });

    socket.on('start', () => io.to(gameRoomId).emit('start', true));

    socket.on('item', item => io.to(gameRoomId).emit('item', { sender: socket.id, ...item }));

    socket.on('paused', () => io.to(gameRoomId).emit('paused', socket.id));

    socket.on('resume', () => io.to(gameRoomId).emit('paused', false));

    socket.on('gameover', score => socket.broadcast.to(gameRoomId).emit('opponentFinished', score));

    socket.on('disconnect', () => {
      socket.leave(gameRoomId);
      socket.broadcast.to(gameRoomId).emit('opponentLeft', 'opponent left the room');
    });
  });
});

const getPlayerNum = (io, roomId) => {
  const joinedPlayers = io.sockets.adapter.rooms.get(roomId);

  return joinedPlayers ? joinedPlayers.size : 0;
};

server.listen(process.env.PORT, () => console.log(`listening on port: ${process.env.PORT}`));
