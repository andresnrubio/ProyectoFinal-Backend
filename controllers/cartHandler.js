const FileContainer = require("../container/fileContainer.js");

const path = "./dataBase/cart.txt";

const cartContainer = new FileContainer(path);

module.exports = cartContainer;
