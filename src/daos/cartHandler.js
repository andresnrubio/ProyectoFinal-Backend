const FileContainer = require("../containers/ContainerFs");

const path = "./dataBase/carrito.txt";

const cartContainer = new FileContainer(path);

module.exports = cartContainer;
