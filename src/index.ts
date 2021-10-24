import { events } from 'bdsx/event';
import { latitude, longitude } from '../config.json';

events.serverOpen.on(() => {
    if (!latitude) return console.log(new Error(`latitude is not set!`));
    if (!longitude) return console.log(new Error(`longitude is not set!`));
    import(`./setTime`)
});
