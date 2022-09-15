const FileContainer = require("../containers/ContainerFs");

const path = "./dataBase/productos.txt";

const productsContainer = new FileContainer(path);

module.exports = productsContainer;
