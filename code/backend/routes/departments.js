// Set Express app
const express = require("express");
const router = express.Router();

// import Department DAO
const DepartmentDao = require("../models/DepartmentDao.js");
const departments = new DepartmentDao();

// import errorHandler
const errorHandler = require("./errorHandler.js");

/**
 * Create a department with the given title.
 */
router.post(`/api/departments`, async (req, res) => {
    const { title } = req.body;

    departments
        .create(title)
        .then((department) => res.status(201).json({ data: department }))
        .catch((err) => errorHandler(res, 400, err));
})

/**
 * Read all departments in DB.
 */
router.get("/api/departments", async (req, res) => {
    departments
        .readAll()
        .then((departments) => res.json({ data: departments }))
        .catch((err) => errorHandler(res, 500, err));
});

/**
 * Read a department with the given title.
 */
router.get("/api/departments/:title", (req, res) => {
    const { title } = req.params;
    const { total } = req.query;

    if (total != null && total.toLowerCase() === "true") {
        departments
            .getTotalNumEmployees(title)
            .then((total) =>
                total
                    ? res.json({ data : total })
                    : errorHandler(res, 404, "Resource not found")
            )
            .catch((err) => errorHandler(res, 500, err));
    } else {
        departments
            .readByTitle(title)
            .then((department) =>
                department
                    ? res.json({ data : department })
                    : errorHandler(res, 404, "Resource not found")
            )
            .catch((err) => errorHandler(res, 500, err));
    }
});

/**
 * Update the title of a department by the given existing and new name.
 */
router.patch("/api/departments/:title", (req, res) => {
    const { title } = req.params;
    const { toTitle } = req.body;

    departments
        .updateDepartmentTitle(title, toTitle)
        .then((department) => res.json({ data : department }))
        .catch((err) => errorHandler(res, 404, "Resource not found"));
});

/**
 * Delete a department with the given title.
 */
router.delete("/api/departments/:title", (req, res) => {
    const { title } = req.params;

    departments
        .deleteByTitle(title)
        .then((department) => res.json({ data : department }))
        .catch((err) => errorHandler(res, 404, "Resource not found"));
});

module.exports = router;