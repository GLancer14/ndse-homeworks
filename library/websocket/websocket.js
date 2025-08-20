const io = require("../index");
console.log(io)

io.on("connection", (socket) => {
  const { id } = socket;
  console.log(`Socket connected: ${id}`);

  const { roomname } = socket.handshake.query;
  console.log(`Socket room name: ${roomname}`);
  
  socket.join(roomname);
  socket.on("message-to-room", (msg) => {
    console.log(msg);
    socket.to(roomname).emit("message-to-room", msg);
    socket.emit("message-to-room", msg);
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${id}`);
  });
});