const User = require("../models/users.model");
const { setUser } = require("../service/auth");
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
  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");
}

module.exports = { createUser, loginUser };
