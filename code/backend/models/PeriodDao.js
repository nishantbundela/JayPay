const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Data Access Object for Admin.
 */
class PeriodDao {
    constructor() {
    }

    async getCurrentPeriod() {
        const today = new Date();

        const period = await prisma.period.findMany({
            where: {
                start_date: {
                    lte: today
                },
                end_date: {
                    gte: today
                }
            }
        });

        return period[0];
    }

    async getPeriod(date) {
        const period = await prisma.period.findMany({
            where: {
                start_date: {
                    lte: date
                },
                end_date: {
                    gte: date
                }
            }
        });
        return period;
    }

    async getAllPastPeriods() {
        const currentPeriod = await this.getCurrentPeriod();

        const periods = await prisma.period.findMany({
            where: {
                id: {
                    lte: currentPeriod.id
                }
            },
            orderBy: {
                id: 'asc'
            }
        });

        return periods;
    }
}

module.exports = PeriodDao;