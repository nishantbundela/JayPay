import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("URL: " + BACKEND_URL);

async function getAll() {
    try {
        const response = await axios.get(`${BACKEND_URL}/api/employees`);
        return response.data.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function getDashboard(query) {
    try {
        let response;
        if (query) {
            response = await axios.get(`${BACKEND_URL}/api/employees?dashboard=true&${query}`);
        } else {
            response = await axios.get(`${BACKEND_URL}/api/employees?dashboard=true`);
        }
        return response.data.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

async function create(employee) {
    try {
        const response = await axios({
            url: `${BACKEND_URL}/api/employees`,
            method: 'post',
            data: {
                jhed: employee.jhed,
                first_name: employee.first_name,
                last_name: employee.last_name,
                user_role: employee.user_role,
                nationality: employee.nationality,
                ejhed: employee.ejhed,
                ajhed: employee.ajhed
            }
        });
        return response.data.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}

// async function update(jhed, ) {
//     try {
//         const response = await axios({
//             url: `${BASE_URL}/api/courses/${courseId}`,
//             method: 'patch',
//             headers: headers,
//             data: {
//                 status: status
//             }
//         });
//         return response.data.data;
//     } catch (err) {
//         console.log(err);
//         return null;
//     }
// }

async function remove(jhed) {
    try {
        const response = await axios.delete(`${BACKEND_URL}/api/employees/${jhed}`);
        return response.data.data;
    } catch (err) {
        console.log(err);
        return null;
    }
}

export { getAll, create, remove, getDashboard };