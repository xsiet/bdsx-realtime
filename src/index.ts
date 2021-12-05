import { Event } from 'bdsx/eventtarget';
import { events } from 'bdsx/event';
import { getConfig } from './data';

export const realtimeEnable = new Event()
export const realtimeDisable = new Event()

events.serverOpen.on(() => {
    import(`./data`)
    import(`./commands`)
    import(`./setTime`)

    if (getConfig().enable) setTimeout(() => realtimeEnable.fire())
});

events.serverLog.on(log => {
    if (log.endsWith(`Server stop requested.`)) realtimeDisable.fire()
});