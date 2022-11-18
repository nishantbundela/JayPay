const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * Data Access Object for Jobs.
 */
class JobDao {
    constructor() {}

    async create(id, title, wage, hour_limit, department, active, grant_id, jhed, ejhed, ajhed) {
        const job = await prisma.job.create({
            data: {
                id: id,
                title: title,
                wage: wage,
                hour_limit: hour_limit,
                department: department,
                active: active,
                grant_id: grant_id,
                jhed: jhed,
                ejhed: ejhed,
                ajhed: ajhed
            },
        });
        return job;
    }

    async read(title, wage, hour_limit, department, active, grant_id, jhed, ejhed, ajhed, timesheets) {
        if (timesheets.toLowerCase() === 'true') {
            const jobs = await prisma.job.findMany({
                where: {
                    title: title,
                    wage: wage,
                    hour_limit: hour_limit,
                    department: department,
                    active: active,
                    grant_id: grant_id,
                    jhed: jhed,
                    ejhed: ejhed,
                    ajhed: ajhed
                },
                include: {
                    timesheet: true
                }
            });
            return jobs;
        } else {
            const jobs = await prisma.job.findMany({
                where: {
                    title: title,
                    wage: wage,
                    hour_limit: hour_limit,
                    department: department,
                    active: active,
                    grant_id: grant_id,
                    jhed: jhed,
                    ejhed: ejhed,
                    ajhed: ajhed
                },
            });
            return jobs;
        }
    }

    async readDashboard(department, jhed, ejhed) {
        let jobs = await prisma.job.findMany({
            where: {
                department: department,
                jhed: jhed,
                ejhed: ejhed
            },
            include: {
                employer: true,
                employee: true,
            },
        });

        jobs = jobs.map(function (job) {
            return {
                id: job.id,
                title: job.title,
                department: job.department,
                jhed: job.employee ? job.employee.jhed : "",
                employee_name: job.employee ? job.employee.first_name + " " + job.employee.last_name : "",
                employer_name: job.employer.first_name + " " + job.employer.last_name,
                wage: job.wage,
                hour_limit: job.hour_limit,
            };
        });

      return jobs;
    }

    async readById(id) {
        const job = await prisma.job.findUnique({
            where: {
                id: id,
            },
        });
        return job;
    }

    async deleteById(id) {
        const job = await prisma.job.delete({
            where: {
                id: id,
            },
        });
        return job;
    }

    async updateJob(id, title, wage, hour_limit, department, active, grant_id, jhed, ejhed, ajhed) {
        const job = await prisma.job.update({
            where: {
                id: id,
            },
            data: {
                id: id,
                title: title,
                wage: wage,
                hour_limit: hour_limit,
                department: department,
                active: active,
                grant_id: grant_id,
                jhed: jhed,
                ejhed: ejhed,
                ajhed: ajhed
            },
          });
          return job;
      }
  }

module.exports = JobDao;
