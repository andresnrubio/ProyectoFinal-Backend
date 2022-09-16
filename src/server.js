import express from "express"
import mainRouter from "./routes/mainRouter.js"
import connectDB from './databases/mongoDB/connection.js'

import * as dotenv from 'dotenv'
dotenv.config()
import path from 'path';

import {fileURLToPath} from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT;
connectDB()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "public"));

app.get("/", (req, res) => {});
app.use("/api", mainRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.send(err);
});

app.all("*", (req, res) => {
  res.status(404).json({ res: "Ruta no implementada" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
