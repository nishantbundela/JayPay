const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const PeriodDao = require("./PeriodDao.js");
const periods = new PeriodDao();

/**
 * Data Access Object for Timesheets.
 */
class TimesheetDao {
    constructor() {
    }

    async create(job_id, jhed, date, start_hours, end_hours, approval) {
        if(approval == "true") approval = true;
        else approval = false;

        const startTime = start_hours.split(":");
        const endTime = end_hours.split(":");
        let dateDate, dateStart, dateEnd;

        if(date != null) {
            dateDate = new Date(date);
            dateStart = new Date(date);
            dateEnd = new Date(date);

            dateStart.setUTCHours(parseInt(startTime[0]), parseInt(startTime[1]));
            dateEnd.setUTCHours(parseInt(endTime[0]), parseInt(endTime[1]));
        }


        const timesheet = await prisma.timesheet.create({
            data: {
                job_id: job_id,
                jhed: jhed,
                date: dateDate,
                start_hours: dateStart,
                end_hours: dateEnd,
                approved: approval
            },
        })
        return timesheet;
    }

    async read(job_id, jhed, date, approval) {
        if(approval == "true") approval = true;
        if(approval == "false") approval = false;

        if(date != null) {
            date = new Date(date);
        }

        let timesheets = await prisma.timesheet.findMany({
            where: {
                job_id: job_id,
                jhed: jhed,
                date: date,
                approved: approval
            },
            orderBy: [
                {date: 'desc'},
                {job_id: 'asc'}
            ]
        });

        timesheets = timesheets.map(function (entry) {
            return {
                job_id: entry.job_id,
                jhed: entry.jhed,
                date: entry.date.toLocaleDateString('en-US', {timeZone: "UTC"}),
                start_hours: entry.start_hours.getUTCHours() + ":" + entry.start_hours.getUTCMinutes().toString().padStart(2, '0'),
                end_hours: entry.end_hours.getUTCHours() + ":" + entry.end_hours.getUTCMinutes().toString().padStart(2, '0'),
                total_hours: entry.total_hours,
                approved: entry.approved,
            };
        });

        return timesheets;
    }

    async readCurrent(jhed) {

        const current = await periods.getCurrentPeriod();
        const start_date = current.start_date;
        const end_date = current.end_date;

        let timesheets = await prisma.timesheet.findMany({
            where: {
                jhed: jhed,
                date: {
                    gte: start_date,
                    lte: end_date
                }
            }
        });

        timesheets = timesheets.map(function (entry) {
            return {
                job_id: entry.job_id,
                jhed: entry.jhed,
                date: entry.date.toLocaleDateString('en-US', {timeZone: "UTC"}),
                start_hours: entry.start_hours.getUTCHours() + ":" + entry.start_hours.getUTCMinutes().toString().padStart(2, '0'),
                end_hours: entry.end_hours.getUTCHours() + ":" + entry.end_hours.getUTCMinutes().toString().padStart(2, '0'),
                total_hours: entry.total_hours,
                approved: entry.approved,
            };
        });

        return timesheets;
    }

    async readPast(jhed) {

        const current = await periods.getCurrentPeriod();
        const start_date = current.start_date;

        let timesheets = await prisma.timesheet.findMany({
            where: {
                jhed: jhed,
                date: {
                    lt: start_date
                }
            },
            orderBy: [
                {date: 'desc'},
                {job_id: 'asc'}
            ]
        });

        timesheets = timesheets.map(function (entry) {
            return {
                job_id: entry.job_id,
                jhed: entry.jhed,
                date: entry.date.toLocaleDateString('en-US', {timeZone: "UTC"}),
                start_hours: entry.start_hours.getUTCHours() + ":" + entry.start_hours.getUTCMinutes().toString().padStart(2, '0'),
                end_hours: entry.end_hours.getUTCHours() + ":" + entry.end_hours.getUTCMinutes().toString().padStart(2, '0'),
                total_hours: entry.total_hours,
                approved: entry.approved,
            };
        });

        return timesheets;
    }d

    async readTotalHours(jhed, ajhed, ejhed) {
        const timesheets = await prisma.timesheet.findMany({
            where: {
                job: {
                    jhed: jhed,
                    ajhed: ajhed,
                    ejhed: ejhed,
                }
            },
            orderBy: {
                date: 'asc'
            },
        });

        // get all past periods
        let pastPeriods = await periods.getAllPastPeriods();
        // add total_hours field to each period
        pastPeriods.forEach(function(elem) {
           elem.total_hours = 0.0;
        });
        let totalTotal = 0;

        // add each timesheet entry's total_horus into corresponding period's total_hours value
        let period = 0;
        for (let i = 0; i < timesheets.length; i++) {
            if (period >= pastPeriods.length) break;
            // date is in previous period
            if (timesheets[i].date < pastPeriods[period].start_date) {
                continue;
            }
            // date is in this period
            else if (timesheets[i].date >= pastPeriods[period].start_date && timesheets[i].date <= pastPeriods[period].end_date) {
                pastPeriods[period].total_hours = pastPeriods[period].total_hours + parseFloat(timesheets[i].total_hours);
                totalTotal = totalTotal + parseFloat(timesheets[i].total_hours);
            }
            // date is in next period
            else {
                period++;
                i--;
                continue;
            }
        }

        return [totalTotal, pastPeriods];
    }

    async delete(job_id, jhed, date, approval) {
        if(approval == "true") approval = true;
        if(approval == "false") approval = false;

        if(date != null) {
            date = new Date(date);
        }

        const timesheets = await prisma.timesheet.deleteMany({
            where: {
                job_id: job_id,
                jhed: jhed,
                date: date,
                approval: approval
            },
        })
        return timesheets;
    }

    async update(job_id, jhed, date, approval) {
        if(approval == "true") approval = true;
        if(approval == "false") approval = false;

        if(date != null) {
            date = new Date(date);
        }

        const timesheet = await prisma.timesheet.updateMany({
            where: {
                job_id: job_id,
                jhed: jhed,
                date: date
            },
            data: {
                approved: approval
            }
        });
        return timesheet;
    }

    async updateMany(jhed, approval, start_date, end_date) {
        if(approval == "true") approval = true;
        if(approval == "false") approval = false;

        console.log("start_date0: " + start_date);

        if(start_date != null && end_date != null) {
            start_date = new Date(start_date);
            end_date = new Date(end_date);
        }

        console.log("start_date: " + start_date);
        console.log("end_date: " + end_date);

        const timesheet = await prisma.timesheet.updateMany({
            where: {
                jhed: jhed,
                date: {
                    gte: start_date,
                    lte: end_date
                }
            },
            data: {
                approved: approval
            }
        });
        return timesheet;
    }
}

module.exports = TimesheetDao;