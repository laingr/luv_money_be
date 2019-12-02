"use strict";

const express = require("express");
const controllers = require("./controllers");
const { checkIfAuthenticated } = require("./middlewares");

const router = express.Router();

router.post("/auth/signup", controllers.createUser);
router.post("/pool", controllers.newPool);
router.get("/pool", controllers.getPools);
router.get("/poolBE", controllers.getBE);
router.get("/popup", controllers.getPopUp);
router.post("/expense", controllers.newExpense);
router.post("/rule", controllers.newRule);
router.put("/rule", controllers.editRule);
router.put("/settings", checkIfAuthenticated, controllers.updateSettings);
// router.post("/statement", checkIfAuthenticated, controllers.payment);


// router.post("/payment", checkIfAuthenticated, controllers.newPayment);

// router.get("/articles", checkIfAuthenticated, async (_, res) => {
//   return res.send("THIS WORKS");
// });

module.exports = router;
