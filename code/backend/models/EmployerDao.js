const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Data Access Object for Employers.
 */
class EmployerDao {
    constructor() {
    }

    async create(jhed, first_name, last_name, job_title, department) {
        const employer = await prisma.employer.create({
            data: {
                jhed: jhed,
                first_name: first_name,
                last_name: last_name,
                job_title: job_title,
                department: department
            },
        })
        return employer;
    }

    async readDashboard(department, employeeJhed) {
        let employers;

        if (employeeJhed) {
            employers = await prisma.employer.findMany({
                where: {
                    department: department,
                    job: {
                        some: {
                            jhed: employeeJhed
                        }
                    }
                },
            });
        } else {
            employers = await prisma.employer.findMany({
                where: {
                    department: department,
                },
            });
        }

        employers = employers.map(employer => ({...employer, faculty: true}));

        return employers;
    }

    async upsert(jhed, first_name, last_name, job_title, department) {
        const employer = await prisma.employer.upsert({
           where: {
               jhed: jhed,
           },
            update: {
               first_name: first_name,
                last_name: last_name,
                job_title: job_title,
                department: department,
            },
            create: {
                jhed: jhed,
                first_name: first_name,
                last_name: last_name,
                job_title: job_title,
                department: department,
            }
        });

        return employer;
    }

    async read(first_name, last_name, job_title, department) {
        const employers = await prisma.employer.findMany({
            where: {
                first_name: first_name,
                last_name: last_name,
                job_title: job_title,
                department: department
            }
        });
        return employers;
    }

    async readByJhed(jhed) {
        const employer = await prisma.employer.findUnique({
            where: {
                jhed: jhed
            },
        });
        return employer;
    }

    async exists(jhed) {
        const employer = await employer.admin
            .findUnique({
                where: {
                    jhed: jhed
                },
            });
        if (employer) return true;
        else return false;
    }

    async deleteByJhed(jhed) {
        const employer = await prisma.employer.delete({
            where: {
                jhed: jhed
            },
        })
        return employer;
    }

    async updateByJhed(jhed, first_name, last_name, job_title, department) {
        const employer = await prisma.employer.update({
            where: {
                jhed: jhed
            },
            data: {
                first_name: first_name,
                last_name: last_name,
                job_title: job_title,
                department: department
            }
        });
        return employer;
    }
}

module.exports = EmployerDao;