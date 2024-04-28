const express = require("express");
const app = express();
const PORT = 8000;
const urlRoute = require("./routes/url.router");
const staticRoute = require("./routes/StaticRouter");
const { connectMongoDb } = require("./connect");
const path = require("path");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectMongoDb(
  "mongodb://localhost:27017/url-shortner"
).then(() => {
  console.log("MongoDb connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.listen(PORT, () => {
  console.log(`server is running at ${PORT}`);
});
