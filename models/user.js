"use strict";

const db = require("../db");

exports.newUser = async user => {
  try {
    console.log(user.payload.email);
    const insertUser = `INSERT INTO "user"(uid, name, email, photourl, created_on) VALUES ($1, $2, $3, $4, CURRENT_TIMESTAMP)`;
    const userValues = [user.payload.uid, user.payload.name, user.payload.email, user.payload.photourl];

    console.log(insertUser);
    await db.query(insertUser, userValues);
    console.log("Added user");

  } catch (e) {
    console.log(e, "Error adding new user");
  }
};

exports.getUser = async (data) => {
  try {
    const getUser = `SELECT id from "user" WHERE uid = $1`;
    const getUserValues = [data.uid];
    const user_id = await db.query(getUser, getUserValues);
 
    return user_id.rows[0].id;

  } catch (e) {
    console.log(e, "Error getting all users");
  }
}

exports.getUsers = async (user,pool) => {
  try {
    const getAllUsers = `SELECT * from "user"`;
    const users = await db.query(getAllUsers);
    return users.rows

  } catch (e) {
    console.log(e, "Error getting all users");
  }
}
