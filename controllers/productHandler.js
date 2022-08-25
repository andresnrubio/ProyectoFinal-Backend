const FileContainer = require("../container/fileContainer.js");

const path = "./dataBase/products.txt";

const productsContainer = new FileContainer(path);

module.exports = productsContainer;
