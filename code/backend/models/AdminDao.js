const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Data Access Object for Admin.
 */
class AdminDao {
    constructor() {
    }

    async create(jhed, first_name, last_name, department) {
        const admin = await prisma.admin.create({
            data: {
                jhed: jhed,
                first_name: first_name,
                last_name: last_name,
                department: department
            },
        })
        return admin;
    }

    async readAll() {
        const allAdmins = await prisma.admin.findMany();
        return allAdmins;
    }

    async readByJhed(jhed) {
        const admin = await prisma.admin
            .findUnique({
                where: {
                    jhed: jhed
                },
            });
        return admin;
    }

    async exists(jhed) {
        const admin = await prisma.admin
            .findUnique({
                where: {
                    jhed: jhed
                },
            });
        if (admin) return true;
        else return false;
    }

    async deleteByJhed(jhed) {
        const admin = await prisma.admin.delete({
            where: {
                jhed: jhed
            },
        })
        return admin;
    }

    async updateByJhed(jhed, first_name, last_name, department) {
        const admin = await prisma.admin.update({
            where: {
                jhed: jhed
            },
            data: {
                first_name: first_name,
                last_name: last_name,
                department: department
            },
        });
        return admin;
    }
}

module.exports = AdminDao;