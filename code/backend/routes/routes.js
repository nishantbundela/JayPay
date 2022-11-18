// Set Express App
const express = require("express");
const router = express.Router();

/**
 * Send a welcome message.
 */
router.get("/", (req, res) => {
    res.send("Hello Express!");
});

module.exports = router;