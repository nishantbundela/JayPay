import axios from "axios";
import {getCurrentPeriod} from "./PeriodAPI";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("URL: " + BACKEND_URL);

async function getTotalNumJobs(jhed) {
    try {
        const response = await axios({
            url: `${BACKEND_URL}/api/jobs?ejhed=${jhed}`,
            method: 'get'
        });
        return response.data.data.length;
    } catch (err) {
        return "n/a";
    }
}

async function getDashboard(query) {
    try {
        let response;
        if (query) {
            response = await axios.get(`${BACKEND_URL}/api/employers?dashboard=true&${query}`);
        } else {
            response = await axios.get(`${BACKEND_URL}/api/employers?dashboard=true`);
        }
        return response.data.data;
    } catch (err) {
        return [];
    }
}

async function getTotalNumEmployees(jhed) {
    try {
        const response = await axios({
            url: `${BACKEND_URL}/api/jobs?ejhed=${jhed}`,
            method: 'get'
        });
        const data = response.data.data;
        const count = data.filter((obj) => obj.jhed != null).length;
        return count;
    } catch (err) {
        return 0;
    }
}

async function getDashboardInfo(jhed) {
    // total num jobs, total num employees, timesheet pending approval, submitted %
    try {
        const response = await axios({
            url: `${BACKEND_URL}/api/jobs?ejhed=${jhed}&timesheets=true`,
            method: 'get'
        });
        const currentPeriod = await getCurrentPeriod();
        const periodStartDate = currentPeriod.start_date;
        const periodEndDate = currentPeriod.end_date;
        const numJobs = response.data.data.length;
        const activeJobs = response.data.data.filter((obj) => obj.jhed != null);
        const numEmployees = activeJobs.length;
        let timesheetsCurrentPeriod = []
        activeJobs.forEach((job) => {
            timesheetsCurrentPeriod.push(job.timesheet.filter((entry) => entry.date >= periodStartDate && entry.date <= periodEndDate && entry.approved === false));
        });
        const totalPendingTimesheets = getTotalPending(timesheetsCurrentPeriod);
        const submittedRatio = Math.round((((10 * numEmployees) - totalPendingTimesheets) / (10 * numEmployees)) * 100);
        return [numJobs, numEmployees, totalPendingTimesheets, submittedRatio];
    } catch (err) {
        return [0, 0, 0, 0];
    }
}

function getTotalPending(timesheets) {
    let total = 0;
    timesheets.forEach((job) => {
       total += job.length;
    });
    return total;
}

export { getTotalNumJobs, getTotalNumEmployees, getDashboardInfo, getDashboard };