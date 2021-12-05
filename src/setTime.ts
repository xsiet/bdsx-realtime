import { serverInstance } from 'bdsx/bds/server';
import { GameRuleId } from 'bdsx/bds/gamerules';
import { realtimeDisable, realtimeEnable } from '.';
import { timeAdapter } from './timeAdapter';
import { getConfig } from './data';

let before = {
    DoDaylightCycle: null,
    gameTime: null
}

realtimeEnable.on(() => {
    const { timezone, location } = getConfig()
    const { latitude, longitude } = location

    before.DoDaylightCycle = serverInstance.minecraft.getLevel().getGameRules().getRule(GameRuleId.DoDaylightCycle).getValue()
    before.gameTime = serverInstance.minecraft.getLevel().getTime()

    timeAdapter.setTimezone(timezone)
    timeAdapter.setLocation(latitude, longitude)
    timeAdapter.updateTimeAdapter()

    const tick = timeAdapter.getCurrentTick()

    if (timeAdapter.lastTick !== tick) {
        timeAdapter.lastTick = tick

        const setTime = setInterval(() => serverInstance.minecraft.getLevel().setTime(tick), 100)

        realtimeDisable.on(() => {
            clearInterval(setTime)

            serverInstance.minecraft.getLevel().getGameRules().getRule(GameRuleId.DoDaylightCycle).setValue(before.DoDaylightCycle)
            serverInstance.minecraft.getLevel().setTime(before.gameTime)
        })
    }
});