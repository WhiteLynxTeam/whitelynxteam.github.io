// Сайт команды «Белые Рыси» (whitelynx.team): node tools/build.js — пишет index.html и en/index.html.
// Тексты — здесь, разметка — в шаблоне ниже: русская и английская версии не расходятся.
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://whitelynx.team";
const APP = "https://lynx3d.app";
const MAIL = "hello@whitelynx.team";
const YEAR = 2026;

const T = {
  ru: {
    lang: "ru", other: "en", otherLabel: "EN", prefix: "/",
    team: "Белые Рыси",
    navApps: "Приложения", navTeam: "Команда", navFacts: "Рысиные факты",
    title: "Белые Рыси — команда разработчиков",
    desc: "Маленькая команда, которая делает приложения с объёмом. Lynx3D — галерея с 3D и VR для Android.",
    lead: "Маленькая команда, которая делает приложения с объёмом. Нас двое, и мы видим в 3D.",
    toApps: "Наши приложения", contact: "Написать нам",
    appsTitle: "Приложения",
    lxTag: "Android · скоро",
    lxText: "Галерея Civitai и Wikimedia Commons с объёмом: 3D по карте глубины прямо на телефоне, своя карта глубины, VR-режим для очков и панорамы 360°.",
    more: "Подробнее",
    teamTitle: "Команда",
    captainName: "Белая Рысь", captainRole: "Основатель, капитан и главный испытатель",
    captainText: "Придумывает, решает, собирает APK и первым проверяет каждую версию на живом телефоне. Ни одна кнопка не уходит в релиз, пока капитан не нажмёт её лично. Носит 3D-очки даже на совещаниях.",
    teacherName: "Клод", teacherRole: "Учитель и правая лапа",
    teacherText: "<a href=\"https://claude.ai\">Claude</a> от Anthropic. Пишет код быстрее, чем капитан успевает налить чай. Иногда путает кнопку со спойлером, но всегда признаёт ошибку и чинит.",
    factsTitle: "Рысиные факты",
    facts: [
      "У рыси кисточки на ушах. У нас — красная и голубая линза: так рыси видят в 3D.",
      "Рысь — одиночка. Мы — нет: капитан и учитель, а все сотрудники зовутся белорыськами.",
      "Рысь ходит след в след, чтобы не шуметь. Мы выпускаем версию за версией — тоже без лишнего шума.",
      "Говорят, рысь видит в темноте лучше всех. Проверять не стали — у нас и так включён тёмный режим.",
    ],
    footerMail: "Почта",
  },
  en: {
    lang: "en", other: "ru", otherLabel: "RU", prefix: "/en/",
    team: "White Lynx",
    navApps: "Apps", navTeam: "Team", navFacts: "Lynx facts",
    title: "White Lynx — app developers",
    desc: "A small team that makes apps with depth. Lynx3D is a gallery with 3D and VR for Android.",
    lead: "A small team that makes apps with depth. Two of us, and we see in 3D.",
    toApps: "Our apps", contact: "Write to us",
    appsTitle: "Apps",
    lxTag: "Android · coming soon",
    lxText: "A Civitai and Wikimedia Commons gallery with depth: 3D from a depth map built right on the phone, your own depth maps, a VR mode for headsets and 360° panoramas.",
    more: "Learn more",
    teamTitle: "Team",
    captainName: "White Lynx", captainRole: "Founder, captain and chief tester",
    captainText: "Comes up with ideas, makes the calls, builds the APK and tries every version on a real phone first. No button ships until the captain has pressed it personally. Wears 3D glasses even in meetings.",
    teacherName: "Claude", teacherRole: "Teacher and right paw",
    teacherText: "<a href=\"https://claude.ai\">Claude</a> by Anthropic. Writes code faster than the captain can pour a cup of tea. Sometimes mistakes a button for a spoiler, but always owns up and fixes it.",
    factsTitle: "Lynx facts",
    facts: [
      "A lynx has tufts on its ears. We have a red and a cyan lens — that's how lynxes see in 3D.",
      "Lynxes live alone. We don't: a captain and a teacher, and everyone on the team is a \"belorys\" (Russian for \"white lynx\" — say it with a smile).",
      "A lynx steps in its own tracks to stay quiet. We ship version after version — quietly too.",
      "They say lynxes see best in the dark. We didn't check — dark mode is on anyway.",
    ],
    footerMail: "Email",
  },
};

const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function page(t) {
  const url = SITE + t.prefix;
  return `<!doctype html>
<html lang="${t.lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(t.title)}</title>
<meta name="description" content="${esc(t.desc)}">
<link rel="canonical" href="${url}">
<link rel="alternate" hreflang="ru" href="${SITE}/">
<link rel="alternate" hreflang="en" href="${SITE}/en/">
<link rel="icon" href="/assets/lynx-logo.svg" type="image/svg+xml">
<meta property="og:title" content="${esc(t.title)}">
<meta property="og:description" content="${esc(t.desc)}">
<meta property="og:url" content="${url}">
<meta name="theme-color" content="#0891b2">
<link rel="stylesheet" href="/assets/style.css">
</head>
<body>
<header class="top"><div class="wrap">
  <a class="brand" href="${t.prefix}"><img src="/assets/lynx-logo.svg" alt="" width="36" height="36">${t.team}</a>
  <nav class="nav">
    <a href="#apps">${t.navApps}</a>
    <a href="#team">${t.navTeam}</a>
    <a href="#facts">${t.navFacts}</a>
    <a class="lang" href="${T[t.other].prefix}" hreflang="${t.other}" lang="${t.other}">${t.otherLabel}</a>
  </nav>
</div></header>
<main>
<div class="hero wrap">
  <img class="lynx" src="/assets/lynx-logo.svg" alt="" width="190" height="190">
  <h1>${t.team} <span class="r">🐾</span></h1>
  <p class="lead">${t.lead}</p>
  <div class="buttons">
    <a class="btn primary" href="#apps">${t.toApps}</a>
    <a class="btn" href="mailto:${MAIL}">${t.contact}</a>
  </div>
</div>

<section id="apps"><div class="wrap">
  <h2>${t.appsTitle}</h2>
  <div class="card app">
    <img src="/assets/lynx-logo.svg" alt="" width="160" height="160">
    <div>
      <span class="tag">${t.lxTag}</span>
      <h3>Lynx3D</h3>
      <p>${t.lxText}</p>
      <div class="buttons" style="justify-content:flex-start">
        <a class="btn primary" href="${APP}${t.prefix}">${t.more}</a>
      </div>
    </div>
  </div>
</div></section>

<section id="team"><div class="wrap">
  <h2>${t.teamTitle}</h2>
  <div class="grid">
    <div class="card member">
      <img src="/assets/lynx-captain.svg" alt="" width="120" height="120">
      <div><h3>${t.captainName}</h3><div class="role">${t.captainRole}</div><p>${t.captainText}</p></div>
    </div>
    <div class="card member">
      <img src="/assets/lynx-teacher.svg" alt="" width="120" height="120">
      <div><h3>${t.teacherName}</h3><div class="role">${t.teacherRole}</div><p>${t.teacherText}</p></div>
    </div>
  </div>
</div></section>

<section id="facts"><div class="wrap">
  <h2>${t.factsTitle}</h2>
  <ul class="facts">${t.facts.map((f) => `<li>${f}</li>`).join("")}</ul>
</div></section>
</main>
<footer><div class="wrap">
  <span>© ${YEAR} White Lynx Team 🐾</span>
  <span><a href="${APP}${t.prefix}">lynx3d.app</a> · ${t.footerMail}: <a href="mailto:${MAIL}">${MAIL}</a></span>
</div></footer>
</body>
</html>
`;
}

for (const t of Object.values(T)) {
  const file = path.join(ROOT, t.prefix.slice(1), "index.html");
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(t));
  console.log("wrote", path.relative(ROOT, file));
}
fs.writeFileSync(path.join(ROOT, "CNAME"), "whitelynx.team\n");
fs.writeFileSync(path.join(ROOT, ".nojekyll"), "");
