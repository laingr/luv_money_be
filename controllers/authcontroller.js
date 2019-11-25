const admin = require("firebase-service");

const createUser = async (req, res) => {
  const {
    email,
    phoneNumber,
    password,
    firstName,
    lastName,
    photoUrl
  } = req.body;

  const user = await admin.auth().createUser({
    email,
    phoneNumber,
    password,
    displayName: `${firstName} ${lastName}`,
    photoURL: photoUrl
  });
  await createuserinourdatabase;

  return res.send(user);
};

module.exports = { createUser };
