"use strict";

exports.newUser = async user => {
  try {
    const insertUser = `INSERT INTO "user"(name, email, created_on) VALUES ($1, $2, CURRENT_TIMESTAMP)`;
    const userValues = [user.displayName, user.email];
    await db.query(insertUser, userValues);
  } catch (e) {
    console.log("Error adding new user");
  }
};
