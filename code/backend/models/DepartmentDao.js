const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

/**
 * Data Access Object for Department.
 */
class DepartmentDao {
    constructor() {
    }

    async create(title) {
        const department = await prisma.department.create({
            data: {
                title: title
            },
        })
        return department;
    }

    async readAll() {
        const allDepartments = await prisma.department.findMany();
        return allDepartments;
    }


    async readByTitle(title) {
        const department = await prisma.department
            .findUnique({
                where: {
                    title: title
                },
            });
        return department;
    }

    async getTotalNumEmployees(title){
        const department = await prisma.department
            .findUnique({
                where: {
                    title: title
                },
                include: {
                    employee: true
                }
            });
        return department.employee.length;
    }

    async deleteByTitle(title) {
        const department = await prisma.department.delete({
            where: {
                title: title
            },
        })
        return department;
    }

    async updateDepartmentTitle(fromTitle, toTitle) {
        const department = await prisma.department.update({
            where: {
                title: fromTitle
            },
            data: {
                title: toTitle
            },
        });
        return department;
    }
}

module.exports = DepartmentDao;