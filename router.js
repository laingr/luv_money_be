"use strict";

const express = require("express");
const controllers = require("./controllers");
const { checkIfAuthenticated } = require("./middlewares");

const router = express.Router();

router.post("/auth/signup", controllers.createUser);
router.get("/users", controllers.getUsers)
router.post("/pool", controllers.newPool);
router.get("/pool", controllers.getPools);
router.post("/expense", controllers.newExpense);
router.put("/settings", controllers.updateSettings);
router.get("/settings", controllers.getSettings);
// comment
// router.post("/payment", checkIfAuthenticated, controllers.newPayment);

// router.get("/articles", checkIfAuthenticated, async (_, res) => {
//   return res.send("THIS WORKS");
// });

module.exports = router;
