import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("URL: " + BACKEND_URL);

async function getCurrentPeriod() {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/periods`);
        return response.data.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

export { getCurrentPeriod };