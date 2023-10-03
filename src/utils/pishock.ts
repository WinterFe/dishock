export default class PiShock {
    static apiUrl: string = 'https://do.pishock.com/api/apioperate/';
    static async req(username: string, apikey: string | null, sharecode: string | null, op: number, intensity: number = 25, duration: number = 1) {
        await fetch(this.apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                Username: username,
                Apikey: apikey,
                Code: sharecode,
                Name: `[DISHOCK] ${username}`,
                Op: op,
                Duration: duration,
                Intensity: intensity,
            }),
        });
    }
}
