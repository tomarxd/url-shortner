const generateShortId = require("ssid");
const URL = require("../models/url.model.js");

// function to generate short URL
async function generateShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "URL is required" });
  const shortID = generateShortId();

  await URL.create({
    shortId: shortID,
    redirectURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.render("home", { id: shortID });
}

// function to redirect to a URL
async function redirectToURL(req, res) {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(entry.redirectURL);
}

// function to see the number of clicks
async function getAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  res.json({
    totalClicks: result.visitHistory,
    analytics: result.visitHistory,
  });
}

module.exports = { generateShortURL, redirectToURL, getAnalytics };
