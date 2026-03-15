const Journal = require("../models/Journal");
const analyzeEmotion = require("../utils/analyzeEmotion");

exports.createEntry = async (req, res) => {
  try {
    const { userId, ambience, text } = req.body;
    console.log('req body' , req.body )

    const entry = new Journal({
      userId,
      ambience,
      text
    });
    

    await entry.save();

    res.json(entry);
  } catch (err) {
    res.status(500).json({ error: "Failed to create entry" });
  }
};

exports.getEntries = async (req, res) => {
  try {
    const entries = await Journal.find({
      userId: req.params.userId
    }).sort({ createdAt: -1 });

    res.json(entries);
  } catch (err) {
    res.status(500).json({ error: "Error fetching entries" });
  }
};

exports.analyzeText = async (req, res) => {
  try {

    const { text, entryId } = req.body;

    const result = await analyzeEmotion(text);

    if (entryId) {
      await Journal.findByIdAndUpdate(entryId, {
        emotion: result.emotion,
        keywords: result.keywords,
        summary: result.summary
      });
    }

    res.json(result);

  } catch (error) {

    res.status(500).json({
      error: "Analysis failed"
    });

  }
};





exports.getInsights = async (req, res) => {
  try {

    const userId = req.params.userId;

    const entries = await Journal.find({ userId });

    const totalEntries = entries.length;

    let emotionCount = {};
    let ambienceCount = {};
    let keywords = [];

    entries.forEach(entry => {

      if (entry.emotion) {
        emotionCount[entry.emotion] =
          (emotionCount[entry.emotion] || 0) + 1;
      }

      if (entry.ambience) {
        ambienceCount[entry.ambience] =
          (ambienceCount[entry.ambience] || 0) + 1;
      }

      if (entry.keywords && entry.keywords.length) {
        keywords.push(...entry.keywords);
      }

    });

    const topEmotion = Object.keys(emotionCount).sort(
      (a, b) => emotionCount[b] - emotionCount[a]
    )[0];

    const mostUsedAmbience = Object.keys(ambienceCount).sort(
      (a, b) => ambienceCount[b] - ambienceCount[a]
    )[0];

    const recentKeywords = keywords.slice(-5);

    res.json({
      totalEntries,
      topEmotion,
      mostUsedAmbience,
      recentKeywords
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Failed to generate insights"
    });

  }
};