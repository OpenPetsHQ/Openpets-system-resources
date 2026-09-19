# OpenPets System Resources

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Live CPU and RAM on your default pet. On OpenPets versions that support
extended system metrics, the same HUD also shows aggregate GPU use and disk
usage. System Resources and Virtual Pet share the default pet's one pinned HUD
slot; they cannot display two pinned HUDs at the same time, and neither plugin
spawns a second pet.

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

## Development

```bash
npm test
npm run package:catalog
```

The package version is 2.0.0. It contains only the manifest, entry point,
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
