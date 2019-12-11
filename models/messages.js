"use strict";

const db = require("../db");

exports.newMessage = async (payload) => {
  // //---get original message list---//
  try {
    await db.query(`SELECT * from messages WHERE sender_id = ${payload.sender_id}`);

  //---add message into message table----//
    const addMessage = `INSERT INTO "messages" (sender_id, receiver_id, message, photourl, statement_id, created_on, pool_id) VALUES ($1, $2, $3, $4, $5, $6, $7) `
    const addMessageValues = [payload.sender_id, payload.receiver_id, payload.message, payload.photourl, payload.statement_id, new Date, payload.pool_id]
    await db.query(addMessage, addMessageValues)
    //---add connection into statement_message table---//
    const messageResults = await db.query(`SELECT * from "messages"`)
    const messageInfo = messageResults.rows[0]
    const addID =`INSERT INTO "statement_messages" (statement_id, message_id) VALUES ($1, $2)`
    const addIDValues = [payload.statement_id, messageInfo.id]
    await db.query(addID, addIDValues)
  } catch (e) {
    console.log(e, "Error adding new message");
  }
};
