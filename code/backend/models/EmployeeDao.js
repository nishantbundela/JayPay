const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PeriodDao = require("./PeriodDao.js");
const periods = new PeriodDao();

/**
 * Data Access Object for Employees.
 */
class EmployeeDao {
    constructor() {
    }

    async create(jhed, first_name, last_name, department) {
        const employee = await prisma.employee.create({
            data: {
                jhed: jhed,
                first_name: first_name,
                last_name: last_name,
                department: department
            },
        })
        return employee;
    }

    async upsert(jhed, first_name, last_name, department) {
        const employee = await prisma.employee.upsert({
            where: {
                jhed: jhed,
            },
            update: {
                first_name: first_name,
                last_name: last_name,
                department: department,
            },
            create: {
                jhed: jhed,
                first_name: first_name,
                last_name: last_name,
                department: department,
            }
        });

        return employee;
    }

    async read(first_name, last_name, department) {
        const employees = await prisma.employee.findMany({
            where: {
                first_name: first_name,
                last_name: last_name,
                department: department
            }
        });
        return employees;
    }

    async readByJhed(jhed) {
        const employee = await prisma.employee
            .findUnique({
                where: {
                    jhed: jhed
                },
            });
        return employee;
    }

    async exists(jhed) {
        const employee = await prisma.employee
            .findUnique({
                where: {
                    jhed: jhed
                },
            });
        if (employee) return true;
        else return false;
    }

    async readDashboard(department, jhed, ejhed) {
        const current = await periods.getCurrentPeriod();
        const start_date = current.start_date;
        const end_date = current.end_date;
        let employees;

        if (ejhed) {
            employees = await prisma.employee.findMany({
                where: {
                    department: department,
                    jhed: jhed,
                    jobs: {
                        some: {
                            ejhed: ejhed
                        }
                    }
                },
                include: {
                    jobs: {
                        include: {
                            employer: true,
                            timesheet: {
                                where: {
                                    date: {
                                        gte: start_date,
                                        lte: end_date,
                                    }
                                }
                            }
                        }
                    },
                }
            });
        } else {
            employees = await prisma.employee.findMany({
                where: {
                    department: department,
                    jhed: jhed,
                },
                include: {
                    jobs: {
                        include: {
                            employer: true,
                            timesheet: true
                        }
                    },
                }
            });
        }

        employees = employees.map(function(employee) {
            let total_hours = 0.0
            let approvals = [];
            let jobCount = 0;
            let timesheetCount = 0;

            employee.jobs.map(function(job){
                jobCount++;
                job.timesheet.map(function(entry){
                    timesheetCount++;
                    total_hours += parseFloat(entry.total_hours)
                    approvals.push(entry.approved);
                });
            });

            const approval_status = approvals.every(element => element === true);
            const submit_status = timesheetCount >= jobCount * 10 ? true : false;

            return {
                jhed: employee.jhed,
                first_name: employee.first_name,
                last_name: employee.last_name,
                job_id: employee.jobs.map(function(elem){
                    return elem.id;
                }).join(", "),
                job_title: employee.jobs.map(function(elem){
                    return elem.title;
                }).join(", "),
                employer: employee.jobs.map(function(elem){
                    return elem.employer.first_name + " " + elem.employer.last_name;
                }).join(", "),
                submit_status: submit_status,
                total_hours: Math.round(total_hours * 100) / 100,
                faculty: false,
                approval_status: approval_status,
            }
        });

        return employees;
    }



    async deleteByJhed(jhed) {
        const employee = await prisma.employee.delete({
            where: {
                jhed: jhed
            },
        })
        return employee;
    }

    async updateByJhed(jhed, first_name, last_name, department) {
        const employee = await prisma.employee.update({
            where: {
                jhed: jhed
            },
            data: {
                first_name: first_name,
                last_name: last_name,
                department: department
            }
        });
        return employee;
    }
}

module.exports = EmployeeDao;