import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { CATALOGS, ALERT_COOLDOWN_MS, SCHEDULE_ID, clampPercent, collectSnapshot, hottestMetric, hudSpec, mergeSnapshot, readConfig, register, resolveLanguage, resourcesResult, snapshotCopy, staleSnapshot, tick, toneFor } from "./index.js";

let createTestHarness;
try {
  ({ createTestHarness } = await import("@open-pets/plugin-sdk/testing"));
} catch {
  throw new Error("Install @open-pets/plugin-sdk to run plugin tests.");
}

const PERMISSIONS = [
  "pet:speak",
  "pet:reaction",
  "pet:pin",
  "schedule",
  "storage",
  "commands",
  "status",
  "events",
  "system:metrics",
];
const LOCALES = {
  en: JSON.parse(await readFile(new URL("./locales/en.json", import.meta.url), "utf8")),
  nl: JSON.parse(await readFile(new URL("./locales/nl.json", import.meta.url), "utf8")),
  fr: JSON.parse(await readFile(new URL("./locales/fr.json", import.meta.url), "utf8")),
  de: JSON.parse(await readFile(new URL("./locales/de.json", import.meta.url), "utf8")),
};

const requiredKeys = Object.keys(LOCALES.en);
for (const [lang, catalog] of Object.entries(LOCALES)) {
  assert.deepEqual(Object.keys(catalog).sort(), requiredKeys.slice().sort(), `${lang} locale keys`);
  assert.deepEqual(catalog, CATALOGS[lang], `${lang} catalog matches locale file`);
}

assert.equal(resolveLanguage("auto", "fr-FR"), "fr");
assert.equal(resolveLanguage("de", "en-US"), "de");
assert.equal(resolveLanguage("nope", "nl-NL"), "nl");
assert.equal(CATALOGS.fr["plugin.name"], "Ressources système");
assert.equal(CATALOGS.de["speech.alert"].replace("{label}", "CPU").replace("{value}", "96"), "CPU liegt bei 96 Prozent.");

assert.equal(clampPercent(12.4), 12);
assert.equal(clampPercent(0), 0);
assert.equal(clampPercent(140), 100);
assert.equal(clampPercent("nope"), null);
assert.equal(toneFor(40), "green");
assert.equal(toneFor(75), "amber");
assert.equal(toneFor(95), "red");
assert.equal(toneFor(null), "slate");

const merged = mergeSnapshot({ cpuPercent: 11, memUsedPercent: 64, gpuPercent: 0, diskUsedPercent: 30 }, 1234);
assert.equal(merged.freshness, "fresh");
assert.equal(merged.cpu, 11);
assert.equal(merged.ram, 64);
assert.equal(merged.gpu, 0);
assert.equal(merged.disk, 30);
assert.equal(merged.extendedMetricsAvailable, true);
assert.equal(hottestMetric(merged).key, "ram");
assert.equal(staleSnapshot(merged, 999).sampledAt, 1234);
assert.equal(staleSnapshot(merged, 999).freshness, "stale");
assert.equal(mergeSnapshot({}, 1234).freshness, "unavailable");

const cfg = readConfig({ pollSeconds: 3, alertPercent: 140, showHud: false });
assert.equal(cfg.pollSeconds, 5);
assert.equal(cfg.alertPercent, 99);
assert.equal(cfg.showHud, false);
assert.equal(cfg.language, "en");
assert.equal(readConfig({ language: "fr" }, "de").language, "fr");
assert.equal(readConfig({ language: "auto" }, "de-DE").language, "de");

const zeroSpec = hudSpec({ assets: { icon: (name) => ({ kind: "icon", name }) } }, mergeSnapshot({ cpuPercent: 0, memUsedPercent: 0, diskUsedPercent: 0 }, 1));
assert.deepEqual(zeroSpec.hud.items.map((item) => item.value), [0, 0, 0]);
assert.deepEqual(zeroSpec.hud.items.map((item) => item.icon.name), ["cpu", "ram", "disk"]);
assert.equal(hudSpec({ assets: { icon: (name) => ({ kind: "icon", name }) } }, mergeSnapshot({}, 1)), null);
assert.match(snapshotCopy("en", staleSnapshot(merged, 2000), "status"), /stale/);
assert.equal(resourcesResult(staleSnapshot(merged, 2000)).freshness, "stale");

async function flush() {
  await Promise.resolve();
  await Promise.resolve();
  await Promise.resolve();
}

function makeHarness(options = {}) {
  const h = createTestHarness(register, { permissions: PERMISSIONS, locales: LOCALES, ...options });
  const capabilities = new Map();
  h.ctx.assistant = {
    registerCapability: async (capability, handler) => {
      capabilities.set(capability.id, { capability, handler });
    },
    unregisterCapability: async (id) => { capabilities.delete(id); },
  };
  h.__capabilities = capabilities;
  return h;
}

async function runCapability(h, id) {
  const entry = h.__capabilities.get(id);
  assert.ok(entry, `assistant capability ${id} is registered`);
  return entry.handler({});
}

{
  const h = makeHarness({ nowMs: 1_000_000 });
  await h.start();
  h.expectScheduled(SCHEDULE_ID);
  h.expectBubble({ sticky: true, pin: true });
  const bubble = h.calls.bubbles.at(-1);
  assert.equal(bubble.petId, "default", "resource HUD must use the existing default pet");
  assert.deepEqual(h.calls.spawnedPets, [], "integrated HUD must not create a satellite pet");
  assert.deepEqual(bubble.spec.hud.items.map((item) => item.value), [5, 40]);
  assert.match(String(h.calls.status.at(-1).text), /CPU 5% · RAM 40%/);
  assert.doesNotMatch(String(h.calls.status.at(-1).text), /SSD|satellite|sidecar/i);
  h.expectNoErrors();
  await h.stop();
}

{
  const h = makeHarness({ nowMs: 2_000_000 });
  h.system.setMetrics({ cpuPercent: 0, memUsedPercent: 0, gpuPercent: 0 });
  await h.start();
  const items = h.calls.bubbles.at(-1).spec.hud.items;
  assert.deepEqual(items.map((item) => item.value), [0, 0, 0]);
  assert.deepEqual(items.map((item) => item.icon.name), ["cpu", "ram", "gpu"]);
  h.system.setMetrics({ cpuPercent: 0, memUsedPercent: 0, diskUsedPercent: 44 });
  await tick(h.ctx, Date.now() + 1_000);
  const diskItems = h.calls.bubbles.at(-1).spec.hud.items;
  assert.deepEqual(diskItems.map((item) => item.icon.name), ["cpu", "ram", "disk"]);
  assert.equal(diskItems.at(-1).value, 44);
  await h.stop();
}

{
  const h = makeHarness({ nowMs: 3_000_000, config: { showHud: false } });
  await h.start();
  assert.equal(h.calls.bubbles.length, 0, "HUD stays off when the setting is false");
  await h.runCommand("show");
  assert.equal(h.calls.bubbles.at(-1).petId, "default", "Show works even when the setting was false");
  await h.runCommand("hide");
  const countAfterHide = h.calls.bubbles.length;
  await tick(h.ctx, Date.now() + 30_000);
  assert.equal(h.calls.bubbles.length, countAfterHide, "polling cannot resurrect a hidden HUD");
  await h.setConfig({ showHud: true });
  assert.ok(h.calls.bubbles.length > countAfterHide, "changing the visibility setting restores the HUD");
  await h.setConfig({ showHud: false });
  assert.equal(h.calls.bubbles.at(-1).dismissed, true, "changing the setting hides the HUD");
  await h.stop();
}

{
  const h = makeHarness({ nowMs: 3_500_000 });
  await h.start();
  const bubble = h.calls.bubbles.at(-1);
  const countAfterStart = h.calls.bubbles.length;
  await h.dismissBubble(bubble.handle.id, "replaced");
  await tick(h.ctx, Date.now() + 30_000);
  assert.equal(h.calls.bubbles.length, countAfterStart, "a replaced pinned slot is not repeatedly re-evicted");
  await h.runCommand("show");
  assert.ok(h.calls.bubbles.length > countAfterStart, "explicit Show can restore a HUD after another plugin replaced it");
  await h.stop();
}

{
  const h = makeHarness({ nowMs: 3_750_000 });
  await h.start();
  await Promise.all([
    h.setConfig({ pollSeconds: 5 }),
    h.setConfig({ pollSeconds: 6 }),
    h.setConfig({ pollSeconds: 7 }),
  ]);
  assert.equal(h.calls.schedules.size, 1, "rapid configuration changes keep one active schedule");
  await h.stop();
}

{
  const h = makeHarness({ nowMs: 4_000_000, config: { showHud: true } });
  h.calls.storage.set("hudVisible", false);
  h.calls.storage.set("hudConfigValue", true);
  await h.start();
  assert.equal(h.calls.bubbles.length, 0, "stored Hide survives a restart");
  await h.stop();
  await h.start();
  assert.equal(h.calls.bubbles.length, 0, "stored visibility remains hidden after a second start");
  await h.runCommand("show");
  assert.ok(h.calls.bubbles.length > 0);
  assert.equal(h.calls.storage.get("hudVisible"), true);
  await h.stop();
}

{
  const h = makeHarness({ nowMs: 5_000_000 });
  await h.start();
  let resolveMetrics;
  h.ctx.system.metrics = () => new Promise((resolve) => { resolveMetrics = resolve; });
  const countBefore = h.calls.bubbles.length;
  const pending = tick(h.ctx, Date.now() + 2_000);
  await flush();
  await h.runCommand("hide");
  resolveMetrics({ cpuPercent: 80, memUsedPercent: 80 });
  await pending;
  assert.equal(h.calls.bubbles.length, countBefore, "late metrics cannot recreate a hidden HUD");
  assert.equal(h.calls.bubbles.at(-1).dismissed, true);
  await h.stop();
}

{
  const h = makeHarness({ nowMs: 6_000_000 });
  await h.start();
  let resolveMetrics;
  h.ctx.system.metrics = () => new Promise((resolve) => { resolveMetrics = resolve; });
  const poll = tick(h.ctx, Date.now() + 3_000);
  await flush();
  const stop = h.stop();
  resolveMetrics({ cpuPercent: 90, memUsedPercent: 90 });
  await Promise.all([poll, stop]);
  assert.equal(h.calls.schedules.size, 0, "shutdown cancels the polling schedule");
  assert.equal(h.calls.bubbles.at(-1).dismissed, true);
}

{
  const h = makeHarness({ nowMs: 7_000_000 });
  await h.start();
  let active = 0;
  let maximum = 0;
  const resolvers = [];
  h.ctx.system.metrics = () => new Promise((resolve) => {
    active += 1;
    maximum = Math.max(maximum, active);
    resolvers.push((metrics) => { active -= 1; resolve(metrics); });
  });
  const first = tick(h.ctx, Date.now() + 4_000);
  await flush();
  const second = tick(h.ctx, Date.now() + 5_000);
  await flush();
  assert.equal(maximum, 1, "poll requests share one metrics read");
  const firstResolver = resolvers.shift();
  assert.equal(typeof firstResolver, "function");
  firstResolver({ cpuPercent: 12, memUsedPercent: 34 });
  for (let attempt = 0; attempt < 20 && resolvers.length === 0; attempt += 1) await flush();
  assert.ok(resolvers.length > 0, "a queued poll starts after the first read completes");
  assert.equal(maximum, 1, "a queued poll waits for the active metrics read");
  resolvers.shift()({ cpuPercent: 13, memUsedPercent: 35 });
  await Promise.all([first, second]);
  await h.stop();
}

{
  const h = makeHarness({ nowMs: 8_000_000 });
  await h.start();
  const initialBubbles = h.calls.bubbles.length;
  const originalMetrics = h.ctx.system.metrics;
  h.ctx.system.metrics = async () => { throw new Error("temporary metrics outage"); };
  const stale = await tick(h.ctx, Date.now() + 6_000);
  assert.equal(stale.freshness, "stale");
  assert.equal(h.calls.bubbles.length, initialBubbles, "stale metrics update the existing HUD");
  assert.match(String(h.calls.bubbles.at(-1).spec.hud.items.at(0).label), /stale/);
  assert.match(String(h.calls.status.at(-1).text), /stale/);
  assert.equal(h.calls.react.length, 0, "stale readings cannot create alerts");
  const staleCapability = await runCapability(h, "resources.get");
  assert.equal(staleCapability.freshness, "stale");
  assert.equal(staleCapability.cpuPercent, 5);
  h.ctx.system.metrics = originalMetrics;
  await h.stop();
}

{
  const h = makeHarness({ nowMs: 9_000_000 });
  h.ctx.system.metrics = async () => { throw new Error("no metrics"); };
  await h.start();
  assert.equal(h.calls.bubbles.length, 0, "unavailable metrics do not create a zero-valued HUD");
  assert.match(String(h.calls.status.at(-1).text), /unavailable/i);
  const result = await runCapability(h, "resources.get");
  assert.equal(result.cpuPercent, null);
  assert.equal(result.ramPercent, null);
  assert.equal(result.gpuPercent, null);
  assert.equal(result.diskUsedPercent, null);
  assert.equal(result.freshness, "unavailable");
  await h.stop();
}

{
  const h = makeHarness({ nowMs: 10_000_000 });
  h.system.setMetrics({ cpuPercent: 96, memUsedPercent: 40 });
  await h.start();
  const firstAlertCount = h.calls.react.length;
  assert.equal(firstAlertCount, 1);
  const base = Date.now();
  h.system.setMetrics({ cpuPercent: 97, memUsedPercent: 40 });
  await tick(h.ctx, base + 60_000);
  assert.equal(h.calls.react.length, firstAlertCount, "alert cooldown suppresses repeated alerts");
  await tick(h.ctx, base + ALERT_COOLDOWN_MS);
  assert.equal(h.calls.react.length, firstAlertCount + 1, "alert cooldown expires normally");
  await h.stop();
}

{
  const h = makeHarness({ nowMs: 11_000_000 });
  await h.start();
  const originalStorageSet = h.ctx.storage.set;
  h.ctx.storage.set = async () => { throw new Error("temporary storage outage"); };
  await h.runCommand("hide");
  await h.runCommand("show");
  h.ctx.storage.set = originalStorageSet;
  const originalOnce = h.ctx.schedule.once;
  h.ctx.schedule.once = async () => { throw new Error("temporary scheduler outage"); };
  await h.setConfig({ pollSeconds: 5 });
  assert.equal(h.calls.schedules.size, 0, "failed scheduling does not leave an untracked operation");
  h.ctx.schedule.once = originalOnce;
  await h.stop();
}

{
  const h = makeHarness({ nowMs: 12_000_000 });
  await h.start();
  await h.emit("pet:clicked", {});
  assert.ok(h.calls.speak.some((message) => message.includes("CPU 5%")), "existing click-to-read behavior remains");
  const capabilitySpeechCount = h.calls.speak.length;
  const result = await runCapability(h, "resources.get");
  assert.equal(result.cpuPercent, 5);
  assert.equal(result.ramPercent, 40);
  assert.equal(h.calls.speak.length, capabilitySpeechCount, "resources.get does not speak");
  await h.stop();
}

const manifest = JSON.parse(await readFile(new URL("./openpets.plugin.json", import.meta.url), "utf8"));
assert.equal(manifest.id, "openpets.system-resources");
assert.equal(manifest.version, "2.0.0");
assert.deepEqual(manifest.permissions.slice().sort(), PERMISSIONS.slice().sort());
assert.equal(manifest.assets.icons.disk, "assets/disk.svg");
assert.equal(manifest.assets.icons.ssd, undefined);

console.log("openpets.system-resources: all checks passed.");
