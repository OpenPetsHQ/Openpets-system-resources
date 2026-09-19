# OpenPets System Resources

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

Live CPU and RAM on your default pet. On OpenPets versions that support
extended system metrics, the same HUD also shows aggregate GPU use and disk
usage. Virtual Pet stats stay on the main pet.

The plugin does not install or run a sidecar. It uses the read-only
`system:metrics` capability supplied by OpenPets, so catalog installs work
without Node.js, a loopback listener, or a persistent background service.

## Install

Install **System Resources** from OpenPets → Plugins and approve the requested
pet controls plus **System metrics**. GPU and disk readings appear
when supported by the host OS and hardware; otherwise the HUD remains a useful
CPU/RAM monitor.

The HUD uses the host-rendered pinned slot on the existing default pet. OpenPets
provides one pinned slot per pet. If another plugin replaces this HUD, System
Resources does not repeatedly evict it. Use **Show resource HUD** to request
the HUD again.

## Commands

- Show / hide resource HUD
- Read resources (or click the pet)

The Show and Hide commands persist their current visibility choice. Changing the
Show resource HUD setting also updates the display and takes effect on restart.

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

## License

[MIT](LICENSE) — use, copy, modify, and sell with the copyright notice.
