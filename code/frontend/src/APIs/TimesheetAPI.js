import axios from "axios";
import {getCurrentPeriod} from "./PeriodAPI";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("URL: " + BACKEND_URL);


async function getAll(jhed) {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/timesheets?jhed=${jhed}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function getAllCurrent(jhed) {
    try {
      const response = await axios.get(`${BACKEND_URL}/api/timesheets?jhed=${jhed}&current=true`);
      return response.data.data;
    } catch (err) {
      console.log(err);
      return [];
    }
}

async function getAllPast(jhed) {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/timesheets?jhed=${jhed}&past=true`);
        return response.data.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function create(job_id, jhed, date, start_hours, end_hours, approval) {
    
    try {
        const response = await axios({
            url: `${BACKEND_URL}/api/timesheets`,
            method: 'post',
            data: {
                job_id: job_id,
                jhed: jhed,
                date: date,
                start_hours: start_hours,
                end_hours: end_hours,
                approval: approval,
            }
        });
        return response.data.data;
    } catch (err) {
        return err.response.data.errors[0].code || "unknown";
    }
}

async function getTotalHoursByPeriod(user, jhed) {
    if (user === "admin") {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/timesheets?total=true&ajhed=${jhed}`);
            return response.data.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    } else if (user === "employer") {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/timesheets?total=true&ejhed=${jhed}`);
            return response.data.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    } else if (user === "employee") {
        try {
            const response = await axios.get(`${BACKEND_URL}/api/timesheets?total=true&jhed=${jhed}`);
            return response.data.data;
        } catch (err) {
            console.log(err);
            return [];
        }
    } else {
        return null;
    }
}

async function updateApprovalStatusCurrentPeriod( jhed, approval ){
    const current_period = await getCurrentPeriod();
    const start_date = current_period.start_date;
    const end_date = current_period.end_date;
    if (approval === "Approve") {
        approval = true;
    } else if (approval === "Disapprove") {
        approval = false;
    } else {
        return null;
    }

    try {
        const response = await axios({
            url: `${BACKEND_URL}/api/timesheets?jhed=${jhed}&many=true&start_date=${start_date}&end_date=${end_date}`,
            method: 'patch',
            data: {
                approval: approval
            }
        });
        return response.data.data;
    } catch (err) {
        console.log(err);
        return null;
    }

    return null;
}

export { getTotalHoursByPeriod, create, getAll, updateApprovalStatusCurrentPeriod, getAllCurrent, getAllPast };

