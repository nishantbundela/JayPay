// Set Express app
const express = require("express");
const router = express.Router();

// import Department DAO
const EmployeeDao = require("../models/EmployeeDao.js");
const employees = new EmployeeDao();

// import errorHandler
const errorHandler = require("./errorHandler.js");

/**
 * Create a employee with the fields.
 */
router.post("/api/employees", async (req, res) => {
    const { jhed, first_name, last_name, department } = req.body;

    employees
        .create(jhed, first_name, last_name, department)
        .then((employee) => res.status(201).json({ data: employee }))
        .catch((err) => errorHandler(res, 400, err));
})

/**
 * Read all employees in DB, or read all employees with the given query params.
 */
router.get("/api/employees", async (req, res) => {
    const { first_name, last_name, department, dashboard, jhed, ejhed } = req.query;

    if (dashboard != null && dashboard.toLowerCase() == "true") {
        employees
            .readDashboard(department, jhed, ejhed)
            .then((employees) => res.json({data: employees}))
            .catch((err) => errorHandler(res, 500, err));
    } else {
        employees
            .read(first_name, last_name, department)
            .then((employees) => res.json({data: employees}))
            .catch((err) => errorHandler(res, 500, err));
    }
});

/**
 * Read a employee with the given jhed.
 */
router.get("/api/employees/:jhed", (req, res) => {
    const { jhed } = req.params;

    employees
        .readByJhed(jhed)
        .then((employee) =>
            employee
                ? res.json({ data : employee })
                : errorHandler(res, 404, "Resource not found")
        )
        .catch((err) => errorHandler(res, 500, err));
});

/**
 * Update the values of a employee with the given id.
 */
router.patch("/api/employees/:jhed", (req, res) => {
    const { jhed } = req.params;
    const { first_name, last_name, department } = req.body;

    employees
        .updateByJhed(jhed, first_name, last_name, department)
        .then((employee) => res.json({ data : employee }))
        .catch((err) => errorHandler(res, 404, "Resource not found"));
});

/**
 * Delete a employee with the given id.
 */
router.delete("/api/employees/:jhed", (req, res) => {
    const { jhed } = req.params;

    employees
        .deleteByJhed(jhed)
        .then((employee) => res.json({ data : employee }))
        .catch((err) => errorHandler(res, 404, "Resource not found"));
});

module.exports = router;