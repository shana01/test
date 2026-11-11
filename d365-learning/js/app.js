(function () {
  "use strict";

  const AREAS = window.D365_AREAS;
  const MODULES = window.D365_MODULES;
  const PROCESSES = window.D365_PROCESSES;
  const PASS_MARK = 0.7;
  const STORAGE_KEY = "d365-academy-progress-v1";
  const THEME_KEY = "d365-academy-theme";

  const app = document.getElementById("app");
  const moduleById = Object.fromEntries(MODULES.map((m) => [m.id, m]));
  const areaById = Object.fromEntries(AREAS.map((a) => [a.id, a]));

  // ------------------------------------------------------------------ storage
  function safeGet(key) {
    try { return localStorage.getItem(key); } catch (e) { return null; }
  }
  function safeSet(key, value) {
    try { localStorage.setItem(key, value); } catch (e) { /* storage unavailable */ }
  }

  function loadProgress() {
    try {
      const p = JSON.parse(safeGet(STORAGE_KEY) || "{}");
      return { visited: p.visited || {}, tasks: p.tasks || {}, quiz: p.quiz || {} };
    } catch (e) {
      return { visited: {}, tasks: {}, quiz: {} };
    }
  }
  let progress = loadProgress();
  function saveProgress() { safeSet(STORAGE_KEY, JSON.stringify(progress)); }

  function moduleProgress(m) {
    const tasksDone = m.tasks.filter((_, i) => progress.tasks[m.id + ":" + i]).length;
    const quizPassed = (progress.quiz[m.id] || 0) >= PASS_MARK ? 1 : 0;
    const visited = progress.visited[m.id] ? 1 : 0;
    const total = m.tasks.length + 2;
    return { tasksDone, quizPassed, visited, pct: Math.round(((tasksDone + quizPassed + visited) / total) * 100) };
  }
  function overallProgress() {
    const pcts = MODULES.map((m) => moduleProgress(m).pct);
    return Math.round(pcts.reduce((a, b) => a + b, 0) / pcts.length);
  }

  // ------------------------------------------------------------------ helpers
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function highlight(text, q) {
    const safe = esc(text);
    if (!q) return safe;
    const re = new RegExp("(" + esc(q).replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "ig");
    return safe.replace(re, "<mark>$1</mark>");
  }
  function bar(pct) { return `<div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><span style="width:${pct}%"></span></div>`; }
  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
  function setActiveNav(name) {
    document.querySelectorAll("[data-nav]").forEach((a) => a.classList.toggle("active", a.dataset.nav === name));
  }

  // ------------------------------------------------------------------ views
  function renderHome() {
    setActiveNav("home");
    const overall = overallProgress();
    const next = MODULES.find((m) => moduleProgress(m).pct < 100);
    let html = `
      <section class="hero">
        <div>
          <h1>Learn Dynamics 365 Finance &amp; Operations</h1>
          <p>Work through each module at your own pace: understand the key concepts, follow step-by-step guides with the exact menu paths, see how modules connect in end-to-end processes, and test yourself with quizzes.</p>
          ${next ? `<a class="btn primary" href="#/module/${next.id}">${overall > 0 ? "Continue" : "Start"} with ${esc(next.name)} →</a>` : `<span class="pill">All modules complete 🎉</span>`}
        </div>
        <div class="card">
          <div class="muted">Your overall progress</div>
          <div class="stat-big">${overall}%</div>
          ${bar(overall)}
          <p class="muted" style="font-size:13px;margin-top:10px">Progress = module opened + guides practised + quiz passed (${PASS_MARK * 100}%+).</p>
        </div>
      </section>`;

    AREAS.forEach((area) => {
      const mods = MODULES.filter((m) => m.area === area.id);
      html += `<section class="area">
        <div class="area-head"><span class="area-dot" style="background:${area.color}"></span><h2>${esc(area.name)}</h2></div>
        <div class="grid">`;
      mods.forEach((m) => {
        const p = moduleProgress(m);
        const best = progress.quiz[m.id];
        html += `
          <a class="card module-card" href="#/module/${m.id}" style="--area-color:${area.color}">
            <h3>${esc(m.name)}</h3>
            <p>${esc(m.summary)}</p>
            <div class="module-meta"><span>${m.tasks.length} guides · ${m.quiz.length} questions</span><span>${best !== undefined ? "Quiz " + Math.round(best * 100) + "%" : ""}</span></div>
            ${bar(p.pct)}
          </a>`;
      });
      html += `</div></section>`;
    });
    app.innerHTML = html;
  }

  const TABS = [
    ["overview", "Overview"],
    ["concepts", "Key concepts"],
    ["howto", "How-to guides"],
    ["tips", "Tips"],
    ["quiz", "Quiz"],
  ];

  function renderModule(id, tab) {
    const m = moduleById[id];
    if (!m) return renderNotFound();
    setActiveNav("home");
    tab = TABS.some(([t]) => t === tab) ? tab : "overview";

    if (!progress.visited[m.id]) {
      progress.visited[m.id] = true;
      saveProgress();
    }
    const area = areaById[m.area];
    const p = moduleProgress(m);
    const idx = MODULES.indexOf(m);
    const prev = MODULES[idx - 1];
    const next = MODULES[idx + 1];

    app.innerHTML = `
      <div class="crumbs"><a href="#/">Modules</a> › ${esc(area.name)}</div>
      <div class="module-head">
        <div>
          <span class="pill" style="color:${area.color}">${esc(area.name)}</span>
          <h1>${esc(m.name)}</h1>
          <p class="muted" style="margin:0;max-width:65ch">${esc(m.summary)}</p>
        </div>
        <div class="card progress-box">
          <div class="muted" style="font-size:13px">Module progress · ${p.pct}%</div>
          ${bar(p.pct)}
          <div class="muted" style="font-size:13px;margin-top:8px">${p.tasksDone}/${m.tasks.length} guides practised · Quiz ${p.quizPassed ? "passed ✓" : "not passed"}</div>
        </div>
      </div>
      <div class="tabs" role="tablist">
        ${TABS.map(([t, label]) => `<button role="tab" aria-selected="${t === tab}" class="${t === tab ? "active" : ""}" data-tab="${t}">${label}</button>`).join("")}
      </div>
      <section id="tabBody"></section>
      <div class="quiz-foot" style="margin-top:32px">
        ${prev ? `<a class="btn" href="#/module/${prev.id}">← ${esc(prev.name)}</a>` : "<span></span>"}
        ${next ? `<a class="btn" href="#/module/${next.id}">${esc(next.name)} →</a>` : "<span></span>"}
      </div>`;

    app.querySelectorAll("[data-tab]").forEach((b) =>
      b.addEventListener("click", () => { location.hash = `#/module/${m.id}/${b.dataset.tab}`; })
    );

    const body = document.getElementById("tabBody");
    if (tab === "overview") renderOverview(m, body);
    else if (tab === "concepts") renderConcepts(m, body);
    else if (tab === "howto") renderHowTo(m, body);
    else if (tab === "tips") renderTips(m, body);
    else renderQuiz(m, body);
  }

  function renderOverview(m, body) {
    const related = PROCESSES.filter((pr) => pr.steps.some((s) => s.module === m.id));
    body.innerHTML = `
      <div class="card prose">
        ${m.overview.map((p) => `<p>${esc(p)}</p>`).join("")}
      </div>
      ${related.length ? `
        <h3 style="margin-top:24px">Business processes that use this module</h3>
        <div class="toolbar">${related.map((pr) => `<a class="btn" href="#/processes#${pr.id}">${esc(pr.name)}</a>`).join("")}</div>` : ""}
      <h3 style="margin-top:24px">Suggested learning path</h3>
      <ol>
        <li>Read the <a href="#/module/${m.id}/concepts">key concepts</a> (${m.concepts.length} terms).</li>
        <li>Practise the <a href="#/module/${m.id}/howto">how-to guides</a> in a sandbox or demo environment (e.g. the USMF demo company) and tick them off.</li>
        <li>Review the <a href="#/module/${m.id}/tips">tips</a>.</li>
        <li>Take the <a href="#/module/${m.id}/quiz">quiz</a> — ${PASS_MARK * 100}% or more to pass.</li>
      </ol>`;
  }

  function renderConcepts(m, body) {
    body.innerHTML = `
      <dl class="concepts">
        ${m.concepts.map((c) => `<div class="card concept"><dt>${esc(c.term)}</dt><dd>${esc(c.def)}</dd></div>`).join("")}
      </dl>
      <p style="margin-top:16px"><a class="btn" href="#/flashcards/${m.id}">Practise these as flashcards →</a></p>`;
  }

  function renderHowTo(m, body) {
    body.innerHTML = m.tasks.map((t, i) => {
      const key = m.id + ":" + i;
      const done = !!progress.tasks[key];
      return `
        <article class="card task ${done ? "is-done" : ""}">
          <div class="task-head">
            <div>
              <h3>${i + 1}. ${esc(t.title)}</h3>
              <div class="path" title="Navigation path">${esc(t.path)}</div>
            </div>
            <label class="done-toggle"><input type="checkbox" data-task="${key}" ${done ? "checked" : ""}> Practised</label>
          </div>
          <ol>${t.steps.map((s) => `<li>${esc(s)}</li>`).join("")}</ol>
          ${t.tip ? `<div class="tip"><strong>Tip:</strong> ${esc(t.tip)}</div>` : ""}
        </article>`;
    }).join("");

    body.querySelectorAll("[data-task]").forEach((cb) =>
      cb.addEventListener("change", () => {
        if (cb.checked) progress.tasks[cb.dataset.task] = true;
        else delete progress.tasks[cb.dataset.task];
        saveProgress();
        renderModule(m.id, "howto");
      })
    );
  }

  function renderTips(m, body) {
    body.innerHTML = `<div class="card"><ul class="tips-list">${m.tips.map((t) => `<li>${esc(t)}</li>`).join("")}</ul></div>`;
  }

  function renderQuiz(m, body) {
    const questions = shuffle(m.quiz).map((q) => {
      const order = shuffle(q.options.map((_, i) => i));
      return { q: q.q, explain: q.explain, options: order.map((i) => q.options[i]), answer: order.indexOf(q.answer) };
    });
    let current = 0;
    let score = 0;

    function showQuestion() {
      const q = questions[current];
      body.innerHTML = `
        <div class="card">
          <div class="muted">Question ${current + 1} of ${questions.length}</div>
          <div class="quiz-q">${esc(q.q)}</div>
          <div class="options">${q.options.map((o, i) => `<button class="option" data-i="${i}">${esc(o)}</button>`).join("")}</div>
          <div class="explain" id="explain"></div>
          <div class="quiz-foot">
            <span class="muted">Score: ${score}</span>
            <button class="btn primary" id="nextQ" disabled>${current + 1 === questions.length ? "See result" : "Next question"}</button>
          </div>
        </div>`;
      const buttons = body.querySelectorAll(".option");
      buttons.forEach((btn) =>
        btn.addEventListener("click", () => {
          const chosen = Number(btn.dataset.i);
          const correct = chosen === q.answer;
          if (correct) score++;
          buttons.forEach((b) => {
            b.disabled = true;
            const i = Number(b.dataset.i);
            if (i === q.answer) b.classList.add("correct");
            else if (i === chosen) b.classList.add("wrong");
          });
          document.getElementById("explain").innerHTML =
            `<div class="tip"><strong>${correct ? "Correct!" : "Not quite."}</strong> ${esc(q.explain)}</div>`;
          const nextBtn = document.getElementById("nextQ");
          nextBtn.disabled = false;
          nextBtn.focus();
        })
      );
      document.getElementById("nextQ").addEventListener("click", () => {
        current++;
        if (current < questions.length) showQuestion();
        else showResult();
      });
    }

    function showResult() {
      const ratio = score / questions.length;
      const best = Math.max(progress.quiz[m.id] || 0, ratio);
      progress.quiz[m.id] = best;
      saveProgress();
      const passed = ratio >= PASS_MARK;
      body.innerHTML = `
        <div class="card" style="text-align:center">
          <div class="stat-big">${score} / ${questions.length}</div>
          <p>${passed ? "Well done — you passed this module's quiz! ✓" : `You need ${PASS_MARK * 100}% to pass. Review the concepts and guides, then try again.`}</p>
          <p class="muted">Best score: ${Math.round(best * 100)}%</p>
          <div class="flash-controls">
            <button class="btn" id="retry">Try again</button>
            ${passed ? "" : `<a class="btn" href="#/module/${m.id}/concepts">Review concepts</a>`}
            <a class="btn primary" href="#/">Back to modules</a>
          </div>
        </div>`;
      document.getElementById("retry").addEventListener("click", () => renderModule(m.id, "quiz"));
    }

    showQuestion();
  }

  function renderProcesses(anchor) {
    setActiveNav("processes");
    app.innerHTML = `
      <h1>End-to-end business processes</h1>
      <p class="muted" style="max-width:70ch">D365 F&amp;O modules don't work in isolation. These are the core cross-module processes — follow a document from start to finish to understand how each module hands over to the next.</p>
      ${PROCESSES.map((pr) => `
        <section class="card process" id="${pr.id}">
          <h2 style="margin:0">${esc(pr.name)}</h2>
          <p class="muted" style="margin:4px 0 0">${esc(pr.summary)}</p>
          <div class="flow">
            ${pr.steps.map((s, i) => {
              const mod = moduleById[s.module];
              const color = areaById[mod.area].color;
              return `<div class="flow-step" style="--area-color:${color}">
                <div class="n">STEP ${i + 1}</div>
                <h4>${esc(s.title)}</h4>
                <p>${esc(s.detail)}</p>
                <a href="#/module/${mod.id}">${esc(mod.name)} →</a>
              </div>`;
            }).join("")}
          </div>
        </section>`).join("")}`;
    if (anchor) {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function allConcepts() {
    const list = [];
    MODULES.forEach((m) => m.concepts.forEach((c) => list.push({ ...c, module: m })));
    return list.sort((a, b) => a.term.localeCompare(b.term));
  }

  function renderGlossary() {
    setActiveNav("glossary");
    const concepts = allConcepts();
    app.innerHTML = `
      <h1>Glossary</h1>
      <div class="toolbar">
        <input id="gq" type="search" placeholder="Filter ${concepts.length} terms…" aria-label="Filter terms">
        <select id="gm" aria-label="Filter by module">
          <option value="">All modules</option>
          ${MODULES.map((m) => `<option value="${m.id}">${esc(m.name)}</option>`).join("")}
        </select>
      </div>
      <div class="card" id="glist"></div>`;
    const gq = document.getElementById("gq");
    const gm = document.getElementById("gm");
    const list = document.getElementById("glist");
    function update() {
      const q = gq.value.trim().toLowerCase();
      const mod = gm.value;
      const rows = concepts.filter((c) =>
        (!mod || c.module.id === mod) &&
        (!q || c.term.toLowerCase().includes(q) || c.def.toLowerCase().includes(q))
      );
      list.innerHTML = rows.length
        ? rows.map((c) => `
          <div class="gloss-item">
            <strong>${highlight(c.term, gq.value.trim())}</strong>
            <a class="pill" style="margin-left:8px;text-decoration:none" href="#/module/${c.module.id}/concepts">${esc(c.module.name)}</a>
            <div class="muted">${highlight(c.def, gq.value.trim())}</div>
          </div>`).join("")
        : `<p class="muted">No terms match.</p>`;
    }
    gq.addEventListener("input", update);
    gm.addEventListener("change", update);
    update();
  }

  function renderFlashcards(moduleId) {
    setActiveNav("flashcards");
    const pool = allConcepts().filter((c) => !moduleId || c.module.id === moduleId);
    let deck = shuffle(pool);
    let i = 0;
    let flipped = false;

    app.innerHTML = `
      <div class="flash-wrap">
        <h1>Flashcards</h1>
        <div class="toolbar" style="justify-content:center">
          <select id="fm" aria-label="Choose module">
            <option value="">All modules</option>
            ${MODULES.map((m) => `<option value="${m.id}" ${m.id === moduleId ? "selected" : ""}>${esc(m.name)}</option>`).join("")}
          </select>
        </div>
        <div class="muted" id="fcount"></div>
        <div class="card flashcard" id="fcard" tabindex="0" role="button" aria-label="Flip card"></div>
        <div class="flash-controls">
          <button class="btn" id="fprev">← Previous</button>
          <button class="btn" id="fflip">Flip</button>
          <button class="btn primary" id="fnext">Next →</button>
          <button class="btn" id="fshuffle">Shuffle</button>
        </div>
        <p class="muted" style="font-size:13px">Tip: press Space to flip, ← / → to move.</p>
      </div>`;

    const card = document.getElementById("fcard");
    function draw() {
      const c = deck[i];
      document.getElementById("fcount").textContent = `Card ${i + 1} of ${deck.length} · ${c.module.name}`;
      card.classList.toggle("back", flipped);
      card.innerHTML = flipped ? esc(c.def) : esc(c.term);
    }
    const flip = () => { flipped = !flipped; draw(); };
    const move = (d) => { i = (i + d + deck.length) % deck.length; flipped = false; draw(); };

    card.addEventListener("click", flip);
    document.getElementById("fflip").addEventListener("click", flip);
    document.getElementById("fnext").addEventListener("click", () => move(1));
    document.getElementById("fprev").addEventListener("click", () => move(-1));
    document.getElementById("fshuffle").addEventListener("click", () => { deck = shuffle(pool); i = 0; flipped = false; draw(); });
    document.getElementById("fm").addEventListener("change", (e) => {
      location.hash = e.target.value ? `#/flashcards/${e.target.value}` : "#/flashcards";
    });
    flashKeys = (e) => {
      if (e.target.matches("input, select, textarea")) return;
      if (e.key === " ") { e.preventDefault(); flip(); }
      else if (e.key === "ArrowRight") move(1);
      else if (e.key === "ArrowLeft") move(-1);
    };
    draw();
  }
  let flashKeys = null;
  document.addEventListener("keydown", (e) => { if (flashKeys) flashKeys(e); });

  function renderSearch(q) {
    setActiveNav("");
    const query = q.trim().toLowerCase();
    const results = [];
    if (query) {
      MODULES.forEach((m) => {
        if ((m.name + " " + m.summary).toLowerCase().includes(query))
          results.push({ href: `#/module/${m.id}`, title: m.name, sub: "Module · " + m.summary });
        m.tasks.forEach((t) => {
          const hay = [t.title, t.path, ...t.steps, t.tip || ""].join(" ").toLowerCase();
          if (hay.includes(query)) results.push({ href: `#/module/${m.id}/howto`, title: t.title, sub: `How-to · ${m.name} · ${t.path}` });
        });
        m.concepts.forEach((c) => {
          if ((c.term + " " + c.def).toLowerCase().includes(query))
            results.push({ href: `#/module/${m.id}/concepts`, title: c.term, sub: `Concept · ${m.name} · ${c.def}` });
        });
      });
    }
    app.innerHTML = `
      <h1>Search</h1>
      <p class="muted">${results.length} result${results.length === 1 ? "" : "s"} for “${esc(q)}”</p>
      <div class="card">
        ${results.length
          ? results.map((r) => `<a class="result" href="${r.href}"><strong>${highlight(r.title, q.trim())}</strong><br><small>${highlight(r.sub, q.trim())}</small></a>`).join("")
          : `<p class="muted">Nothing found. Try a module name (\"payable\"), a document (\"purchase order\") or a term (\"voucher\").</p>`}
      </div>`;
  }

  function renderNotFound() {
    app.innerHTML = `<div class="card"><h1>Page not found</h1><p><a href="#/">Back to modules</a></p></div>`;
  }

  // ------------------------------------------------------------------ router
  function route() {
    flashKeys = null;
    const hash = location.hash.replace(/^#/, "") || "/";
    // "#/processes#p2p" style anchors
    const [pathPart, anchor] = hash.split("#");
    const [path, queryString] = pathPart.split("?");
    const parts = path.split("/").filter(Boolean);

    if (parts.length === 0) renderHome();
    else if (parts[0] === "module") renderModule(parts[1], parts[2]);
    else if (parts[0] === "processes") renderProcesses(anchor);
    else if (parts[0] === "glossary") renderGlossary();
    else if (parts[0] === "flashcards") renderFlashcards(parts[1] && moduleById[parts[1]] ? parts[1] : "");
    else if (parts[0] === "search") renderSearch(new URLSearchParams(queryString || "").get("q") || "");
    else renderNotFound();

    if (!anchor) window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);

  document.getElementById("searchForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const q = document.getElementById("searchInput").value.trim();
    if (q) location.hash = "#/search?q=" + encodeURIComponent(q);
  });

  document.getElementById("resetProgress").addEventListener("click", () => {
    if (confirm("Reset all progress and quiz scores?")) {
      progress = { visited: {}, tasks: {}, quiz: {} };
      saveProgress();
      route();
    }
  });

  // ------------------------------------------------------------------ theme
  const root = document.documentElement;
  const storedTheme = safeGet(THEME_KEY);
  if (storedTheme) root.dataset.theme = storedTheme;
  document.getElementById("themeToggle").addEventListener("click", () => {
    const isDark = root.dataset.theme
      ? root.dataset.theme === "dark"
      : window.matchMedia("(prefers-color-scheme: dark)").matches;
    root.dataset.theme = isDark ? "light" : "dark";
    safeSet(THEME_KEY, root.dataset.theme);
  });

  route();
})();
