import { Server } from 'socket.io'

let io: Server
const rooms: { [key: string]: string } = {};

export function setupWebsocket() {

  io = new Server(3334, {
    cors: {
      origin: '*',
    },
  })

  console.log('Started Websocket server on ws://localhost:3334')

  io.on('connection', (socket) => {
    console.log(`🟢 Client connected: ${socket.id}`)

    socket.on('join-room', function(room) {
      console.log(`Client joined room: ${room} ${socket.id}`)
      if(rooms[socket.id]) {
        socket.leave(rooms[socket.id]);
      }
      rooms[socket.id] = room;
      socket.join(room);
    });

    socket.on('message', (data) => {
      console.log('📨 Message received:', data)
      socket.to(rooms[socket.id]).emit('message', data)
    })

    socket.on('disconnect', () => {
      console.log(`🔴 Client disconnected: ${socket.id}`)
    })
  })
}
