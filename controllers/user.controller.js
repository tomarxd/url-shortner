const User = require("../models/users.model");
const { v4: uuidv4 } = require("uuid");
const { setUser, getUser } = require("../service/auth");
const { use } = require("../routes/StaticRouter");

async function createUser(req, res) {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.render("home");
}

async function loginUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login", { error: "Invalid username or password" });
  }

  const sessionId = uuidv4();
  setUser(sessionId, user);
  res.cookie("uid", sessionId);
  return res.redirect("/");
}

module.exports = { createUser, loginUser };
