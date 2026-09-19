# OpenPets System Resources

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Live CPU and RAM on your default pet. On OpenPets versions that support
extended system metrics, the same HUD also shows aggregate GPU use and used
system-volume capacity. System Resources and Virtual Pet share the default
pet's one pinned HUD slot. They cannot display two pinned HUDs at the same
time, and neither plugin spawns a second pet.

The plugin does not install or run a sidecar. It uses the read-only
`system:metrics` capability supplied by OpenPets, so catalog installs work
without Node.js, a loopback listener, or a persistent background service.

## Install

Install **System Resources** from OpenPets → Plugins and approve the requested
pet controls plus **System metrics**. GPU and disk readings appear
when supported by the host OS and hardware; otherwise the HUD remains a useful
CPU/RAM monitor.

The HUD uses the host-rendered pinned slot on the existing default pet. OpenPets
provides one pinned slot per pet. If another plugin owns that slot with a higher
priority, System Resources yields and does not repeatedly evict it on each poll.
An equal-priority owner may replace the current bubble according to the host
arbiter. Use **Show resource HUD** to request the HUD again after the slot is
available.

## Commands

- Show / hide resource HUD
- Read resources (or click the pet)

The Show and Hide commands persist their current visibility choice. **Show
resource HUD** is an explicit override: it displays the HUD even when the
`Show resource HUD` setting is off and that choice survives a restart. A later
change to the setting becomes effective immediately and updates the display;
Hide remains the explicit command for turning it off again.

## Settings

The HUD has independent display switches for CPU, RAM, GPU, and Disk. All four
switches default to on. OpenPets stores these values with the plugin
configuration, so they survive a plugin or application restart. Missing fields
from an older configuration use the on default.

The host may omit GPU or Disk when the operating system or hardware does not
provide a reading. The HUD omits only that indicator. A real 0% reading remains
0%.

If you turn off every indicator, the plugin dismisses the pinned HUD and keeps
polling and status reporting active. Show does not create an empty HUD. Turn on
at least one indicator to display it again.

The four display switches map directly to the host's four-item HUD limit.

Alerts have independent switches for CPU, RAM, GPU, and Disk. CPU and GPU
alerts require two consecutive fresh readings from scheduled monitoring polls
at or above the threshold. Assistant queries, Show, and display-setting
changes may refresh the HUD but never advance that sustained counter. RAM
alerts describe RAM usage, not memory pressure, because the SDK exposes no
memory-pressure reading. Disk alerts describe used system-volume capacity.
Missing, unavailable, and stale readings never alert. The existing cooldown is
stored across restarts and remains in effect when alert settings change.

The SDK type has an optional battery value, so the plugin preserves and reports
that value when a host supplies both percentage and charging state. The current
OpenPets desktop does not collect battery data in its system-metrics provider,
so the plugin does not show a battery control or invent a value on unsupported
desktops.

Network upload and download rates are not available through the current SDK.
The plugin does not add a control or represent throughput as a percentage.

## Development

```bash
npm test
npm run package:catalog
```

The package version is 2.1.0. It contains only the manifest, entry point,
declared icons, locales, and license.

The plugin polls at the configured interval, serializes metric reads, and marks
cached readings as stale after a failed collection. Stale readings do not create
new alerts. CPU, RAM, GPU, and disk availability are independent; a missing
optional metric is omitted rather than displayed as zero.

Polling uses the SDK's one-shot scheduler so a slow metric read cannot overlap
the next poll. A failed schedule registration is retried once, serially. If the
host rejects both registrations, the plugin logs the failure and leaves no
duplicate timer; a later Show command or configuration change retries it. The
plugin does not use a raw timer fallback because the host scheduler owns plugin
lifecycle and sleep/wake behavior.

## License

[MIT](LICENSE) — use, copy, modify, and sell with the copyright notice.
