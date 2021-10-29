import { serverInstance } from 'bdsx/bds/server';
import { events } from 'bdsx/event';
import { bedrockServer } from 'bdsx/launcher';
import { timeAdapter } from './timeAdapter';
//
bedrockServer.executeCommand(`gamerule dodaylightcycle false`)
serverInstance.minecraft.getLevel().setTime(0)

timeAdapter.updateTimeAdapter()
const tick = timeAdapter.getCurrentTick()
if (timeAdapter.lastTick !== tick) {
    timeAdapter.lastTick = tick
    const setTime = setInterval(() => { serverInstance.minecraft.getLevel().setTime(tick) }, 100)
    events.serverStop.on(() => { clearInterval(setTime) })
}