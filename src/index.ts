import { Event } from 'bdsx/eventtarget';
import { events } from 'bdsx/event';
import { yellow } from 'colors';
import { getConfig } from './data';
import { name, version } from '../package.json';

export const realtimeEnable = new Event()
export const realtimeDisable = new Event()

events.serverOpen.on(() => {
    import(`./data`)
    import(`./commands`)
    import(`./setTime`)

    if (getConfig().enable) setTimeout(() => realtimeEnable.fire(), 100)

    console.log(yellow(`[BDSX-PLUGIN] ${name}(v${version}) loaded!`))
});

events.serverLog.on(log => {
    if (log.endsWith(`Server stop requested.`)) realtimeDisable.fire()
});