const randomData = require("../../faker/faker");

const express = require("express");
const { Router } = express;

const router = Router();

router.get("/", (req, res) => {
  const data = randomData();
  res.render("test", { layouts: "index", data });
});

module.exports = router;
