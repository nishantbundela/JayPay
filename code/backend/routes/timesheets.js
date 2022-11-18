// Set Express app
const express = require("express");
const router = express.Router();

// import Timesheets DAO
const TimesheetDao = require("../models/TimesheetDao.js");
const timesheets = new TimesheetDao();

// import errorHandler
const errorHandler = require("./errorHandler.js");

/**
 * Create a timesheet with the fields.
 */
router.post("/api/timesheets", async (req, res) => {
    const { job_id, jhed, date, start_hours, end_hours, approval } = req.body;

    timesheets
        .create(job_id, jhed, date, start_hours, end_hours, approval)
        .then((timesheet) => res.status(201).json({ data: timesheet }))
        .catch((err) => errorHandler(res, 400, err));
})

/**
 * Read all timesheets in DB, or read all timesheets with the given query params.
 */
router.get("/api/timesheets", async (req, res) => {
    const { job_id, jhed, date, approval, total, ajhed, ejhed, current, past } = req.query;

    if (total != null && total.toLowerCase() === "true"){
        timesheets
            .readTotalHours(jhed, ajhed, ejhed)
            .then((totalHours) => {res.json({data: totalHours})})
            .catch((err) => errorHandler(res, 500, err));
    } else if (current != null && current.toLocaleLowerCase() === "true") {
        timesheets
            .readCurrent(jhed)
            .then((timesheets) => {res.json({data: timesheets})})
            .catch((err) => errorHandler(res, 500, err));
    } else if (past != null && past.toLowerCase() === "true") {
        timesheets
            .readPast(jhed)
            .then((timesheets) => {res.json({data: timesheets})})
            .catch((err) => errorHandler(res, 500, err));
    } else {
        timesheets
            .read(job_id, jhed, date, approval)
            .then((timesheets) => res.json({data: timesheets}))
            .catch((err) => errorHandler(res, 500, err));
    }
});


/**
 * Update the values of a timesheet with the given job_id, jhed, and date.
 */
router.patch("/api/timesheets", (req, res) => {
    const { job_id, jhed, date, many, start_date, end_date } = req.query;
    const { approval } = req.body;

    if (many != null && many === "true") {
        timesheets
            .updateMany(jhed, approval, start_date, end_date)
            .then((timesheet) => res.json({ data : timesheet }))
            .catch((err) => errorHandler(res, 404, "Resource not found"));
    } else {
        timesheets
            .update(job_id, jhed, date, approval)
            .then((timesheet) => res.json({ data : timesheet }))
            .catch((err) => errorHandler(res, 404, "Resource not found"));
    }
});

/**
 * Delete timesheets with given values.
 */
router.delete("/api/timesheets", (req, res) => {
    const { job_id, jhed, date, approval } = req.query;

    timesheets
        .delete(job_id, jhed, date, approval)
        .then((timesheet) => res.json({ data : timesheet }))
        .catch((err) => errorHandler(res, 404, "Resource not found"));
});

module.exports = router;