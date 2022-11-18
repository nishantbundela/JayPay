import axios from "axios";
import {getCurrentPeriod} from "./PeriodAPI";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("URL: " + BACKEND_URL);

async function create(admin) {
    try {
        const response = await axios({
            url: `${BACKEND_URL}/api/admins`,
            method: 'post',
            data: {
                jhed: admin.jhed,
                department: admin.department,
            }
        });
        return response.data.data;
    } catch (err) {
        return err.response.data.errors[0].code || "unknown";
    }
}

async function getTotalNumEmployees(admin) {
    let response;
    try {
        response = await axios({
            url: `${BACKEND_URL}/api/admins/${admin}`,
            method: 'get'
        });
        response = response.data.data
    } catch (err) {
        return "n/a";
    }

    try {
        response = await axios({
            url: `${BACKEND_URL}/api/departments/${response.department}?total=true`,
            method: 'get'
        });
        return response.data.data;
    } catch (err) {
        return "n/a";
    }
}

async function getSubmittedPercent(jhed) {
    // total num jobs, total num employees, timesheet pending approval, submitted %
    try {
        const response = await axios({
            url: `${BACKEND_URL}/api/jobs?ajhed=${jhed}&timesheets=true`,
            method: 'get'
        });
        const currentPeriod = await getCurrentPeriod();
        const periodStartDate = currentPeriod.start_date;
        const periodEndDate = currentPeriod.end_date;
        const activeJobs = response.data.data.filter((obj) => obj.jhed != null);
        const numEmployees = activeJobs.length;
        let timesheetsCurrentPeriod = []
        activeJobs.forEach((job) => {
            timesheetsCurrentPeriod.push(job.timesheet.filter((entry) => entry.date >= periodStartDate && entry.date <= periodEndDate && entry.approved === false));
        });
        const totalPendingTimesheets = getTotalPending(timesheetsCurrentPeriod);
        const submittedRatio = Math.round((((10 * numEmployees) - totalPendingTimesheets) / (10 * numEmployees)) * 100);
        return [submittedRatio];
    } catch (err) {
        return [0]
    }
}

async function getDepartment(jhed) {
    try {
        const response = await axios({
            url: `${BACKEND_URL}/api/admins/${jhed}`,
            method: 'get'
        });
        return response.data.data.department;
    } catch (err) {
        return null;
    }
}

function getTotalPending(timesheets) {
    let total = 0;
    timesheets.forEach((job) => {
        total += job.length;
    });
    return total;
}


export { create, getTotalNumEmployees, getSubmittedPercent, getDepartment };