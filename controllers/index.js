"use strict";

const auth = require("./authcontroller");
const models = require("../models");

exports.createUser = auth.createUser;
exports.createPool = async (req, res) => {
  try {
    const pool = ({ user_id, name, frequency, due_date } = req.body);
    console.log(pool);

    await models.pool.newPool(pool);
    res.status(201);
    res.send();
  } catch (e) {
    console.log(e, "Error making pool");
  }
};
