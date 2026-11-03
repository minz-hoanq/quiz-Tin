/**
 * QUIZ MASTER – Logic ứng dụng
 * Dữ liệu câu hỏi nằm ở js/questions.js (MCQ_QUESTIONS, TF_QUESTIONS).
 */
(() => {
  'use strict';

  /* ======================================================
   * 1. Dữ liệu & kiểm tra tính hợp lệ
   * ==================================================== */
  const MCQ = Array.isArray(window.MCQ_QUESTIONS) ? window.MCQ_QUESTIONS : [];
  const TF  = Array.isArray(window.TF_QUESTIONS)  ? window.TF_QUESTIONS  : [];
  const LETTERS = ['A', 'B', 'C', 'D'];
  const MCQ_BY_ID = new Map(MCQ.map(q => [q.id, q]));
  const TF_BY_ID  = new Map(TF.map(q => [q.id, q]));

  function validateData() {
    const errs = [];
    const seen = (list, label) => {
      const ids = new Set();
      list.forEach(q => {
        if (ids.has(q.id)) errs.push(`${label}: trùng id ${q.id}`);
        ids.add(q.id);
      });
    };
    seen(MCQ, 'Trắc nghiệm'); seen(TF, 'Đúng/Sai');
    MCQ.forEach(q => {
      if (!q.question) errs.push(`Trắc nghiệm câu ${q.id}: thiếu nội dung câu hỏi`);
      LETTERS.forEach(L => { if (!q.options || !q.options[L]) errs.push(`Trắc nghiệm câu ${q.id}: thiếu phương án ${L}`); });
      if (!LETTERS.includes(q.answer)) errs.push(`Trắc nghiệm câu ${q.id}: đáp án "${q.answer}" không hợp lệ`);
    });
    TF.forEach(q => {
      if (!q.question) errs.push(`Đúng/Sai câu ${q.id}: thiếu nội dung câu hỏi`);
      if (!Array.isArray(q.statements) || q.statements.length !== 4) errs.push(`Đúng/Sai câu ${q.id}: cần đúng 4 nhận định`);
      else q.statements.forEach(s => { if (typeof s.answer !== 'boolean') errs.push(`Đúng/Sai câu ${q.id}, ý ${s.id}: answer phải là true/false`); });
    });
    return errs;
  }

  /* ======================================================
   * 2. Lưu trữ tiến độ (LocalStorage)
   * ==================================================== */
  const STORE_KEY = 'quizmaster.progress.v1';
  const defaultState = () => ({ shuffle: false, mcq: null, tf: null });
  let state = defaultState();

  function loadState() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return;
      const s = JSON.parse(raw);
      state = Object.assign(defaultState(), s);
      state.mcq = sanitizeProgress(state.mcq, MCQ_BY_ID, 'answered');
      state.tf  = sanitizeProgress(state.tf,  TF_BY_ID,  'results');
    } catch (e) { state = defaultState(); }
  }
  function saveState() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* bỏ qua nếu bị chặn */ }
  }
  // Đồng bộ tiến độ cũ với bộ câu hỏi hiện tại (khi bạn sửa questions.js)
  function sanitizeProgress(p, byId, doneKey) {
    if (!p || !Array.isArray(p.order)) return null;
    const order = p.order.filter(id => byId.has(id));
    const inOrder = new Set(order);
    byId.forEach((_, id) => { if (!inOrder.has(id)) order.push(id); });
    const done = {};
    Object.keys(p[doneKey] || {}).forEach(k => { const id = Number(k); if (byId.has(id)) done[id] = p[doneKey][k]; });
    return { order, [doneKey]: done };
  }

  /* ======================================================
   * 3. Tiện ích
   * ==================================================== */
  function h(tag, attrs, ...kids) {
    const el = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (v === null || v === undefined || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k.startsWith('on')) el.addEventListener(k.slice(2), v);
      else if (k === 'disabled') el.disabled = true;
      else el.setAttribute(k, v === true ? '' : v);
    });
    kids.flat().forEach(k => { if (k !== null && k !== undefined && k !== false) el.append(k.nodeType ? k : document.createTextNode(k)); });
    return el;
  }

  const ICONS = {
    list:  '<path d="M8 6h13M8 12h13M8 18h13M3.5 6h.01M3.5 12h.01M3.5 18h.01"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    cross: '<path d="M18 6 6 18M6 6l12 12"/>',
    trophy:'<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4Z"/><path d="M17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    chart: '<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>',
  };
  function icon(name, size = 24) {
    const wrap = document.createElement('span');
    wrap.style.display = 'inline-grid';
    wrap.innerHTML = `<svg viewBox="0 0 24 24" width="${size}" height="${size}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[name]}</svg>`;
    return wrap;
  }

  function shuffled(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const pct = (n, total) => (total ? Math.round((n / total) * 100) : 0);

  let toastTimer = null;
  function toast(msg) {
    const el = document.getElementById('toast');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('show'), 3200);
  }

  /* ======================================================
   * 4. Tiến độ từng chế độ
   * ==================================================== */
  const MODES = {
    mcq: { label: 'Trắc nghiệm A/B/C/D', list: MCQ, byId: MCQ_BY_ID, doneKey: 'answered' },
    tf:  { label: 'Trắc nghiệm Đúng/Sai', list: TF,  byId: TF_BY_ID,  doneKey: 'results'  },
  };

  function newProgress(mode) {
    const m = MODES[mode];
    const ids = m.list.map(q => q.id);
    state[mode] = { order: state.shuffle ? shuffled(ids) : ids, [m.doneKey]: {} };
    saveState();
  }
  const doneMap   = mode => (state[mode] ? state[mode][MODES[mode].doneKey] : {});
  const doneCount = mode => Object.keys(doneMap(mode)).length;
  const isComplete = mode => MODES[mode].list.length > 0 && doneCount(mode) >= MODES[mode].list.length;
  function nextQuestionId(mode) {
    const p = state[mode]; if (!p) return null;
    const done = doneMap(mode);
    return p.order.find(id => !(id in done)) ?? null;
  }
  const positionOf = (mode, id) => state[mode].order.indexOf(id) + 1;

  /* ======================================================
   * 5. Điều hướng
   * ==================================================== */
  const app = document.getElementById('app');
  const ui = { view: 'home', mode: null, timer: null, mcq: null, tf: null, lastPct: { mcq: 0, tf: 0 } };

  function clearTimer() { if (ui.timer) { clearTimeout(ui.timer); ui.timer = null; } }

  // soft = true: cập nhật tại chỗ (giữ vị trí cuộn, không chạy lại hiệu ứng)
  function mount(node, soft = false) {
    const y = window.scrollY;
    if (soft) node.classList.remove('view');
    app.replaceChildren(node);
    window.scrollTo({ top: soft ? y : 0 });
  }

  function goHome() { clearTimer(); ui.view = 'home'; renderHome(); }

  function startMode(mode) {
    clearTimer();
    if (!MODES[mode].list.length) return;
    if (!state[mode]) newProgress(mode);
    if (isComplete(mode)) return showSummary(mode);
    openQuestion(mode, nextQuestionId(mode));
  }

  function restartMode(mode, ask = true) {
    if (ask && doneCount(mode) > 0 && !window.confirm(`Làm lại từ đầu phần "${MODES[mode].label}"?\nTiến độ hiện tại của phần này sẽ bị xóa.`)) return;
    clearTimer();
    newProgress(mode);
    ui.lastPct[mode] = 0;
    openQuestion(mode, nextQuestionId(mode));
  }

  function openQuestion(mode, id) {
    clearTimer();
    ui.view = mode; ui.mode = mode;
    if (mode === 'mcq') { ui.mcq = { id, wrong: new Set(), tries: 0, locked: false }; renderMCQ(); }
    else { ui.tf = { id, picks: {}, submitted: false }; renderTF(); }
  }

  function showSummary(mode) {
    clearTimer();
    ui.view = 'summary'; ui.mode = mode;
    renderSummary(mode);
  }

  /* ======================================================
   * 6. Trang chủ
   * ==================================================== */
  function renderHome() {
    const errs = validateData();
    const root = h('section', { class: 'view' });

    root.append(h('div', { class: 'hero' },
      h('h1', { text: 'Chọn chế độ luyện tập' }),
      h('p', { text: 'Làm bài theo từng câu, nhận phản hồi ngay lập tức. Tiến độ được lưu tự động nên bạn có thể tiếp tục bất cứ lúc nào.' })
    ));

    if (errs.length) {
      root.append(h('div', { class: 'notice error', role: 'alert' },
        h('b', { text: 'Dữ liệu câu hỏi có lỗi (js/questions.js):' }),
        h('ul', {}, errs.slice(0, 8).map(e => h('li', { text: e })))
      ));
    }

    const grid = h('div', { class: 'mode-grid' });
    grid.append(
      modeCard('mcq', 'list', 'Trắc nghiệm A/B/C/D', 'Mỗi câu chọn một đáp án. Chọn sai được thử lại cho đến khi đúng thì mới sang câu tiếp theo.'),
      modeCard('tf', 'check', 'Trắc nghiệm Đúng/Sai', 'Mỗi câu lớn có 4 nhận định a, b, c, d. Chọn Đúng hoặc Sai cho cả 4 ý rồi nộp bài để xem kết quả chi tiết.')
    );
    root.append(grid);

    // Cài đặt
    const sw = h('input', { type: 'checkbox', id: 'opt-shuffle' });
    sw.checked = !!state.shuffle;
    sw.addEventListener('change', () => {
      state.shuffle = sw.checked; saveState();
      toast(state.shuffle ? 'Đã bật xáo trộn – áp dụng khi bắt đầu hoặc làm lại bài.' : 'Đã tắt xáo trộn – áp dụng khi bắt đầu hoặc làm lại bài.');
    });
    root.append(h('div', { class: 'glass options-panel' },
      h('label', { class: 'switch', for: 'opt-shuffle' },
        sw, h('span', { class: 'track' }),
        h('span', { class: 'sw-text' }, h('b', { text: 'Xáo trộn thứ tự câu hỏi' }), h('small', { text: 'Áp dụng khi bắt đầu hoặc làm lại từ đầu' }))
      ),
      h('button', { class: 'btn btn-danger-ghost btn-sm', type: 'button', onclick: resetAll }, 'Xóa toàn bộ tiến độ')
    ));

    mount(root);
  }

  function modeCard(mode, iconName, title, desc) {
    const total = MODES[mode].list.length;
    const done = doneCount(mode);
    const started = done > 0;
    const complete = isComplete(mode);
    const label = complete ? 'Xem tổng kết' : started ? 'Tiếp tục làm bài' : 'Bắt đầu làm bài';

    const status = h('p', { class: 'mode-status' },
      started ? `Đã hoàn thành ${done}/${total} câu (${pct(done, total)}%)` : 'Chưa bắt đầu');
    const bar = h('div', { class: 'progress', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': pct(done, total), 'aria-label': 'Tiến độ ' + title },
      h('div', { class: 'progress-fill', style: `width:${pct(done, total)}%` }));

    const actions = h('div', { class: 'mode-actions' },
      h('button', { class: 'btn btn-primary', type: 'button', disabled: total === 0, onclick: () => startMode(mode) }, label)
    );
    if (started) {
      if (!complete) actions.append(h('button', { class: 'btn btn-ghost', type: 'button', onclick: () => showSummary(mode) }, 'Tổng kết'));
      actions.append(h('button', { class: 'btn btn-ghost', type: 'button', onclick: () => restartMode(mode) }, 'Làm lại'));
    }

    return h('article', { class: 'glass mode-card' },
      h('div', { class: 'mode-icon' }, icon(iconName, 28)),
      h('h2', { text: title }),
      h('p', { class: 'desc', text: desc }),
      h('div', { class: 'mode-count' }, h('b', { text: String(total) }), h('span', { text: 'câu hỏi' })),
      bar, status, actions
    );
  }

  function resetAll() {
    if (!window.confirm('Xóa toàn bộ tiến độ của cả hai chế độ?')) return;
    state.mcq = null; state.tf = null; ui.lastPct = { mcq: 0, tf: 0 };
    saveState(); renderHome(); toast('Đã xóa toàn bộ tiến độ.');
  }

  /* ======================================================
   * 7. Thanh trên cùng của khu vực làm bài
   * ==================================================== */
  function quizTop(mode, qid) {
    const total = MODES[mode].list.length;
    const done = doneCount(mode);
    const from = ui.lastPct[mode] || 0, to = pct(done, total);
    const fill = h('div', { class: 'progress-fill', id: 'pfill', style: `width:${from}%` });
    if (from !== to) requestAnimationFrame(() => requestAnimationFrame(() => { fill.style.width = to + '%'; }));
    ui.lastPct[mode] = to;

    return h('div', { class: 'glass quiz-top' },
      h('div', { class: 'quiz-top-row' },
        h('div', { class: 'q-badge' },
          h('span', { text: `Câu ${positionOf(mode, qid)}/${total}` }),
          h('span', { class: 'mode-pill', text: mode === 'mcq' ? 'A/B/C/D' : 'Đúng/Sai' })
        ),
        h('div', { class: 'q-meta' }, 'Đã hoàn thành ', h('b', { id: 'done-count', text: `${done}/${total}` }), ' · ', h('b', { id: 'done-pct', text: `${to}%` }))
      ),
      h('div', { class: 'progress', role: 'progressbar', 'aria-valuemin': 0, 'aria-valuemax': 100, 'aria-valuenow': to, 'aria-label': 'Tiến độ hoàn thành' }, fill)
    );
  }

  function updateTopInPlace(mode) {
    const total = MODES[mode].list.length, done = doneCount(mode), p = pct(done, total);
    const f = document.getElementById('pfill'); if (f) f.style.width = p + '%';
    const c = document.getElementById('done-count'); if (c) c.textContent = `${done}/${total}`;
    const d = document.getElementById('done-pct'); if (d) d.textContent = p + '%';
    const pb = app.querySelector('.quiz-top .progress'); if (pb) pb.setAttribute('aria-valuenow', p);
    ui.lastPct[mode] = p;
  }

  /* ======================================================
   * 8. Chế độ 1 – Trắc nghiệm A/B/C/D
   * ==================================================== */
  function renderMCQ() {
    const q = MCQ_BY_ID.get(ui.mcq.id);
    const root = h('section', { class: 'view' });
    root.append(quizTop('mcq', q.id));

    const list = h('div', { class: 'option-list', role: 'group', 'aria-label': 'Các phương án' });
    LETTERS.forEach(L => {
      list.append(h('button', {
        class: 'option', type: 'button', 'data-letter': L,
        onclick: () => pickMCQ(L)
      }, h('span', { class: 'letter', text: L }), h('span', { class: 'text', text: q.options[L] })));
    });

    root.append(h('div', { class: 'glass q-card' },
      h('h2', { class: 'q-title', text: `Câu ${q.id}. ${q.question}` }),
      list,
      h('div', { class: 'feedback', id: 'feedback', role: 'status', 'aria-live': 'polite' })
    ));

    root.append(h('div', { class: 'quiz-foot' },
      h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: goHome }, '← Trang chủ'),
      h('span', { class: 'hint-text', text: 'Mẹo: nhấn phím A, B, C, D để chọn nhanh.' })
    ));
    mount(root);
  }

  function pickMCQ(letter) {
    const s = ui.mcq;
    if (!s || s.locked || s.wrong.has(letter)) return;
    const q = MCQ_BY_ID.get(s.id);
    const btn = app.querySelector(`.option[data-letter="${letter}"]`);
    const fb = document.getElementById('feedback');
    s.tries++;

    if (letter === q.answer) {
      s.locked = true;
      state.mcq.answered[q.id] = s.tries;
      saveState();
      btn.classList.add('is-correct');
      app.querySelectorAll('.option').forEach(b => { b.disabled = true; });
      fb.replaceChildren(h('div', { class: 'msg ok' }, icon('check', 20), 'Chính xác!'));
      updateTopInPlace('mcq');
      ui.timer = setTimeout(() => {
        ui.timer = null;
        if (isComplete('mcq')) { showSummary('mcq'); toast('Chúc mừng! Bạn đã hoàn thành toàn bộ phần trắc nghiệm A/B/C/D.'); }
        else openQuestion('mcq', nextQuestionId('mcq'));
      }, 1000);
    } else {
      // Sai: không tiết lộ đáp án đúng, không chuyển câu
      s.wrong.add(letter);
      btn.classList.remove('is-wrong'); void btn.offsetWidth; // restart animation
      btn.classList.add('is-wrong');
      btn.setAttribute('aria-disabled', 'true');
      fb.replaceChildren(h('div', { class: 'msg bad' }, icon('cross', 20), 'Chưa chính xác, hãy thử lại!'));
    }
  }

  /* ======================================================
   * 9. Chế độ 2 – Đúng / Sai
   * ==================================================== */
  function renderTF(soft = false) {
    const s = ui.tf;
    const q = TF_BY_ID.get(s.id);
    const root = h('section', { class: 'view' });
    root.append(quizTop('tf', q.id));

    const card = h('div', { class: 'glass q-card' },
      h('h2', { class: 'q-title', text: `Câu ${q.id}. ${q.question}` }),
      q.note ? h('p', { class: 'q-note', text: q.note }) : null
    );

    if (!s.submitted) {
      const list = h('div', { class: 'tf-list' });
      q.statements.forEach(st => {
        const row = h('div', { class: 'tf-row' + (st.id in s.picks ? ' answered' : ''), 'data-st': st.id });
        const mk = (val, label) => h('button', {
          type: 'button', role: 'radio', 'aria-checked': String(s.picks[st.id] === val),
          onclick: () => { s.picks[st.id] = val; renderTF(true); const b = app.querySelector(`.tf-row[data-st="${st.id}"] button[aria-checked="true"]`); if (b) b.focus({ preventScroll: true }); }
        }, label);
        row.append(
          h('span', { class: 'letter', text: st.id }),
          h('span', { class: 'text', text: st.text }),
          h('div', { class: 'seg', role: 'radiogroup', 'aria-label': `Nhận định ${st.id}` }, mk(true, 'Đúng'), mk(false, 'Sai'))
        );
        list.append(row);
      });
      card.append(list);

      const picked = q.statements.filter(st => st.id in s.picks).length;
      const submit = h('button', { class: 'btn btn-primary', type: 'button', disabled: picked < q.statements.length, onclick: submitTF }, 'Nộp bài');
      card.append(h('div', { class: 'tf-actions' },
        h('span', { class: 'hint-text', text: picked < q.statements.length ? `Đã chọn ${picked}/${q.statements.length} nhận định – cần chọn đủ trước khi nộp.` : 'Đã chọn đủ 4 nhận định.' }),
        submit
      ));
    } else {
      card.append(resultBlock(q, s.picks));
      const last = isComplete('tf');
      card.append(h('div', { class: 'tf-actions' },
        h('button', { class: 'btn btn-ghost', type: 'button', onclick: () => { s.picks = {}; s.submitted = false; renderTF(); } }, 'Làm lại câu này'),
        h('button', { class: 'btn btn-primary', type: 'button', onclick: nextTF }, last ? 'Xem tổng kết' : 'Câu tiếp theo →')
      ));
    }

    root.append(card);
    root.append(h('div', { class: 'quiz-foot' }, h('button', { class: 'btn btn-ghost btn-sm', type: 'button', onclick: goHome }, '← Trang chủ')));
    mount(root, soft);
  }

  function submitTF() {
    const s = ui.tf, q = TF_BY_ID.get(s.id);
    if (!q.statements.every(st => st.id in s.picks)) return; // phải chọn đủ 4 ý
    const correct = q.statements.filter(st => s.picks[st.id] === st.answer).length;
    state.tf.results[q.id] = { picks: Object.assign({}, s.picks), correct };
    saveState();
    s.submitted = true;
    renderTF();
  }

  function nextTF() {
    if (isComplete('tf')) { showSummary('tf'); toast('Chúc mừng! Bạn đã hoàn thành toàn bộ phần Đúng/Sai.'); return; }
    openQuestion('tf', nextQuestionId('tf'));
  }

  const tv = v => (v ? 'Đúng' : 'Sai');

  function resultBlock(q, picks) {
    const correct = q.statements.filter(st => picks[st.id] === st.answer).length;
    const n = q.statements.length;
    const banner = h('div', { class: 'score-banner' + (correct === n ? ' perfect' : ''), role: 'status' },
      h('span', { class: 'big', text: `${correct}/${n}` }),
      h('span', {}, h('b', { text: 'ý đúng' }), correct === n ? ' – Tuyệt vời, bạn trả lời đúng cả 4 ý!' : ` – còn ${n - correct} ý chưa chính xác.`)
    );

    const rows = q.statements.map(st => {
      const ok = picks[st.id] === st.answer;
      return h('tr', { class: ok ? 'ok' : 'bad' },
        h('td', { class: 'st-td', 'data-label': 'Nhận định' }, h('div', { class: 'st-cell' }, h('span', { class: 'letter', text: st.id }), h('span', { class: 't', text: st.text }))),
        h('td', { 'data-label': 'Lựa chọn của tôi' }, h('span', { class: 'tag choice', text: tv(picks[st.id]) })),
        h('td', { 'data-label': 'Đáp án chính xác' }, h('span', { class: 'tag truth', text: tv(st.answer) })),
        h('td', { 'data-label': 'Kết quả' }, h('span', { class: 'tag ' + (ok ? 'ok' : 'bad') }, icon(ok ? 'check' : 'cross', 14), ok ? 'Chính xác' : 'Sai'))
      );
    });

    const table = h('table', { class: 'result' },
      h('thead', {}, h('tr', {}, ['Nhận định', 'Lựa chọn của tôi', 'Đáp án chính xác', 'Kết quả'].map(t => h('th', { scope: 'col', text: t })))),
      h('tbody', {}, rows)
    );
    return h('div', {}, banner, h('div', { class: 'result-wrap' }, table));
  }

  /* ======================================================
   * 10. Trang tổng kết
   * ==================================================== */
  function renderSummary(mode) {
    const m = MODES[mode];
    const total = m.list.length, done = doneCount(mode);
    const complete = isComplete(mode);
    const root = h('section', { class: 'view' });
    const stats = h('div', { class: 'stat-grid' });
    const stat = (k, v, sub, good) => h('div', { class: 'stat' + (good ? ' good' : '') }, h('div', { class: 'k', text: k }), h('div', { class: 'v' }, v, sub ? h('small', { text: ' ' + sub }) : null));

    stats.append(stat('Tổng số câu đã hoàn thành', String(done), `/ ${total}`));
    const chips = h('div', { class: 'chip-grid' });
    let legend;

    if (mode === 'mcq') {
      const ans = doneMap('mcq');
      const first = Object.values(ans).filter(t => t === 1).length;
      stats.append(
        stat('Tổng số câu trả lời đúng', String(done), `/ ${total}`, true),
        stat('Đúng ngay lần đầu', String(first), `/ ${total}`)
      );
      state.mcq.order.forEach(id => {
        const t = ans[id];
        chips.append(h('span', { class: 'chip ' + (t === 1 ? 'ok' : t ? 'mid' : ''), title: t ? `Thử ${t} lần` : 'Chưa làm', text: `Câu ${id}` }));
      });
      legend = ['ok', 'Đúng ngay lần đầu', 'mid', 'Đúng sau nhiều lần thử', '', 'Chưa làm'];
    } else {
      const res = doneMap('tf');
      const perfect = Object.values(res).filter(r => r.correct === 4).length;
      const stmts = Object.values(res).reduce((a, r) => a + r.correct, 0);
      stats.append(
        stat('Tổng số câu đúng hoàn toàn (4/4)', String(perfect), `/ ${total}`, true),
        stat('Tổng số ý đúng', String(stmts), `/ ${total * 4}`, true)
      );
      state.tf.order.forEach(id => {
        const r = res[id];
        chips.append(h('span', { class: 'chip ' + (!r ? '' : r.correct === 4 ? 'ok' : r.correct >= 2 ? 'mid' : 'bad'), title: r ? `${r.correct}/4 ý đúng` : 'Chưa làm', text: `Câu ${id}: ${r ? r.correct + '/4' : '–'}` }));
      });
      legend = ['ok', 'Đúng cả 4 ý', 'mid', '2–3 ý đúng', 'bad', '0–1 ý đúng'];
    }
    stats.append(stat('Tỷ lệ hoàn thành', pct(done, total) + '%'));

    root.append(h('div', { class: 'glass sum-card' },
      h('div', { class: 'sum-head' + (complete ? ' done' : '') },
        h('div', { class: 'ring' }, icon(complete ? 'trophy' : 'chart', 30)),
        h('div', {},
          h('h2', { text: complete ? 'Chúc mừng! Bạn đã hoàn thành toàn bộ bài tập' : 'Tổng kết tiến độ' }),
          h('p', { text: m.label })
        )
      ),
      stats,
      h('h3', { class: 'sum-sub', text: 'Chi tiết từng câu' }),
      chips,
      h('div', { class: 'legend' }, [0, 2, 4].map(i => h('span', {}, h('i', { style: `background:${legendColor(legend[i])}` }), legend[i + 1]))),
      h('div', { class: 'sum-actions' },
        !complete ? h('button', { class: 'btn btn-primary', type: 'button', onclick: () => startMode(mode) }, 'Tiếp tục làm bài') : null,
        h('button', { class: complete ? 'btn btn-primary' : 'btn btn-ghost', type: 'button', onclick: () => restartMode(mode, !complete ? true : false) }, 'Làm lại từ đầu'),
        h('button', { class: 'btn btn-ghost', type: 'button', onclick: goHome }, 'Quay về trang chủ')
      )
    ));
    mount(root);
  }

  function legendColor(k) {
    return { ok: 'var(--green-bd)', mid: '#fcd34d', bad: 'var(--red-bd)', '': 'var(--line)' }[k];
  }

  /* ======================================================
   * 11. Khởi tạo
   * ==================================================== */
  document.getElementById('total-count').textContent = String(MCQ.length + TF.length);
  document.getElementById('brand-link').addEventListener('click', e => { e.preventDefault(); goHome(); });

  document.addEventListener('keydown', e => {
    if (ui.view !== 'mcq' || e.ctrlKey || e.metaKey || e.altKey) return;
    const L = e.key.toUpperCase();
    if (LETTERS.includes(L) && e.key.length === 1) pickMCQ(L);
  });

  loadState();
  renderHome();
})();
