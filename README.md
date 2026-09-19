# OpenPets System Resources

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Live CPU and RAM on your default pet. On OpenPets versions that support
extended system metrics, the same HUD also shows aggregate GPU use and used
system-volume capacity. Battery state and network throughput appear in the
status, speech, and `resources.get` result when the host provides reliable
readings; they are not percentage HUD bars. System Resources and Virtual Pet
share the default pet's one pinned HUD slot. Neither plugin spawns a second
pet.

The plugin does not install or run a sidecar. It uses the read-only
`system:metrics` capability supplied by OpenPets, so catalog installs work
without Node.js, a loopback listener, or a persistent background service.

## Install

Install **System Resources** from OpenPets → Plugins and approve the requested
pet controls plus **System metrics**. GPU and disk readings appear
when supported by the host OS and hardware; otherwise the HUD remains a useful
CPU/RAM monitor.

The HUD uses the host-rendered pinned slot on the existing default pet. OpenPets
provides one pinned slot per pet. Background refreshes use low priority, so the
normal-priority Virtual Pet HUD is not repeatedly replaced. If another plugin
owns the slot, System Resources yields and keeps the readings available through
status, speech, and `resources.get`. Use **Show resource HUD** to make an
explicit normal-priority request after the slot is available; the host may then
replace another normal-priority bubble according to its arbiter.

## Commands

- Show / hide resource HUD
- Read resources (or click the pet)

Assistant capabilities expose the same controls as `resources.get`,
`resources.show`, and `resources.hide`. The visibility capabilities return a
concise `{ ok, visible }` result and persist the same visibility state as the
commands.

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

Battery and Network settings control their inclusion in status and speech. They
default to on and do not consume one of the HUD's four percentage items. A
network rate is omitted until the host has two valid cumulative-counter samples;
counter resets, disconnected interfaces, and long sleep/wake gaps re-baseline
instead of fabricating a zero or stale rate.

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

The SDK type has optional battery and network values. The plugin preserves and
reports them only when the host supplies complete, fresh readings. Older
OpenPets builds continue to provide CPU/RAM and optional GPU/Disk without these
fields; unsupported desktops simply omit the extra presentation.

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

GPU sustained alerts count distinct host extended-metric samples. The desktop
host exposes a sample identity for its GPU cache, so repeated assistant reads,
Show commands, setting changes, and cache hits cannot satisfy the two-sample
threshold by themselves.

Polling uses the SDK's one-shot scheduler so a slow metric read cannot overlap
the next poll. A failed schedule registration is retried once, serially. If the
host rejects both registrations, the plugin logs the failure and leaves no
duplicate timer; a later Show command or configuration change retries it. The
plugin does not use a raw timer fallback because the host scheduler owns plugin
lifecycle and sleep/wake behavior.

## License

[MIT](LICENSE) — use, copy, modify, and sell with the copyright notice.
