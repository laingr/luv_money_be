"use strict";

const express = require("express");
const controllers = require("./controllers");
const { checkIfAuthenticated } = require("./middlewares");

const router = express.Router();

router.post("/auth/signup", controllers.createUser);
router.post("/pool", controllers.createPool);
router.get("/articles", checkIfAuthenticated, async (_, res) => {
  return res.send("THIS WORKS");
});

module.exports = router;
