import * as suncalc from 'suncalc';

export namespace timeAdapter {
    let timezone: number

    let latitude: number
    let longitude: number

    let from: Date
    let to: Date
    let tickOffset: number
    let tickDuration: number
    export let lastTick: number

    export function setTimezone(timezone_: number) { timezone = timezone_ }

    export function setLocation(latitude_: number, longitude_: number) {
        latitude = latitude_
        longitude = longitude_
    }

    export function timeAdapter(from_: Date, to_: Date, type: any) {
        from = from_
        to = to_
        tickOffset = type.offset
        tickDuration = type.period
    }

    export function getDate(): Date {
        const current = new Date()
        const UTC = current.getTime() + (current.getTimezoneOffset() * 60 * 1000)
        const TIME_DIFF = timezone * 60 * 60 * 1000
        return new Date(UTC + TIME_DIFF);
    }

    export function getCurrentTick() {
        const from_ = from.getTime()
        const period = to.getTime() - from_
        const time = getDate().getTime()
        const current = time - from_
        const tick = tickDuration * current / period
        return tickOffset + tick;
    }

    export const type = {
        day: { offset: 22835, period: 14315 },
        night: { offset: 37150, period: 9685 }
    }

    export function updateTimeAdapter() {
        const date = getDate()
        const time = date.getTime()
        let sunrise = suncalc.getTimes(date, latitude, longitude).sunrise
        let sunset = suncalc.getTimes(date, latitude, longitude).sunset
    
        if (time < sunrise.getTime()) {
            date.setDate(date.getDate() - 1)
            sunset = suncalc.getTimes(date, latitude, longitude).sunset
            return timeAdapter(sunset, sunrise, type.night);
        }
    
        if (time < sunset.getTime()) return timeAdapter(sunrise, sunset, type.day);
    
        date.setDate(date.getDate() + 1)
        sunrise = suncalc.getTimes(date, latitude, longitude).sunrise
        timeAdapter(sunset, sunrise, type.night)
    }
}