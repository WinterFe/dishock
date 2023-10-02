import { PrismaClient } from '@prisma/client';

export default class ServerDb {
    static prisma = new PrismaClient();

    static async get(guildId: string) {
        let server = await this.prisma.guilds.findFirst({ where: { id: guildId } });

        if (!server) {
            server = await this.prisma.guilds.create({ data: { id: guildId } });
        }

        return server;
    }
}
