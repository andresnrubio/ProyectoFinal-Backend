const FileContainer = require("../container/fileContainer.js");

const path = "./dataBase/carrito.txt";

const cartContainer = new FileContainer(path);

module.exports = cartContainer;
