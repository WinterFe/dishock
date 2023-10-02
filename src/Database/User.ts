import { PrismaClient, Users } from '@prisma/client';

export default class UserDb {
    static prisma = new PrismaClient();
    static async get(userId: string): Promise<Users> {
        let data = await this.prisma.users.findFirst({
            where: {
                id: userId,
            },
        });
        if (!data) {
            data = await this.prisma.users.create({
                data: {
                    id: userId,
                },
            });
        }
        return data;
    }

    static async update(userId: string, data: any): Promise<Users> {
        let user = await this.get(userId);
        user = await this.prisma.users.update({
            where: {
                id: userId,
            },
            data: data,
        });
        return user;
    }
}
