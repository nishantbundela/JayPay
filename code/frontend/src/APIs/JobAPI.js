import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
console.log("URL: " + BACKEND_URL);

async function getAll() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/jobs`);
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
      response = await axios.get(`${BACKEND_URL}/api/jobs?dashboard=true&${query}`);
    } else {
      response = await axios.get(`${BACKEND_URL}/api/jobs?dashboard=true&`);
    }
    return response.data.data;
  } catch (err) {
    console.log(err);
    return [];
  }
}

async function create(job) {
  try {
    const response = await axios({
      url: `${BACKEND_URL}/api/jobs`,
      method: "post",
      data: {
        id: job.job_id,
        title: job.role_title,
        jhed: job.jhed,
        ejhed: job.ejhed,
        ajhed: job.ajhed,
        wage: job.wage,
        hour_limit: job.hour_limit,
        department: job.department_title,
        job_active: job.job_active,
        grant_id: job.grant_id,
      },
    });
    return response.data.data;
  } catch (err) {
    console.log(err.response.data.errors[0].code);
    return 400; //Doing this for now because above returns undefined
  }
}

// async function update(jhed) {
//     try {
//         const response = await axios({
//             url: `${BACKEND_URL}/api/courses/${jhed}`,
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

async function assignEmployee(id, jhed) {
  try {
    const response = await axios({
      url: `${BACKEND_URL}/api/jobs/${id}`,
      method: "patch",
      data: {
        jhed: jhed
      },
    });
    return response.data.data;
  } catch (err) {
    console.log(err.response.data.errors[0].code);
    return err.response.data.errors[0].code || "unknown";
  }
}

async function remove(jhed) {
  try {
    const response = await axios.delete(`${BACKEND_URL}/api/jobs/${jhed}`);
    return response.data.data;
  } catch (err) {
    console.log(err);
    return null;
  }
}

export { getAll, create, remove, getDashboard, assignEmployee };
