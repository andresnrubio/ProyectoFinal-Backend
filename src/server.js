import express from "express"
import mainRouter from "./routes/index.routes.js";
import cookieParser from "cookie-parser";
import * as dotenv from 'dotenv'
dotenv.config()
import path from 'path';

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cookieParser());
const PORT = process.env.PORT;

const { Server: HttpServer } = await import("http");
const httpServer = new HttpServer(app);
const { Server: SocketServer } = await import("socket.io");
import messagesApiContainer from './api/messages.api.js'
const messagesApi = new messagesApiContainer()
const initSocket =()=>{
const io = new SocketServer(httpServer);

  io.on("connection", async (socket) => {
    let dataMessages = await messagesApi.getAllFile();
    socket.emit("chat", dataMessages);

    socket.on("nuevoMensaje", async (data) => {
      await messagesApi.saveMessage(data);
      let dataMessages = await messagesApi.getAllFile();
      io.sockets.emit("chat", dataMessages);
    });
  });
}

initSocket()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

//* ---------------------------------- */
//* -------- Configuracion HBS ------- */
//* ---------------------------------- */

import handlebars from "express-handlebars";
const layoutsFolderPath = path.resolve(__dirname, "./views/layouts");
const defaultLayoutPath = path.resolve(__dirname, "./views/layouts/index.hbs");

app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname,"./views"));

app.engine(
  "hbs",
  handlebars.engine({
    layoutsDir: layoutsFolderPath,
    extname: ".hbs",
    defaultLayout: defaultLayoutPath,
  })
);

//* ---------------------------------- */
//* ------------ Session ------------- */
//* ---------------------------------- */

import session from "express-session"

//* ------- Mongo ---------*/

app.use(session({
    secret: process.env.SESSION_SECRET || '123456',
    resave: true,
    rolling:true,
    saveUninitialized: true,
    cookie:{
      maxAge:10000
    }
}))

//* ---------------------------------- */

app.use("/", mainRouter);


app.get("/", (req, res) => {
  res.render("main", { layouts: "index"});
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send(err);
});

app.all("*", (req, res) => {
  res.status(404).json({ res: "Ruta no implementada" });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

