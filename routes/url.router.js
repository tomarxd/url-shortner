const express = require("express");
const {
  generateShortURL,
  redirectToURL,
  getAnalytics,
} = require("../controllers/url.controller");
const router = express.Router();

router.post("/", generateShortURL);

router.get("/:shortId", redirectToURL);

router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
