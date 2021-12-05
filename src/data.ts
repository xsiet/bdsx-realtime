import { F_OK } from 'constants';
import { access, readdirSync, mkdirSync, writeFileSync, readFileSync } from 'fs';

const directory1 = `../plugins_data`
const directory2 = `${directory1}/realtime`
const directory3 = __dirname.replace(`\\src`, `\\resources`)
const configFilePath = `${directory2}/config.json`

try {
    mkdirSync(directory1)
    mkdirSync(directory2)
} catch (err) {}

readdirSync(directory3).forEach(fileName => {
    const path = `${directory2}/${fileName}`

    access(path, F_OK, err => {
        if (err) writeFileSync(path, readFileSync(`${directory3}/${fileName}`, `utf8`), `utf8`)
    })
});

type ConfigType = {
    enable: boolean,
    timezone: number | null,
    location: {
        latitude: number | null,
        longitude: number | null
    }
}

export function getConfig(): ConfigType { return JSON.parse(readFileSync(configFilePath, `utf8`)); }

export function setConfig(value: ConfigType) { writeFileSync(configFilePath, JSON.stringify(value, null, 4), `utf8`) }