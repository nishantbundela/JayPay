// Set Express app
const express = require("express");
const router = express.Router();

// import Department DAO
const PeriodDao = require("../models/PeriodDao.js");
const periods = new PeriodDao();

// import errorHandler
const errorHandler = require("./errorHandler.js");

/**
 * Read current Period.
 */
router.get("/api/periods", async (req, res) => {
    periods
        .getCurrentPeriod()
        .then((period) => res.json({ data: period }))
        .catch((err) => errorHandler(res, 500, err));
});

module.exports = router;
