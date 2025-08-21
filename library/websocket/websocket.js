const socketIO = require("socket.io");
const Books = require("../models/books");

function createSocketIO(server) {
  const io = socketIO(server);
  io.on("connection", (socket) => {
    const { id } = socket;
    console.log(`Socket connected: ${id}`);

    const { roomname } = socket.handshake.query;
    console.log(`Socket room name: ${roomname}`);

    socket.join(roomname);
    socket.on("message-to-room", async (msg) => {
      try {
        await Books.findByIdAndUpdate(roomname, {
          $push: {
            comments: {
              username: msg.username,
              message: msg.message,
            },
          }
        });

        socket.to(roomname).emit("message-to-room", msg);
        socket.emit("message-to-room", msg);
      } catch(e) {
        console.log(e);
      }
    });

    socket.on("disconnect", () => {
      console.log(`Socket disconnected: ${id}`);
    });
  });

  return io;
}

module.exports = createSocketIO;