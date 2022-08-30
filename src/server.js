const express = require("express");
const mainRouter = require("../routes/mainRouter.js");

const app = express();
const dotenv = require("dotenv").config()
const PORT = process.env.PORT;

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
