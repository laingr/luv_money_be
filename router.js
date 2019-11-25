"use strict";

const express = require("express");
const controllers = require("./controllers");
const { checkIfAuthenticated } = require("./middlewares");

const router = express.Router();

router.post("/auth/signup", controllers.createUser);
router.post("/pool", controllers.newPool);
router.get("/pool", controllers.getPools);
router.post("/expense", controllers.newExpense);
// router.put("/settings", checkIfAuthenticated, controllers.updateSettings);
// router.get("/settings", checkIfAuthenticated, controllers.getSettings);
// router.post("/payment", checkIfAuthenticated, controllers.newPayment);

// router.get("/articles", checkIfAuthenticated, async (_, res) => {
//   return res.send("THIS WORKS");
// });

module.exports = router;
