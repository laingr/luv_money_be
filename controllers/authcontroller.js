const admin = require("firebase-service");
const models = require("../models");

const createUser = async (req, res) => {
  const userInfo = ({
    email,
    phoneNumber,
    password,
    firstName,
    lastName,
    photoUrl
  } = req.body);

  await models.user.createUser(userInfo);

  const user = await admin.auth().createUser({
    email,
    phoneNumber,
    password,
    displayName: `${firstName} ${lastName}`,
    photoURL: photoUrl
  });

  return res.send(user);
};

module.exports = { createUser };
