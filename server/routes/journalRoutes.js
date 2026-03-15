const express = require("express");
const { createEntry, getEntries, analyzeText , getInsights} = require("../controllers/journalController");
const router = express.Router();
// const journalController = require("../controllers/journalController");

router.post("/journal",createEntry);

router.get("/journal/:userId", getEntries);

router.post("/journal/analyze", analyzeText);

router.get("/journal/insights/:userId", getInsights);

module.exports = router;