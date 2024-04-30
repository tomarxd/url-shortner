const express = require("express");
const app = express();
const PORT = 8000;
const cookieParser = require("cookie-parser");

const urlRoute = require("./routes/url.router");
const staticRoute = require("./routes/StaticRouter");
const userRoute = require("./routes/user.router");
const {
  restrictToLoggedInUserOnly,
  checkAuth,
} = require("./middlewares/auth.middleware");

const { connectMongoDb } = require("./connect");
const path = require("path");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectMongoDb("mongodb://localhost:27017/url-shortner").then(() => {
  console.log("MongoDb connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", restrictToLoggedInUserOnly, urlRoute);
app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
