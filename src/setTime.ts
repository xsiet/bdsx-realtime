import { serverInstance } from 'bdsx/bds/server';
import { events } from 'bdsx/event';
import { GameRuleId } from 'bdsx/bds/gamerules';
import { timeAdapter } from './timeAdapter';

serverInstance.minecraft.getLevel().getGameRules().getRule(GameRuleId.DoDaylightCycle).setValue(false)

timeAdapter.updateTimeAdapter()
const tick = timeAdapter.getCurrentTick()
if (timeAdapter.lastTick !== tick) {
    timeAdapter.lastTick = tick
    const setTime = setInterval(() => { serverInstance.minecraft.getLevel().setTime(tick) }, 100)
    events.serverStop.on(() => { clearInterval(setTime) })
}