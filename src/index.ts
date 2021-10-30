import { events } from 'bdsx/event';
import { red } from 'colors';

events.serverOpen.on(() => {
    import(`./config`)
    setTimeout(() => {
        const { location } = require(`../../../plugins_data/realtime/config.json`)
        if (!location.latitude) return console.log(red(`[Realtime] Latitude is not correct. Please modify the config file and run the server again.`))
        if (!location.longitude) return console.log(red(`[Realtime] Longitude is not correct. Please modify the config file and run the server again.`))
        import(`./setTime`)
    }, 100)
});