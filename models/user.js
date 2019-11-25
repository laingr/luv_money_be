"use strict";

const db = require("../db");

exports.newUser = async user => {
  try {
    const insertUser = `INSERT INTO "user"(name, email, created_on) VALUES ($1, $2, CURRENT_TIMESTAMP)`;
    const userValues = [`${user.firstName + " " + user.lastName}`, user.email];
    await db.query(insertUser, userValues);
    console.log("Added user");
  } catch (e) {
    console.log(e, "Error adding new user");
  }
};
