"use strict";

const db = require("../db");

exports.newUser = async user => {
  try {
    console.log('User is ', user.payload.uid);
    const insertUser = `INSERT INTO "user"(uid, name, email, created_on) VALUES ($1, $2, $3, CURRENT_TIMESTAMP)`;
    const userValues = [user.payload.uid, user.payload.name, user.payload.email];
    await db.query(insertUser, userValues);
    console.log("Added user");
  } catch (e) {
    console.log(e, "Error adding new user");
  }
};

exports.getUsers = async (user,pool) => {
  try {
    const getAllUsers = `SELECT * from "user"`;
    const users = await db.query(getAllUsers);
    return users.rows

  } catch (e) {
    console.log(e, "Error getting all users");
  }
}
