// Set Express app
const express = require("express");
const router = express.Router();

// import Department DAO
const JobDao = require("../models/JobDao.js");
const jobs = new JobDao();

// import errorHandler
const errorHandler = require("./errorHandler.js");

/**
 * Create a job with the fields.
 */
router.post(`/api/jobs`, async (req, res) => {
    const { id, title, wage, hour_limit, department, active, grant_id, jhed, ejhed, ajhed } = req.body;

    jobs
        .create(id, title, wage, hour_limit, department, active, grant_id, jhed, ejhed, ajhed)
        .then((job) => res.status(201).json({ data: job }))
        .catch((err) => errorHandler(res, 400, err));
});

/**
 * Read all jobs in DB, or read all jobs with the given query params.
 */
router.get("/api/jobs", async (req, res) => {
    const { title, wage, hour_limit, department, active, grant_id, jhed, ejhed, ajhed, dashboard, timesheets } = req.query;

    if (dashboard != null && dashboard.toLowerCase() == "true") {
        jobs
            .readDashboard( department, jhed, ejhed )
            .then((jobs) => res.json({ data: jobs }))
            .catch((err) => errorHandler(res, 500, err));
    } else {
        jobs
            .read(title, wage, hour_limit, department, active, grant_id, jhed, ejhed, ajhed, timesheets)
            .then((jobs) => res.json({ data: jobs }))
            .catch((err) => errorHandler(res, 500, err));
    }
});

/**
 * Read a job with the given id.
 */
router.get("/api/jobs/:id", (req, res) => {
    const { id } = req.params;

        jobs
            .readById(id)
            .then((job) =>
                job
                    ? res.json({ data: job })
                    : errorHandler(res, 404, "Resource not found")
            )
            .catch((err) => errorHandler(res, 500, err));
});

/**
 * Update the values of a job with the given id.
 */
router.patch("/api/jobs/:id", (req, res) => {
  const { id } = req.params;
  const { title, wage, hour_limit, department, active, grant_id, jhed, ejhed, ajhed } = req.body;

  jobs
      .updateJob(id, title, wage, hour_limit, department, active, grant_id, jhed, ejhed, ajhed)
      .then((job) => res.json({ data: job }))
      .catch((err) => {
          if (err.code === 'P2002') {
              errorHandler(res, 400, "jhed already exists", err.code);
          } else if (err.code === 'P2003') {
              errorHandler(res, 400, "Employee does not exist", err.code);
          } else {
              errorHandler(res, 400, "Invalid request", err.code);
          }
      });
});

/**
 * Delete a job with the given id.
 */
router.delete("/api/jobs/:id", (req, res) => {
  const { id } = req.params;

  jobs
      .deleteById(id)
      .then((id) => res.json({ data: id }))
      .catch((err) => errorHandler(res, 404, "Resource not found"));
});

module.exports = router;
