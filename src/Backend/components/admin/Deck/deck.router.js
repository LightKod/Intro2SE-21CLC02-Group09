const express = require("express");
const router = express.Router();
const controller = require("./deck.controller");

router.get("/", controller.DeckPage);

module.exports = router;