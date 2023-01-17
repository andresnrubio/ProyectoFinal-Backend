const { Server: HttpServer } = await import("http");
const app = require("../../src/server");
const httpServer = new HttpServer(app);
const { Server: SocketServer } = require("socket.io");
// const normalize = require("../normalizr/normalizr.js");
const productsApi = require("../api/products.api.js");
const messagesApi = require("../api/messages.api.js")

const initSocket =()=>{
const io = new SocketServer(httpServer);

  io.on("connection", async (socket) => {
    let products = await productsApi.getAllFile();
    console.log("alguien se conecto");
    //Enviar la info
    socket.emit("productos", products);

    //Escucha los cambios
    socket.on("product", async (data) => {
      await productsApi.saveInFile(data);
      products = await productsApi.getAllFile();
      io.sockets.emit("productos", products);
    });
  });

  io.on("connection", async (socket) => {
    let mensajes = await messagesApi.getAllFile();
    let data = await messagesApi.readFile();
    data = await normalize.dataNormalizer(data);
    socket.emit("chat", data);

    socket.on("nuevoMensaje", async (data) => {
      await messagesApi.saveInFile(data);
      let dataMessages = await messagesApi.readFile();
      dataMessages = await normalize.dataNormalizer(dataMessages);
      io.sockets.emit("chat", dataMessages);
    });
  });
}

export {initSocket, httpServer}