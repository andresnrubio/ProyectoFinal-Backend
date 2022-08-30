const FileContainer = require("../container/fileContainer.js");

const path = "./dataBase/productos.txt";

const productsContainer = new FileContainer(path);

module.exports = productsContainer;
