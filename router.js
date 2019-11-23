"use strict";

const express = require("express");
const controllers = require("./controllers");
const router = express.Router();

router.get("/test", controllers.test);

module.exports = router;
