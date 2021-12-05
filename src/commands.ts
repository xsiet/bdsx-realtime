import { CommandPermissionLevel } from 'bdsx/bds/command';
import { command } from 'bdsx/command';
import { float32_t } from 'bdsx/nativetype';
import { realtimeDisable, realtimeEnable } from '.';
import { getConfig, setConfig } from './data';
import { description, version, license, author } from '../package.json';

const help =
`\n§6======§r Help: /realtime §6======\n` +
`§6/realtime help:§r Shows the help about realtime commands.\n` +
`§6/realtime enable:§r Enable the realtime.\n` +
`§6/realtime disable:§r Disable the realtime.\n` +
`§6/realtime set timezone <value>:§r Set the timezone.\n` +
`§6/realtime set latitude <value>:§r Set the latitude.\n` +
`§6/realtime set longitude <value>:§r Set the longitude.\n` +
`§6/realtime reload:§r Reload the realtime plugin.\n` +
`§6/realtime info:§r Shows the info about realtime plugin.\n `

const info =
`\n§6======§r Plugin Info: realtime §6======\n` +
`§6Name:§r realtime\n` +
`§6Description:§r ${description}\n` +
`§6Version:§r ${version}\n` +
`§6License:§r ${license}\n` +
`§6Author:§r ${author}\n `

command.register(`realtime`, `Realtime plugin command.`, CommandPermissionLevel.Operator)
.overload((params, origin, output) => output.success(help), {})
.overload((params, origin, output) => output.success(help), { help: command.enum(`Help`, `help`) })

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
}, { reload: command.enum(`Reload`, `reload`) })

.overload((params, origin, output) => {
    output.success(info)
}, { info: command.enum(`Info`, `info`) });