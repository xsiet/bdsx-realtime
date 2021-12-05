import { CommandPermissionLevel } from 'bdsx/bds/command';
import { command } from 'bdsx/command';
import { float32_t } from 'bdsx/nativetype';
import { realtimeDisable, realtimeEnable } from '.';
import { getConfig, setConfig } from './data';

command.register(`realtime`, `Realtime plugin command.`, CommandPermissionLevel.Operator)
.overload((params, origin, output) => {
    if (getConfig().enable) return output.success(`§cRealtime is already enabled!`);

    const config = getConfig()

    config.enable = true
    setConfig(config)

    realtimeEnable.fire()

    output.success(`§aRealtime is enabled!`)
}, { enable: command.enum(`Enable`, `enable`) })

.overload((params, origin, output) => {
    if (!getConfig().enable) return output.success(`§cRealtime is already disabled!`);

    const config = getConfig()

    config.enable = false
    setConfig(config)

    realtimeDisable.fire()

    output.success(`§aRealtime is disabled!`)
}, { disable: command.enum(`Disable`, `disable`) })

.overload((params, origin, output) => {
    const config = getConfig()

    if (params.options === `timezone`) config.timezone = params.value
    else config.location[params.options] = params.value
    setConfig(config)

    output.success(`§aSet the ${params.options} value to ${params.value}!`)
}, {
    set: command.enum(`Set`, `set`),
    options: command.enum(`timezone|latitude|longitude`, `timezone`, `latitude`, `longitude`),
    value: float32_t
})

.overload((params, origin, output) => {
    realtimeDisable.fire()
    if (getConfig().enable) realtimeEnable.fire()

    output.success(`§aReload complete!`)
}, { reload: command.enum(`Reload`, `reload`) });