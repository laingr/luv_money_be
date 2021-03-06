"use strict";

const express = require("express");
const controllers = require("./controllers");
const { checkIfAuthenticated } = require("./middlewares");

const router = express.Router();

router.post("/auth/signup", controllers.createUser);
router.get("/user", controllers.getUser);
router.post("/pool", controllers.newPool);
router.get("/one-pool", controllers.getPool);
router.get("/pool", controllers.getPools);
router.post("/user-pool", controllers.userPool);
router.get("/poolBE", controllers.getBE);
router.get("/popup", controllers.getPopUp);
router.post("/expense", controllers.newExpense);
router.post("/rule", controllers.newRule);
router.put("/rule", controllers.editRule);
router.put("/settings", controllers.updateSettings);
router.post("/payment", controllers.newPayment);
router.post("/payment", controllers.newPayment);
router.post("/messages", controllers.newMessage);

module.exports = router;
