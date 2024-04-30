const jwt = require("jsonwebtoken");
const secret = "Kuldeep$123@$";

function setUser(user) {
  console.log("setUser fn", user);
  return jwt.sign(user.toJSON(), secret);
}

function getUser(token) {
  if (!token) return null;
  try {
    console.log("getUser Fn", token);
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}
module.exports = { setUser, getUser };
