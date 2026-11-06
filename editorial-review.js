/* Controle editorial por versículo — Enciclopédia Bíblica.
   Os estados-base de Gênesis e Êxodo migram o registro editorial anterior.
   Alterações feitas no navegador ficam em localStorage e entram no backup JSON.
   A integração ao histórico versionado do repositório exige exportação e commit. */
(function () {
  "use strict";

  const STORAGE_KEY = "encBibEditorialReviewsV1";
  const STATUS = {
    pendente: "Pendente",
    em_revisao: "Em revisão",
    revisado: "Revisado",
    reaberto: "Reaberto"
  };
  const TRANSITIONS = {
    pendente: ["pendente", "em_revisao"],
    em_revisao: ["em_revisao", "revisado"],
    revisado: ["revisado", "reaberto"],
    reaberto: ["reaberto", "em_revisao"]
  };
  const BASE = Object.create(null);
  const panel = document.getElementById("editorialReviewPanel");

  function escapeHtml(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (char) {
      return ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char];
    });
  }

  function addLegacyBook(bookIndex, chapters, status, source, observation) {
    if (!chapters || typeof chapters !== "object") return;
    Object.keys(chapters).forEach(function (chapterKey) {
      const chapter = Number(chapterKey);
      const verses = chapters[chapterKey];
      if (!Array.isArray(verses)) return;
      verses.forEach(function (_, index) {
        const key = bookIndex + "-" + chapter + "-" + (index + 1);
        BASE[key] = {
          status: status,
          updatedAt: "2026-11-06",
          source: source,
          observation: observation,
          reopenReason: "",
          history: [{
            from: null,
            to: status,
            at: "2026-11-06",
            source: source,
            observation: observation,
            reason: "Migração do estado editorial anterior; nenhuma aprovação foi criada por esta implementação."
          }]
        };
      });
    });
  }

  try {
    if (typeof GENESIS_TEXT !== "undefined") {
      addLegacyBook(
        0,
        GENESIS_TEXT,
        "revisado",
        "Registro anterior do projeto e declaração do proprietário (2026-11-06)",
        "Estado anterior preservado: Gênesis foi considerado revisado. A conferência final de abertura permanece registrada como pendência do livro; esta migração não rebaixa os trechos aprovados."
      );
    }
  } catch (error) {
    console.warn("Não foi possível migrar os estados anteriores de Gênesis.", error);
  }

  addLegacyBook(
    1,
    window.EXODUS_TEXT,
    "em_revisao",
    "REVISAO-EXODO.md — registro anterior dos capítulos 1–40",
    "Estado anterior preservado: os capítulos estão integrados e registrados em revisão. A conferência acadêmica versículo por versículo com o hebraico continua pendente; integração técnica não equivale a aprovação textual."
  );

  function readOverrides() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return value && typeof value === "object" && !Array.isArray(value) ? value : {};
    } catch (error) {
      if (typeof recordAppError === "function") recordAppError(error, "Leitura do registro editorial");
      return {};
    }
  }

  function getRecord(key) {
    const base = BASE[key] || { status: "pendente", history: [] };
    const local = readOverrides()[key];
    if (!local || typeof local !== "object" || Array.isArray(local)) return base;
    return Object.assign({}, base, local, {
      history: Array.isArray(local.history) && local.history.length ? local.history : (base.history || [])
    });
  }

  function currentContext() {
    const bookSelect = document.getElementById("editBook");
    const chapterSelect = document.getElementById("editChapter");
    if (!bookSelect || !chapterSelect) return null;
    const book = Number(bookSelect.value);
    const chapter = Number(chapterSelect.value);
    if (!Number.isInteger(book) || !Number.isInteger(chapter) || !window.BOOKS && typeof BOOKS === "undefined") return null;
    return { book: book, chapter: chapter };
  }

  function sourceVerses(book, chapter) {
    try {
      if (book === 0 && typeof GENESIS_TEXT !== "undefined") return GENESIS_TEXT[chapter] || [];
    } catch (_) {}
    if (book === 1 && window.EXODUS_TEXT) return window.EXODUS_TEXT[chapter] || [];
    return [];
  }

  function currentVerses(context) {
    const field = document.getElementById("chapterVerses");
    const lines = field ? field.value.split(/\r?\n/).map(function (line) { return line.trim(); }).filter(Boolean) : [];
    return lines.length ? lines : sourceVerses(context.book, context.chapter);
  }

  function renderHistory(history) {
    if (!history || !history.length) return "<p class=\"review-empty-history\">Ainda não há movimentações registradas.</p>";
    return "<ol class=\"review-history\">" + history.slice().reverse().map(function (event) {
      return "<li><strong>" + escapeHtml(STATUS[event.to] || event.to || "Estado inicial") + "</strong> · " +
        escapeHtml(event.at || "Data não registrada") +
        (event.source ? "<div><b>Fonte:</b> " + escapeHtml(event.source) + "</div>" : "") +
        (event.observation ? "<div><b>Observação:</b> " + escapeHtml(event.observation) + "</div>" : "") +
        (event.reason ? "<div><b>Motivo:</b> " + escapeHtml(event.reason) + "</div>" : "") +
        "</li>";
    }).join("") + "</ol>";
  }

  function render(message) {
    if (!panel) return;
    const context = currentContext();
    if (!context) return;
    const verses = currentVerses(context);
    const prefix = context.book + "-" + context.chapter + "-";
    const overrides = readOverrides();
    const allKeys = new Set(Object.keys(BASE).concat(Object.keys(overrides)));
    const orphaned = Array.from(allKeys).filter(function (key) {
      if (key.indexOf(prefix) !== 0) return false;
      const verseNumber = Number(key.slice(prefix.length));
      return Number.isInteger(verseNumber) && verseNumber > verses.length;
    });
    const counts = { pendente: 0, em_revisao: 0, revisado: 0, reaberto: 0 };
    const rows = verses.map(function (_, index) {
      const verse = index + 1;
      const key = prefix + verse;
      const record = getRecord(key);
      const status = STATUS[record.status] ? record.status : "pendente";
      counts[status] += 1;
      const choices = TRANSITIONS[status] || TRANSITIONS.pendente;
      const options = choices.map(function (choice) {
        return "<option value=\"" + choice + "\"" + (choice === status ? " selected" : "") + ">" + STATUS[choice] + "</option>";
      }).join("");
      const history = Array.isArray(record.history) ? record.history : [];
      return "<article class=\"review-verse\" data-review-row=\"" + key + "\">" +
        "<div class=\"review-verse-heading\"><strong>Versículo " + verse + "</strong>" +
        "<span class=\"review-state review-state-" + status + "\">" + STATUS[status] + "</span></div>" +
        "<label class=\"review-select-label\">Estado" +
        "<select data-review-target=\"" + key + "\">" + options + "</select></label>" +
        "<details class=\"review-details\"><summary>Fontes, observações e histórico (" + history.length + ")</summary>" +
        "<div class=\"review-fields\">" +
        "<label>Fonte ou referência consultada<input type=\"text\" maxlength=\"500\" data-review-source value=\"" + escapeHtml(record.source || "") + "\" placeholder=\"Ex.: Texto Massorético, Sefaria, léxico...\"></label>" +
        "<label>Observação da conferência<textarea rows=\"2\" maxlength=\"1500\" data-review-observation placeholder=\"O que foi conferido neste versículo?\">" + escapeHtml(record.observation || "") + "</textarea></label>" +
        "<label>Motivo concreto da reabertura<textarea rows=\"2\" maxlength=\"1000\" data-review-reason placeholder=\"Obrigatório somente ao reabrir um trecho revisado.\">" + escapeHtml(record.reopenReason || "") + "</textarea></label>" +
        "<button type=\"button\" class=\"review-apply\" data-review-apply=\"" + key + "\">Registrar mudança</button>" +
        "<p class=\"review-message\" data-review-message aria-live=\"polite\"></p>" +
        renderHistory(history) +
        "</div></details></article>";
    }).join("");

    const total = verses.length;
    panel.innerHTML =
      "<div class=\"review-panel-heading\"><div><h3 id=\"editorialReviewTitle\">Controle editorial por versículo</h3>" +
      "<p>Os estados aprovados permanecem aprovados. Reabertura exige motivo concreto e fonte relevante.</p></div>" +
      "<span class=\"review-total\">" + total + " versículo(s)</span></div>" +
      "<div class=\"review-counts\" aria-label=\"Resumo dos estados\">" +
      "<span class=\"review-state review-state-pendente\">Pendente: " + counts.pendente + "</span>" +
      "<span class=\"review-state review-state-em_revisao\">Em revisão: " + counts.em_revisao + "</span>" +
      "<span class=\"review-state review-state-revisado\">Revisado: " + counts.revisado + "</span>" +
      "<span class=\"review-state review-state-reaberto\">Reaberto: " + counts.reaberto + "</span></div>" +
      (message ? "<p class=\"review-global-message\" role=\"status\">" + escapeHtml(message) + "</p>" : "") +
      (orphaned.length ? "<p class=\"review-warning\" role=\"status\">Há " + orphaned.length + " registro(s) de versículos que não aparecem no texto atual. Eles foram preservados e não serão apagados.</p>" : "") +
      "<p class=\"review-migration-note\">Estados iniciais migrados do registro editorial anterior. A migração preserva o histórico e não realiza revisão bíblica automática. As alterações deste navegador devem ser exportadas e versionadas no repositório para sincronização entre dispositivos.</p>" +
      (total ? "<div class=\"review-verse-list\">" + rows + "</div>" : "<p class=\"review-empty\">Este capítulo ainda não possui versículos no editor. Nenhum registro anterior será removido.</p>");
  }

  function applyChange(button) {
    const key = button.getAttribute("data-review-apply");
    const row = button.closest("[data-review-row]");
    if (!key || !row) return;
    const target = row.querySelector("[data-review-target]").value;
    const current = getRecord(key);
    const from = current.status || "pendente";
    const source = row.querySelector("[data-review-source]").value.trim();
    const observation = row.querySelector("[data-review-observation]").value.trim();
    const reason = row.querySelector("[data-review-reason]").value.trim();
    const message = row.querySelector("[data-review-message]");

    if (!(TRANSITIONS[from] || []).includes(target)) {
      message.textContent = "Transição não permitida. Um trecho revisado só pode mudar para Reaberto.";
      return;
    }
    if (target === from) {
      message.textContent = "Nenhuma mudança de estado foi solicitada.";
      return;
    }
    if (target === "revisado" && (!source || !observation)) {
      message.textContent = "Para aprovar, informe a fonte consultada e o que foi efetivamente conferido.";
      return;
    }
    if (target === "reaberto" && (!source || !reason)) {
      message.textContent = "Para reabrir, informe uma fonte relevante e o motivo concreto da reabertura.";
      return;
    }

    const at = new Date().toISOString();
    const history = Array.isArray(current.history) ? current.history.slice() : [];
    history.push({
      from: from,
      to: target,
      at: at,
      source: source,
      observation: observation,
      reason: target === "reaberto" ? reason : ""
    });
    const next = Object.assign({}, current, {
      status: target,
      updatedAt: at,
      source: source,
      observation: observation,
      reopenReason: target === "reaberto" ? reason : "",
      history: history
    });
    const overrides = readOverrides();
    overrides[key] = next;
    let result;
    try {
      if (typeof saveLocalData === "function") result = saveLocalData(STORAGE_KEY, JSON.stringify(overrides));
      else {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
        result = { saved: true, backedUp: false };
      }
    } catch (error) {
      result = { saved: false, backedUp: false };
      if (typeof recordAppError === "function") recordAppError(error, "Gravação do estado editorial " + key);
    }
    if (!result || !result.saved) {
      message.textContent = "Não foi possível salvar. Os dados anteriores foram preservados.";
      return;
    }
    render(result.backedUp ? "Estado atualizado e incluído no backup automático local." : "Estado salvo, mas o backup automático falhou. Exporte uma cópia manual.");
  }

  if (panel) {
    panel.addEventListener("click", function (event) {
      const button = event.target.closest("[data-review-apply]");
      if (button) applyChange(button);
    });
    const bookSelect = document.getElementById("editBook");
    const chapterSelect = document.getElementById("editChapter");
    const saveChapter = document.getElementById("saveChapter");
    if (bookSelect) bookSelect.addEventListener("change", function () { render(); });
    if (chapterSelect) chapterSelect.addEventListener("change", function () { render(); });
    if (saveChapter) saveChapter.addEventListener("click", function () { render(); });
    window.refreshEditorialReviewPanel = render;
    render();
  }
})();