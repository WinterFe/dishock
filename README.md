### **Note**: DiShock isn't currently finished with its re-write, and this open-source is currently for transparency reasons only. The bot has no real function as of right now. An announcement will be made when this isn't the case.

# ⚡ DiShock

*DiShock - PiShock integration with Discord*
## Self-hosting

## Prerequisite
- MySQL/MariaDB Server (https://mariadb.com)
- **[Optional]** Docker (https://www.docker.com)
- Node.JS v18+ (https://nodejs.org/en)
(Note: It is prefferable to deploy on a linux machine, but not required)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

To do this, rename the file:
```
  mv .env.example .env
```

Then you can open the `.env` file and fill it out accordingly. (Legend below)

`CLIENT_ID` - The Discord (User) ID of your bot. (Ex: 1023270531090354206)

`TOKEN` - The generated bot token for your bot. You can get this [here](https://discord.com/developers/applications).

`DATABASE_URL` - The connection string to your MySQL database.

- URL Format: `mysql://<username>:<password>@<ip>:<port>/<db>`

## Running the bot

With Docker:
```bash
  npm run docker:run
```

Docker, attached:
```bash
  npm run docker:run-a
```

Without Docker:
```bash
  npm install --omit=dev
  npm run build
  npm run start
```
## Support

For support, join the Discord: https://discord.gg/EXPgDDRkGD


## Contributing

Contributions are always welcome!

If you wish to contribute, just make a fork and submit a PR!