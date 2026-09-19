/// <reference types="@open-pets/plugin-sdk" />

export const SCHEDULE_ID = "system-resources-tick";
export const ALERT_COOLDOWN_MS = 10 * 60_000;
export const DEFAULT_POLL_SECONDS = 10;
export const DEFAULT_ALERT_PERCENT = 90;
export const DEFAULT_LANGUAGE = "auto";
const MAX_SCHEDULE_REGISTRATION_ATTEMPTS = 2;

export const CATALOGS = {
  en: {
    "plugin.name": "System Resources",
    "plugin.description": "Show live CPU and RAM meters on your pet.",
    "hud.cpu": "CPU",
    "hud.ram": "RAM",
    "hud.gpu": "GPU",
    "hud.disk": "Disk",
    "value.na": "—",
    "value.stale": "stale",
    "config.showHud.label": "Show resource HUD",
    "config.showHud.description": "Keep a compact CPU and RAM overlay on your pet.",
    "config.pollSeconds.label": "Refresh interval (seconds)",
    "config.pollSeconds.description": "How often to sample host CPU and RAM metrics.",
    "config.alertPercent.label": "Alert threshold (%)",
    "config.alertPercent.description": "Speak when any meter stays at or above this value.",
    "config.speakAlerts.label": "Speak on high load",
    "config.speakAlerts.description": "Let the pet call out when a meter crosses the alert threshold.",
    "config.language.label": "Language",
    "config.language.description": "Language for meters, status, and pet speech.",
    "config.language.auto": "Automatic (OpenPets)",
    "config.language.nl": "Nederlands",
    "config.language.en": "English",
    "config.language.fr": "Français",
    "config.language.de": "Deutsch",
    "command.show.title": "Show resource HUD",
    "command.show.description": "Show the live CPU, RAM, GPU, and disk meters on the pet.",
    "command.hide.title": "Hide resource HUD",
    "command.hide.description": "Hide the resource meters on the pet.",
    "command.snapshot.title": "Read resources",
    "command.snapshot.description": "Have the pet read the current CPU and RAM levels.",
    "speech.snapshot": "CPU {cpu}, RAM {ram}.",
    "speech.snapshotFull": "CPU {cpu}, RAM {ram}, GPU {gpu}, Disk {disk}.",
    "speech.stale": "The last valid reading is stale.",
    "speech.unavailable": "Resource metrics are unavailable.",
    "speech.alert": "{label} is at {value} percent.",
    "status.line": "CPU {cpu} · RAM {ram}",
    "status.lineFull": "CPU {cpu} · RAM {ram} · GPU {gpu} · Disk {disk}",
    "status.stale": "Last valid reading: {details} · stale",
    "status.unavailable": "Resource metrics unavailable",
  },
  nl: {
    "plugin.name": "Systeembronnen",
    "plugin.description": "Toon live CPU- en RAM-meters op je pet.",
    "hud.cpu": "CPU",
    "hud.ram": "RAM",
    "hud.gpu": "GPU",
    "hud.disk": "Schijf",
    "value.na": "—",
    "value.stale": "verouderd",
    "config.showHud.label": "Toon bronnen-HUD",
    "config.showHud.description": "Houd een compact CPU- en RAM-overzicht op de pet.",
    "config.pollSeconds.label": "Verversinterval (seconden)",
    "config.pollSeconds.description": "Hoe vaak host-CPU en -RAM worden bemonsterd.",
    "config.alertPercent.label": "Drempel voor melding (%)",
    "config.alertPercent.description": "Spreek als een meter op of boven deze waarde blijft.",
    "config.speakAlerts.label": "Spreek bij hoge belasting",
    "config.speakAlerts.description": "Laat de pet waarschuwen als een meter de drempel overschrijdt.",
    "config.language.label": "Taal",
    "config.language.description": "Taal voor meters, status en pet-spraak.",
    "config.language.auto": "Automatisch (OpenPets)",
    "config.language.nl": "Nederlands",
    "config.language.en": "English",
    "config.language.fr": "Français",
    "config.language.de": "Deutsch",
    "command.show.title": "Toon bronnen-HUD",
    "command.show.description": "Toon de live CPU-, RAM-, GPU- en schijfmeters op de pet.",
    "command.hide.title": "Verberg bronnen-HUD",
    "command.hide.description": "Verberg de bronnenmeters op de pet.",
    "command.snapshot.title": "Lees bronnen",
    "command.snapshot.description": "Laat de pet de huidige CPU en RAM voorlezen.",
    "speech.snapshot": "CPU {cpu}, RAM {ram}.",
    "speech.snapshotFull": "CPU {cpu}, RAM {ram}, GPU {gpu}, schijf {disk}.",
    "speech.stale": "De laatste geldige meting is verouderd.",
    "speech.unavailable": "Bronmetingen zijn niet beschikbaar.",
    "speech.alert": "{label} staat op {value} procent.",
    "status.line": "CPU {cpu} · RAM {ram}",
    "status.lineFull": "CPU {cpu} · RAM {ram} · GPU {gpu} · Schijf {disk}",
    "status.stale": "Laatste geldige meting: {details} · verouderd",
    "status.unavailable": "Bronmetingen niet beschikbaar",
  },
  fr: {
    "plugin.name": "Ressources système",
    "plugin.description": "Affiche les compteurs CPU et RAM sur le familier.",
    "hud.cpu": "CPU",
    "hud.ram": "RAM",
    "hud.gpu": "GPU",
    "hud.disk": "Disque",
    "value.na": "—",
    "value.stale": "obsolète",
    "config.showHud.label": "Afficher le HUD des ressources",
    "config.showHud.description": "Garde un overlay CPU et RAM compact sur le familier.",
    "config.pollSeconds.label": "Intervalle d’actualisation (secondes)",
    "config.pollSeconds.description": "Fréquence d’échantillonnage du CPU et de la RAM hôte.",
    "config.alertPercent.label": "Seuil d’alerte (%)",
    "config.alertPercent.description": "Parler lorsqu’un compteur reste à cette valeur ou au-dessus.",
    "config.speakAlerts.label": "Parler en cas de charge élevée",
    "config.speakAlerts.description": "Le familier prévient lorsqu’un compteur dépasse le seuil.",
    "config.language.label": "Langue",
    "config.language.description": "Langue des compteurs, du statut et des messages du familier.",
    "config.language.auto": "Automatique (OpenPets)",
    "config.language.nl": "Nederlands",
    "config.language.en": "English",
    "config.language.fr": "Français",
    "config.language.de": "Deutsch",
    "command.show.title": "Afficher le HUD des ressources",
    "command.show.description": "Afficher les compteurs CPU, RAM, GPU et disque sur le familier.",
    "command.hide.title": "Masquer le HUD des ressources",
    "command.hide.description": "Masquer les compteurs de ressources sur le familier.",
    "command.snapshot.title": "Lire les ressources",
    "command.snapshot.description": "Faire lire au familier le CPU et la RAM actuels.",
    "speech.snapshot": "CPU {cpu}, RAM {ram}.",
    "speech.snapshotFull": "CPU {cpu}, RAM {ram}, GPU {gpu}, disque {disk}.",
    "speech.stale": "La dernière mesure valide est obsolète.",
    "speech.unavailable": "Les mesures des ressources sont indisponibles.",
    "speech.alert": "{label} est à {value} pour cent.",
    "status.line": "CPU {cpu} · RAM {ram}",
    "status.lineFull": "CPU {cpu} · RAM {ram} · GPU {gpu} · disque {disk}",
    "status.stale": "Dernière mesure valide : {details} · obsolète",
    "status.unavailable": "Mesures des ressources indisponibles",
  },
  de: {
    "plugin.name": "Systemressourcen",
    "plugin.description": "Zeigt Live-CPU und RAM am Haustier.",
    "hud.cpu": "CPU",
    "hud.ram": "RAM",
    "hud.gpu": "GPU",
    "hud.disk": "Datenträger",
    "value.na": "—",
    "value.stale": "veraltet",
    "config.showHud.label": "Ressourcen-HUD anzeigen",
    "config.showHud.description": "Zeigt ein kompaktes CPU- und RAM-Overlay am Haustier.",
    "config.pollSeconds.label": "Aktualisierungsintervall (Sekunden)",
    "config.pollSeconds.description": "Wie oft Host-CPU und RAM abgefragt werden.",
    "config.alertPercent.label": "Warnschwelle (%)",
    "config.alertPercent.description": "Sprechen, wenn eine Anzeige auf oder über diesem Wert bleibt.",
    "config.speakAlerts.label": "Bei hoher Last sprechen",
    "config.speakAlerts.description": "Das Haustier warnt, wenn eine Anzeige die Schwelle überschreitet.",
    "config.language.label": "Sprache",
    "config.language.description": "Sprache für Anzeigen, Status und Haustier-Sprache.",
    "config.language.auto": "Automatisch (OpenPets)",
    "config.language.nl": "Nederlands",
    "config.language.en": "English",
    "config.language.fr": "Français",
    "config.language.de": "Deutsch",
    "command.show.title": "Ressourcen-HUD anzeigen",
    "command.show.description": "Live-CPU-, RAM-, GPU- und Datenträgeranzeigen am Haustier zeigen.",
    "command.hide.title": "Ressourcen-HUD ausblenden",
    "command.hide.description": "Die Ressourcenanzeigen am Haustier ausblenden.",
    "command.snapshot.title": "Ressourcen vorlesen",
    "command.snapshot.description": "Das Haustier liest die aktuelle CPU und RAM vor.",
    "speech.snapshot": "CPU {cpu}, RAM {ram}.",
    "speech.snapshotFull": "CPU {cpu}, RAM {ram}, GPU {gpu}, Datenträger {disk}.",
    "speech.stale": "Die letzte gültige Messung ist veraltet.",
    "speech.unavailable": "Ressourcenmessungen sind nicht verfügbar.",
    "speech.alert": "{label} liegt bei {value} Prozent.",
    "status.line": "CPU {cpu} · RAM {ram}",
    "status.lineFull": "CPU {cpu} · RAM {ram} · GPU {gpu} · Datenträger {disk}",
    "status.stale": "Letzte gültige Messung: {details} · veraltet",
    "status.unavailable": "Ressourcenmessungen nicht verfügbar",
  },
};

export function interpolate(template, vars = {}) {
  return String(template).replace(/\{(\w+)\}/g, (_, key) =>
    vars[key] == null ? `{${key}}` : String(vars[key]),
  );
}

export function resolveLanguage(raw, hostLocale = "en") {
  const value = typeof raw === "string" ? raw.trim().toLowerCase() : "auto";
  if (value !== "auto" && CATALOGS[value]) return value;
  const lang = String(hostLocale || "en").split(/[-_]/)[0];
  return CATALOGS[lang] ? lang : "en";
}

export function t(language, key, vars) {
  const catalog = CATALOGS[language] ?? CATALOGS.en;
  const template = catalog[key] ?? CATALOGS.en[key] ?? key;
  return interpolate(template, vars);
}

export function clampPercent(value) {
  if (value == null) return null;
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return null;
  return Math.max(0, Math.min(100, Math.round(n)));
}

export function toneFor(percent) {
  if (percent == null) return "slate";
  if (percent >= 90) return "red";
  if (percent >= 70) return "amber";
  return "green";
}

export function formatPercent(language, percent) {
  return percent == null ? t(language, "value.na") : `${percent}%`;
}

function metricValue(snapshot, key) {
  if (key === "disk") return snapshot?.disk ?? snapshot?.ssd ?? null;
  return snapshot?.[key] ?? null;
}

function hasMetric(snapshot) {
  return ["cpu", "ram", "gpu", "disk"].some((key) => metricValue(snapshot, key) != null);
}

export function hottestMetric(snapshot) {
  const rows = [
    ["cpu", metricValue(snapshot, "cpu")],
    ["ram", metricValue(snapshot, "ram")],
    ["gpu", metricValue(snapshot, "gpu")],
    ["disk", metricValue(snapshot, "disk")],
  ];
  let hottest = null;
  for (const [key, value] of rows) {
    if (value == null) continue;
    if (!hottest || value > hottest.value) hottest = { key, value };
  }
  return hottest;
}

export function mergeSnapshot(hostMetrics = {}, now = Date.now()) {
  const cpu = clampPercent(hostMetrics.cpuPercent);
  const ram = clampPercent(hostMetrics.memUsedPercent);
  const gpu = clampPercent(hostMetrics.gpuPercent);
  const disk = clampPercent(hostMetrics.diskUsedPercent);
  const snapshot = {
    freshness: "fresh",
    cpu,
    ram,
    gpu,
    disk,
    extendedMetricsAvailable: gpu != null || disk != null,
    sampledAt: now,
    attemptedAt: now,
  };
  if (!hasMetric(snapshot)) snapshot.freshness = "unavailable";
  return snapshot;
}

export function staleSnapshot(previous, failedAt = Date.now()) {
  if (!previous || !hasMetric(previous)) return unavailableSnapshot(failedAt);
  return { ...previous, freshness: "stale", attemptedAt: failedAt };
}

export function unavailableSnapshot(attemptedAt = Date.now()) {
  return {
    freshness: "unavailable",
    cpu: null,
    ram: null,
    gpu: null,
    disk: null,
    extendedMetricsAvailable: false,
    sampledAt: null,
    attemptedAt,
  };
}

export function readConfig(raw = {}, hostLocale = "en") {
  const pollSeconds = Number(raw.pollSeconds ?? DEFAULT_POLL_SECONDS);
  const alertPercent = Number(raw.alertPercent ?? DEFAULT_ALERT_PERCENT);
  return {
    showHud: raw.showHud !== false,
    speakAlerts: raw.speakAlerts !== false,
    pollSeconds: Math.max(5, Math.min(60, Number.isFinite(pollSeconds) ? pollSeconds : DEFAULT_POLL_SECONDS)),
    alertPercent: Math.max(70, Math.min(99, Number.isFinite(alertPercent) ? alertPercent : DEFAULT_ALERT_PERCENT)),
    language: resolveLanguage(raw.language ?? DEFAULT_LANGUAGE, hostLocale),
  };
}

function snapshotFromStored(value) {
  if (!value || typeof value !== "object") return null;
  const sampledAt = Number(value.sampledAt);
  if (!Number.isFinite(sampledAt)) return null;
  const gpu = clampPercent(value.gpu);
  const disk = clampPercent(value.disk ?? value.ssd);
  const snapshot = {
    freshness: "stale",
    cpu: clampPercent(value.cpu),
    ram: clampPercent(value.ram),
    gpu,
    disk,
    extendedMetricsAvailable: gpu != null || disk != null,
    sampledAt,
    attemptedAt: Date.now(),
  };
  return hasMetric(snapshot) ? snapshot : null;
}

function visibilityValue(value) {
  if (value === true || value === "shown") return true;
  if (value === false || value === "hidden") return false;
  return null;
}

function safeError(error) {
  if (error instanceof Error) return error.message;
  return typeof error === "string" ? error : "Unknown error";
}

async function warn(state, message, error) {
  try {
    await state.ctx.log.warn(message, { reason: safeError(error) });
  } catch {
    // Logging must not take down the plugin after the original failure.
  }
}

async function storageGet(state, key) {
  try {
    return await state.ctx.storage.get(key);
  } catch (error) {
    await warn(state, `system resources storage read failed: ${key}`, error);
    return undefined;
  }
}

async function storageSet(state, key, value) {
  try {
    await state.ctx.storage.set(key, value);
    return true;
  } catch (error) {
    await warn(state, `system resources storage write failed: ${key}`, error);
    return false;
  }
}

function isCurrent(state, generation) {
  return state.active && state.generation === generation;
}

function effectiveVisibility(state) {
  return state.hudVisible;
}

function snapshotForHud(snapshot) {
  if (!snapshot || snapshot.freshness === "unavailable" || !hasMetric(snapshot)) return null;
  return snapshot;
}

function hudItem(ctx, language, key, percent, stale) {
  if (percent == null) return null;
  const label = t(language, `hud.${key}`) + (stale ? ` (${t(language, "value.stale")})` : "");
  return { icon: ctx.assets.icon(key), value: percent, tone: toneFor(percent), label };
}

export function hudSpec(ctx, snapshot, language = "en") {
  const visibleSnapshot = snapshotForHud(snapshot);
  if (!visibleSnapshot) return null;
  const stale = visibleSnapshot.freshness === "stale";
  const items = [
    hudItem(ctx, language, "cpu", metricValue(visibleSnapshot, "cpu"), stale),
    hudItem(ctx, language, "ram", metricValue(visibleSnapshot, "ram"), stale),
    hudItem(ctx, language, "gpu", metricValue(visibleSnapshot, "gpu"), stale),
    hudItem(ctx, language, "disk", metricValue(visibleSnapshot, "disk"), stale),
  ].filter(Boolean);
  if (items.length === 0) return null;
  return { tone: "info", sticky: true, pin: true, dismissOn: [], priority: "normal", hud: { items } };
}

export function snapshotCopy(language, snapshot, kind) {
  if (!snapshot || snapshot.freshness === "unavailable" || !hasMetric(snapshot)) {
    return t(language, kind === "speech" ? "speech.unavailable" : "status.unavailable");
  }
  const values = [
    ["cpu", metricValue(snapshot, "cpu")],
    ["ram", metricValue(snapshot, "ram")],
    ["gpu", metricValue(snapshot, "gpu")],
    ["disk", metricValue(snapshot, "disk")],
  ];
  const separator = kind === "speech" ? ", " : " · ";
  const details = values
    .filter(([, value]) => value != null)
    .map(([key, value]) => `${t(language, `hud.${key}`)} ${formatPercent(language, value)}`)
    .join(separator);
  if (snapshot.freshness === "stale") {
    if (kind === "speech") return `${details} ${t(language, "speech.stale")}`;
    return t(language, "status.stale", { details });
  }
  return kind === "speech" ? `${details}.` : details;
}

export function resourcesResult(snapshot) {
  return {
    cpuPercent: metricValue(snapshot, "cpu"),
    ramPercent: metricValue(snapshot, "ram"),
    gpuPercent: metricValue(snapshot, "gpu"),
    diskUsedPercent: metricValue(snapshot, "disk"),
    extendedMetricsAvailable: metricValue(snapshot, "gpu") != null || metricValue(snapshot, "disk") != null,
    freshness: snapshot?.freshness ?? "unavailable",
    sampledAt: Number.isFinite(snapshot?.sampledAt) ? snapshot.sampledAt : null,
  };
}

function statusTone(snapshot) {
  if (!snapshot || snapshot.freshness === "unavailable" || snapshot.freshness === "stale") return "warning";
  const hottest = hottestMetric(snapshot);
  if (hottest?.value >= 90) return "error";
  if (hottest?.value >= 70) return "warning";
  return "info";
}

async function dismissHandle(state, handle) {
  if (!handle) return;
  try {
    await handle.dismiss();
  } catch (error) {
    await warn(state, "system resources HUD dismissal failed", error);
  }
}

async function dismissPinned(state) {
  const pinned = state.pinned;
  state.pinned = null;
  await dismissHandle(state, pinned);
}

async function updateHudForState(state, snapshot, generation) {
  if (!isCurrent(state, generation) || !effectiveVisibility(state) || state.hudSuppressed) return;
  const spec = hudSpec(state.ctx, snapshot, state.config.language);
  if (!spec) {
    await dismissPinned(state);
    return;
  }

  const pinned = state.pinned;
  if (pinned) {
    try {
      await pinned.update(spec);
      if (!isCurrent(state, generation) || !effectiveVisibility(state) || state.hudSuppressed || state.pinned !== pinned) return;
      return;
    } catch (error) {
      if (state.pinned === pinned) state.pinned = null;
      await warn(state, "system resources HUD update failed", error);
    }
  }

  if (!isCurrent(state, generation) || !effectiveVisibility(state) || state.hudSuppressed) return;
  let bubble;
  try {
    bubble = await state.ctx.ui.bubble(spec);
  } catch (error) {
    state.hudSuppressed = true;
    await warn(state, "system resources HUD creation failed", error);
    return;
  }
  if (!isCurrent(state, generation) || !effectiveVisibility(state) || state.hudSuppressed) {
    await dismissHandle(state, bubble);
    return;
  }
  state.pinned = bubble;
  bubble.onDismiss((reason) => {
    if (state.pinned?.id !== bubble.id) return;
    state.pinned = null;
    if (reason === "replaced") state.hudSuppressed = true;
  });
}

export async function publishStatus(ctx, snapshot, language = "en") {
  try {
    await ctx.status.set({ text: snapshotCopy(language, snapshot, "status"), tone: statusTone(snapshot) });
  } catch {
    // The lifecycle controller logs this failure. This compatibility wrapper has no state.
  }
}

async function publishStatusForState(state, snapshot, generation) {
  if (!isCurrent(state, generation)) return;
  try {
    await state.ctx.status.set({ text: snapshotCopy(state.config.language, snapshot, "status"), tone: statusTone(snapshot) });
  } catch (error) {
    await warn(state, "system resources status update failed", error);
  }
}

export async function maybeAlert(ctx, snapshot, now = Date.now(), cfg) {
  const settings = cfg ?? readConfig((await ctx.config.get()) ?? {}, ctx.locale);
  if (snapshot?.freshness !== "fresh" || !settings.speakAlerts) return null;
  const hottest = hottestMetric(snapshot);
  if (!hottest || hottest.value < settings.alertPercent) return null;
  try {
    await ctx.pet.react("error", { showMessage: false });
    await ctx.pet.speak(t(settings.language, "speech.alert", {
      label: t(settings.language, `hud.${hottest.key}`),
      value: String(hottest.value),
    }));
  } catch {
    // The lifecycle controller logs this failure. Keep this helper compatible.
  }
  return hottest;
}

async function maybeAlertForState(state, snapshot, now, generation) {
  if (!isCurrent(state, generation) || snapshot?.freshness !== "fresh" || !state.config.speakAlerts) return null;
  const hottest = hottestMetric(snapshot);
  if (!hottest || hottest.value < state.config.alertPercent) return null;
  if (now - state.lastAlertAt < ALERT_COOLDOWN_MS) return null;

  state.lastAlertAt = now;
  await storageSet(state, "lastAlertAt", now);
  if (!isCurrent(state, generation)) return null;
  try {
    await state.ctx.pet.react("error", { showMessage: false });
  } catch (error) {
    await warn(state, "system resources alert reaction failed", error);
  }
  if (!isCurrent(state, generation)) return null;
  try {
    await state.ctx.pet.speak(t(state.config.language, "speech.alert", {
      label: t(state.config.language, `hud.${hottest.key}`),
      value: String(hottest.value),
    }));
  } catch (error) {
    await warn(state, "system resources alert speech failed", error);
  }
  return hottest;
}

async function sampleMetrics(state, now) {
  try {
    return mergeSnapshot((await state.ctx.system.metrics()) ?? {}, now);
  } catch (error) {
    await warn(state, "system resources metric collection failed", error);
    return staleSnapshot(state.lastFreshSnapshot, now);
  }
}

async function executePoll(state, purposes, generation, requestedAt) {
  const now = Number.isFinite(requestedAt) ? requestedAt : Date.now();
  const snapshot = await sampleMetrics(state, now);
  if (!isCurrent(state, generation)) return snapshot;

  state.currentSnapshot = snapshot;
  if (snapshot.freshness === "fresh") {
    state.lastFreshSnapshot = snapshot;
    await storageSet(state, "snapshot", snapshot);
  }
  if (!isCurrent(state, generation)) return snapshot;

  const ambient = [...purposes].some((purpose) => purpose !== "capability");
  if (ambient) {
    await updateHudForState(state, snapshot, generation);
    await publishStatusForState(state, snapshot, generation);
    const alerting = [...purposes].some((purpose) => ["start", "scheduled", "config", "show"].includes(purpose));
    if (alerting) await maybeAlertForState(state, snapshot, now, generation);
  }
  return snapshot;
}

function requestPoll(state, purpose, requestedAt = Date.now()) {
  if (!state.active) return Promise.resolve(state.currentSnapshot);
  state.pendingPurposes.add(purpose);
  if (!Number.isFinite(state.pendingRequestedAt)) state.pendingRequestedAt = requestedAt;
  if (state.pollPromise) return state.pollPromise;

  const drain = (async () => {
    let result = state.currentSnapshot;
    while (state.active && state.pendingPurposes.size > 0) {
      const purposes = state.pendingPurposes;
      state.pendingPurposes = new Set();
      const startedAt = state.pendingRequestedAt;
      state.pendingRequestedAt = null;
      const generation = state.generation;
      result = await executePoll(state, purposes, generation, startedAt);
    }
    return result;
  })();
  state.pollPromise = drain;
  void drain.finally(() => {
    if (state.pollPromise === drain) state.pollPromise = null;
  });
  return drain;
}

async function reconcileScheduleNow(state) {
  state.scheduleGeneration += 1;
  const scheduleGeneration = state.scheduleGeneration;
  state.scheduleArmed = false;
  try {
    await state.ctx.schedule.cancel(SCHEDULE_ID);
  } catch (error) {
    await warn(state, "system resources schedule cancellation failed", error);
  }
  if (!state.active || scheduleGeneration !== state.scheduleGeneration) return;
  let lastError;
  for (let attempt = 1; attempt <= MAX_SCHEDULE_REGISTRATION_ATTEMPTS; attempt += 1) {
    if (!state.active || scheduleGeneration !== state.scheduleGeneration) return;
    try {
      await state.ctx.schedule.once(SCHEDULE_ID, state.config.pollSeconds * 1000, async () => {
        if (!state.active || scheduleGeneration !== state.scheduleGeneration) return;
        state.scheduleArmed = false;
        await requestPoll(state, "scheduled");
        if (state.active && scheduleGeneration === state.scheduleGeneration) await queueSchedule(state);
      });
      if (state.active && scheduleGeneration === state.scheduleGeneration) state.scheduleArmed = true;
      return;
    } catch (error) {
      lastError = error;
    }
  }
  await warn(state, "system resources schedule registration failed after bounded retry", lastError);
}

function queueSchedule(state) {
  const next = state.schedulePromise.then(() => reconcileScheduleNow(state));
  state.schedulePromise = next.catch(() => undefined);
  return next;
}

async function persistVisibility(state) {
  const visibleStored = await storageSet(state, "hudVisible", state.hudVisible);
  const configStored = await storageSet(state, "hudConfigValue", state.config.showHud);
  state.visibilityDirty = !(visibleStored && configStored);
}

async function setHudVisibility(state, visible) {
  if (!state.active) return state.currentSnapshot;
  state.hudVisible = visible;
  state.visibilitySource = "command";
  if (visible) state.hudSuppressed = false;
  state.generation += 1;
  if (!visible) {
    await dismissPinned(state);
    await persistVisibility(state);
    return state.currentSnapshot;
  }
  await persistVisibility(state);
  await queueSchedule(state);
  return requestPoll(state, "show");
}

async function handleConfigChange(state, raw) {
  if (!state.active) return;
  const next = readConfig(raw ?? {}, state.ctx.locale);
  const visibilityChanged = next.showHud !== state.config.showHud;
  state.config = next;
  state.generation += 1;
  if (visibilityChanged) {
    state.hudVisible = next.showHud;
    state.visibilitySource = "config";
    if (next.showHud) state.hudSuppressed = false;
    if (!next.showHud) await dismissPinned(state);
    await persistVisibility(state);
  }
  await queueSchedule(state);
  await requestPoll(state, "config");
}

async function speakSnapshotForState(state) {
  const snapshot = await requestPoll(state, "snapshot");
  if (!state.active || !snapshot) return snapshot;
  try {
    await state.ctx.pet.speak(snapshotCopy(state.config.language, snapshot, "speech"));
  } catch (error) {
    await warn(state, "system resources snapshot speech failed", error);
  }
  return snapshot;
}

async function readInitialState(state) {
  const [storedVisibility, storedConfigValue, storedAlert, storedSnapshot] = await Promise.all([
    storageGet(state, "hudVisible"),
    storageGet(state, "hudConfigValue"),
    storageGet(state, "lastAlertAt"),
    storageGet(state, "snapshot"),
  ]);
  const visible = visibilityValue(storedVisibility);
  const previousConfig = typeof storedConfigValue === "boolean" ? storedConfigValue : null;
  if (visible == null) {
    state.hudVisible = state.config.showHud;
    state.visibilitySource = "config";
  } else if (previousConfig != null && previousConfig !== state.config.showHud) {
    state.hudVisible = state.config.showHud;
    state.visibilitySource = "config";
  } else {
    state.hudVisible = visible;
    state.visibilitySource = "command";
  }
  if (typeof storedAlert === "number" && Number.isFinite(storedAlert)) state.lastAlertAt = storedAlert;
  state.lastFreshSnapshot = snapshotFromStored(storedSnapshot);
  state.currentSnapshot = state.lastFreshSnapshot ? staleSnapshot(state.lastFreshSnapshot) : null;
  if (visible == null || previousConfig == null || previousConfig !== state.config.showHud) await persistVisibility(state);
}

export async function collectSnapshot(ctx, now = Date.now()) {
  try {
    return mergeSnapshot((await ctx.system.metrics()) ?? {}, now);
  } catch {
    return unavailableSnapshot(now);
  }
}

export async function updateHud(ctx, snapshot, cfg) {
  const state = activeLifecycle?.ctx === ctx ? activeLifecycle : null;
  if (!state) return;
  if (cfg) state.config = cfg;
  await updateHudForState(state, snapshot, state.generation);
}

export async function tick(ctx, now = Date.now()) {
  const state = activeLifecycle?.ctx === ctx ? activeLifecycle : null;
  if (!state) return collectSnapshot(ctx, now);
  return requestPoll(state, "scheduled", now);
}

export async function showHud(ctx) {
  const state = activeLifecycle?.ctx === ctx ? activeLifecycle : null;
  return state ? setHudVisibility(state, true) : null;
}

export async function hideHud(ctx) {
  const state = activeLifecycle?.ctx === ctx ? activeLifecycle : null;
  if (state) await setHudVisibility(state, false);
}

export async function speakSnapshot(ctx) {
  const state = activeLifecycle?.ctx === ctx ? activeLifecycle : null;
  if (state) return speakSnapshotForState(state);
  const snapshot = await collectSnapshot(ctx);
  try {
    await ctx.pet.speak(snapshotCopy(resolveLanguage("auto", ctx.locale), snapshot, "speech"));
  } catch {}
  return snapshot;
}

let activeLifecycle = null;

export function register(OpenPetsPlugin) {
  OpenPetsPlugin.register({
    async start(ctx) {
      if (activeLifecycle) await stopLifecycle(activeLifecycle);
      const state = {
        ctx,
        active: true,
        generation: 1,
        scheduleGeneration: 0,
        scheduleArmed: false,
        schedulePromise: Promise.resolve(),
        pollPromise: null,
        pendingPurposes: new Set(),
        pendingRequestedAt: null,
        config: readConfig((await ctx.config.get()) ?? {}, ctx.locale),
        hudVisible: true,
        visibilitySource: "config",
        visibilityDirty: false,
        hudSuppressed: false,
        pinned: null,
        currentSnapshot: null,
        lastFreshSnapshot: null,
        lastAlertAt: 0,
        unsubscribeConfig: null,
        unsubscribeClick: null,
        assistantRegistered: false,
      };
      activeLifecycle = state;
      await readInitialState(state);

      try {
        state.unsubscribeConfig = ctx.config.onChange((raw) => handleConfigChange(state, raw));
      } catch (error) {
        await warn(state, "system resources config subscription failed", error);
      }
      try {
        state.unsubscribeClick = ctx.events.on("pet:clicked", () => speakSnapshotForState(state));
      } catch (error) {
        await warn(state, "system resources click subscription failed", error);
      }

      const icon = ctx.assets.icon("system-resources");
      const commandSpecs = [
        ["show", "$t:command.show.title", "$t:command.show.description", () => setHudVisibility(state, true)],
        ["hide", "$t:command.hide.title", "$t:command.hide.description", () => setHudVisibility(state, false)],
        ["snapshot", "$t:command.snapshot.title", "$t:command.snapshot.description", () => speakSnapshotForState(state)],
      ];
      for (const [id, title, description, handler] of commandSpecs) {
        try {
          await ctx.commands.register({ id, title, description, icon }, handler);
        } catch (error) {
          await warn(state, `system resources command registration failed: ${id}`, error);
        }
      }

      if (ctx.assistant?.registerCapability) {
        try {
          await ctx.assistant.registerCapability(
            {
              id: "resources.get",
              description: "Read current CPU and RAM usage percents plus GPU and disk usage when the OpenPets host supports them.",
              inputSchema: { type: "object", properties: {}, additionalProperties: false },
            },
            async () => resourcesResult(await requestPoll(state, "capability")),
          );
          state.assistantRegistered = true;
        } catch (error) {
          await warn(state, "system resources assistant capability registration failed", error);
        }
      }

      await requestPoll(state, "start");
      await queueSchedule(state);
    },
    async stop() {
      if (activeLifecycle) await stopLifecycle(activeLifecycle);
    },
  });
}

async function stopLifecycle(state) {
  if (!state.active) return;
  state.active = false;
  state.generation += 1;
  state.scheduleGeneration += 1;
  state.scheduleArmed = false;
  if (state.unsubscribeConfig) {
    try { state.unsubscribeConfig(); } catch (error) { await warn(state, "system resources config unsubscribe failed", error); }
    state.unsubscribeConfig = null;
  }
  if (state.unsubscribeClick) {
    try { state.unsubscribeClick(); } catch (error) { await warn(state, "system resources click unsubscribe failed", error); }
    state.unsubscribeClick = null;
  }
  if (state.assistantRegistered && state.ctx.assistant?.unregisterCapability) {
    try {
      await state.ctx.assistant.unregisterCapability("resources.get");
    } catch (error) {
      await warn(state, "system resources assistant capability cleanup failed", error);
    }
    state.assistantRegistered = false;
  }
  try {
    await state.ctx.schedule.cancel(SCHEDULE_ID);
  } catch (error) {
    await warn(state, "system resources schedule cancellation failed during shutdown", error);
  }
  await dismissPinned(state);
  if (state.visibilityDirty) await persistVisibility(state);
  if (activeLifecycle === state) activeLifecycle = null;
}
