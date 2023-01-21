const { Server: HttpServer } = await import("http");
const app = require("../../src/server");
const httpServer = new HttpServer(app);
const { Server: SocketServer } = require("socket.io");
const normalize = require("../normalizr/normalizr.js");
const { messagesApiContainer: messages } = require("../api/messages.api.js")

const initSocket =()=>{
const io = new SocketServer(httpServer);

  io.on("connection", async (socket) => {
    console.log("alguien se conecto");
    // let mensajes = await messages.getAllFile();
    let data = await messages.getAllFile();
    data = await normalize.dataNormalizer(data);
    socket.emit("chat", data);

    socket.on("nuevoMensaje", async (data) => {
      await messages.saveInFile(data);
      let dataMessages = await messages.getAllFile();
      dataMessages = await normalize.dataNormalizer(dataMessages);
      io.sockets.emit("chat", dataMessages);
    });
  });
}

export {initSocket, httpServer}