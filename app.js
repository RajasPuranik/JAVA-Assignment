/* ============================================
   Java Lab PDF Personalizer – app.js
   Complete client-side application
   ============================================ */

(function () {
  'use strict';

  /* ---------- State ---------- */
  const state = {
    name: '',
    user: '',
    folder: '',
    selectedLayout: 'vscode', // default selection
    currentStep: 1,
    isGenerating: false,
    generatedBlob: null,
    generatedFileName: '',
    isDarkTheme: true
  };

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- DOM refs ---------- */
  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const els = {
    nameInput:    $('#nameInput'),
    nameHint:     $('#nameHint'),
    charCount:    $('#charCount'),
    inputGroup:   null,
    layoutGrid:   $('#layoutGrid'),
    generateBtn:  $('#generateBtn'),
    btnText:      null,
    btnStatus:    null,
    btnProgressFill: null,
    terminalAnim: $('#terminalAnim'),
    terminalAnimContent: $('#terminalAnimContent'),
    successSection: $('#successSection'),
    successFile:  $('#successFile'),
    successSize:  $('#successSize'),
    errorSection: $('#errorSection'),
    errorMessage: $('#errorMessage'),
    themeToggle:  $('#themeToggle'),
    confetti:     $('#confettiCanvas'),
    announcer:    $('#statusAnnouncer'),
    progressSteps: null,
    progressLines: null
  };

  /* ---------- Validation ---------- */
  const NAME_REGEX = /^[a-zA-Z0-9 _-]{1,30}$/;

  function validateName(value) {
    const trimmed = value.trim();
    if (!trimmed) return { valid: false, hint: '' };
    if (trimmed.length > 30) return { valid: false, hint: 'Maximum 30 characters' };
    if (!NAME_REGEX.test(trimmed)) return { valid: false, hint: 'Only letters, numbers, spaces, hyphens, underscores' };
    return { valid: true, hint: '' };
  }

  /* ---------- Placeholder replacement ---------- */
  function replacePlaceholders(text) {
    if (!text) return '';
    return text
      .replace(/\{\{NAME\}\}/g, state.name || 'Student')
      .replace(/\{\{USER\}\}/g, state.user || 'student')
      .replace(/\{\{FOLDER\}\}/g, state.folder || 'JavaLab');
  }

  function hexToRgb(hex) {
    if (!hex) return [0, 0, 0];
    let clean = hex.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map(c => c + c).join('');
    }
    const r = parseInt(clean.substring(0, 2), 16) || 0;
    const g = parseInt(clean.substring(2, 4), 16) || 0;
    const b = parseInt(clean.substring(4, 6), 16) || 0;
    return [r, g, b];
  }

  /* ---------- Progress bar ---------- */
  function updateProgress() {
    const { valid } = validateName(state.name);
    const hasLayout = !!state.selectedLayout;

    const steps = els.progressSteps;
    const lines = els.progressLines;
    if (!steps || !steps.length) return;

    // Step 1: Name
    steps[0].classList.add('active');
    steps[0].classList.toggle('completed', valid);

    // Step 2: Layout
    steps[1].classList.toggle('active', valid);
    steps[1].classList.toggle('completed', valid && hasLayout);
    if (lines[0]) lines[0].classList.toggle('filled', valid);

    // Step 3: Download
    steps[2].classList.toggle('active', valid && hasLayout);
    if (lines[1]) lines[1].classList.toggle('filled', valid && hasLayout);
  }

  /* ---------- Update Generate Button ---------- */
  function updateGenerateBtn() {
    const { valid } = validateName(state.name);
    const ready = valid && !!state.selectedLayout && !state.isGenerating;
    els.generateBtn.disabled = !ready;
  }

  /* ---------- Update mini terminal previews ---------- */
  function updateTerminalPreviews() {
    const name   = state.name || 'Rahul';
    const user   = state.user || 'rahul';
    const folder = state.folder || 'Rahul';

    const layouts = window.LAB_DATA.layouts;

    document.querySelectorAll('.layout-card').forEach(card => {
      const key = card.dataset.layout;
      const layout = layouts[key];
      if (!layout) return;

      const prompt = layout.promptTemplate
        .replace(/\{\{NAME\}\}/g, name)
        .replace(/\{\{USER\}\}/g, user)
        .replace(/\{\{FOLDER\}\}/g, folder);

      const promptEl = card.querySelector('.terminal-prompt');
      if (promptEl) promptEl.textContent = prompt;

      const titleEl = card.querySelector('.titlebar-text');
      if (titleEl) {
        titleEl.textContent = layout.titleBar
          .replace(/\{\{NAME\}\}/g, name)
          .replace(/\{\{USER\}\}/g, user)
          .replace(/\{\{FOLDER\}\}/g, folder);
      }
    });
  }

  /* ---------- Name Input Handler ---------- */
  function handleNameInput() {
    const raw = els.nameInput.value;
    state.name = raw.trim();
    state.user = state.name.toLowerCase().replace(/\s+/g, '');
    state.folder = state.name.replace(/\s+/g, '_');

    // Character counter
    els.charCount.textContent = `${raw.length}/30`;
    els.charCount.classList.toggle('warning', raw.length > 30 || raw.length === 0);

    // Validation
    const { valid, hint } = validateName(raw);
    els.nameHint.textContent = hint;

    // Input classes
    els.nameInput.classList.remove('valid', 'invalid');
    els.inputGroup.classList.remove('valid');

    if (raw.trim().length > 0) {
      if (valid) {
        els.nameInput.classList.add('valid');
        els.inputGroup.classList.add('valid');
      } else {
        els.nameInput.classList.add('invalid');
        setTimeout(() => els.nameInput.classList.remove('invalid'), 300);
      }
    }

    updateTerminalPreviews();
    updateProgress();
    updateGenerateBtn();

    if (valid) {
      announce('Name is valid');
    } else if (hint) {
      announce('Name error: ' + hint);
    }
  }

  /* ---------- Render layout cards ---------- */
  function renderLayoutCards() {
    const layouts = window.LAB_DATA.layouts;
    const grid = els.layoutGrid;
    grid.innerHTML = '';

    // The 4 primary layouts matching the user's attached PDFs
    const primaryKeys = ['vscode', 'mac', 'cmd', 'codechef'];

    primaryKeys.forEach(key => {
      const layout = layouts[key];
      if (!layout) return;

      const card = document.createElement('div');
      card.className = 'layout-card' + (key === state.selectedLayout ? ' selected' : '');
      card.setAttribute('role', 'radio');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-checked', key === state.selectedLayout ? 'true' : 'false');
      card.setAttribute('aria-label', layout.name);
      card.dataset.layout = key;

      const style = layout.terminalStyle;
      const borderStyle = style.borderColor ? `border: 1px solid ${style.borderColor};` : '';

      // Build title bar content
      let titleBarInner = '';
      if (key === 'mac') {
        titleBarInner = `
          <div class="titlebar-dots">
            <span class="titlebar-dot red"></span>
            <span class="titlebar-dot yellow"></span>
            <span class="titlebar-dot green"></span>
          </div>
          <span class="titlebar-text">${layout.titleBar.replace(/\{\{NAME\}\}/g, 'Rahul')}</span>`;
      } else if (key === 'cmd') {
        titleBarInner = `
          <span style="font-size:0.6rem;font-weight:700;margin-right:4px;">c:</span>
          <span class="titlebar-text">Command Prompt</span>
          <span style="font-size:0.6rem;color:#888;letter-spacing:3px;">_ □ x</span>`;
      } else if (key === 'codechef') {
        titleBarInner = `<span class="titlebar-text" style="font-weight:600;">Status : Successfully executed</span>`;
      } else {
        // VS Code
        titleBarInner = `
          <span style="color:#fff;text-decoration:underline;margin-right:8px;">TERMINAL</span>
          <span class="titlebar-text" style="color:#777;font-size:0.5rem;">powershell + v ^ x</span>`;
      }

      const defaultPrompt = layout.promptTemplate
        .replace(/\{\{NAME\}\}/g, 'Rahul')
        .replace(/\{\{USER\}\}/g, 'rahul')
        .replace(/\{\{FOLDER\}\}/g, 'Rahul');

      card.innerHTML = `
        <div class="layout-card-badge">
          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <div class="layout-card-header">
          <span class="layout-icon">${layout.icon || '💻'}</span>
          <span class="layout-name">${layout.displayName || layout.name}</span>
        </div>
        <div class="mini-terminal" style="background:${style.bg};${borderStyle}">
          <div class="mini-terminal-titlebar" style="background:${style.titleBarBg};color:${style.titleBarFg}">
            ${titleBarInner}
          </div>
          <div class="mini-terminal-body" style="color:${style.fg}">
            <span class="terminal-prompt" style="color:${style.promptColor}">${defaultPrompt}</span><span class="terminal-cursor"></span>
          </div>
        </div>`;

      // Click handler
      card.addEventListener('click', () => selectLayout(key));

      // Keyboard handler
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectLayout(key);
        }
        // Arrow navigation
        const cards = Array.from(grid.querySelectorAll('.layout-card'));
        const idx = cards.indexOf(card);
        let next = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          next = (idx + 1) % cards.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          next = (idx - 1 + cards.length) % cards.length;
        }
        if (next >= 0) {
          e.preventDefault();
          cards[next].focus();
        }
      });

      // 3D tilt effect
      if (!reducedMotion) {
        card.addEventListener('mousemove', (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          const rotateX = -(y / rect.height) * 4;
          const rotateY = (x / rect.width) * 4;
          card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform = '';
        });
      }

      grid.appendChild(card);
    });
  }

  /* ---------- Select layout ---------- */
  function selectLayout(key) {
    state.selectedLayout = key;

    document.querySelectorAll('.layout-card').forEach(card => {
      const isSelected = card.dataset.layout === key;
      card.classList.toggle('selected', isSelected);
      card.classList.toggle('dimmed', !isSelected);
      card.setAttribute('aria-checked', String(isSelected));
    });

    updateProgress();
    updateGenerateBtn();
    const lName = window.LAB_DATA.layouts[key] ? window.LAB_DATA.layouts[key].name : key;
    announce(`Layout selected: ${lName}`);
  }

  /* ---------- Status announcer (a11y) ---------- */
  function announce(msg) {
    if (els.announcer) els.announcer.textContent = msg;
  }

  /* ---------- Update generation status ---------- */
  function updateGenerationStatus(message, percent) {
    if (els.btnStatus) els.btnStatus.textContent = message;
    if (els.btnProgressFill) els.btnProgressFill.style.width = Math.min(100, Math.max(0, percent)) + '%';
  }

  /* ---------- Terminal animation during generation ---------- */
  async function runTerminalAnimation() {
    const content = els.terminalAnimContent;
    content.innerHTML = '';
    els.terminalAnim.classList.add('visible');

    const lines = [
      '$ javac Codechef.java',
      '$ java Codechef',
      `Hello, ${state.name || 'Student'}!`,
      'Compiling 36 Java lab exercises...',
      'Personalizing terminal layouts...',
      'Generating PDF pages...'
    ];

    for (let i = 0; i < lines.length; i++) {
      if (!state.isGenerating) break;
      const div = document.createElement('div');
      div.className = 'line';
      div.textContent = lines[i];
      div.style.animationDelay = `${i * 0.3}s`;
      content.appendChild(div);
      await sleep(reducedMotion ? 30 : 350);
    }
  }

  function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
  }

  /* ---------- PDF GENERATION (matches attached PDFs) ---------- */
  async function generatePDF() {
    const { jsPDF } = window.jspdf;
    // A4 portrait: 210mm x 297mm
    const doc = new jsPDF({ unit: 'mm', format: 'a4', compress: true });

    const layout = window.LAB_DATA.layouts[state.selectedLayout] || window.LAB_DATA.layouts.vscode;
    const questions = window.LAB_DATA.questions;
    const totalQuestions = questions.length;

    const pageWidth = 210;
    const pageHeight = 297;
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin; // 170mm

    let currentPage = 1;

    for (let i = 0; i < totalQuestions; i++) {
      const q = questions[i];

      if (currentPage > 1) {
        doc.addPage();
      }

      // Status update
      const pct = 10 + Math.floor((80 * i) / totalQuestions);
      updateGenerationStatus(`Building exercise ${i + 1} of ${totalQuestions} (page ${currentPage})...`, pct);

      let y = 28; // Start top margin for question

      // ---- 1. Question Heading ----
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(13);
      doc.setTextColor(30, 42, 68); // Dark navy/blue matching PDF
      const qTitle = `Question ${q.id}: ${q.question}`;
      const titleLines = doc.splitTextToSize(qTitle, contentWidth);
      doc.text(titleLines, margin, y);
      y += titleLines.length * 5.8 + 6;

      // ---- 2. Java Code (Clean text on page, NO gray background, exactly like original PDF!) ----
      doc.setFont('courier', 'normal');
      doc.setFontSize(8.5);
      doc.setTextColor(20, 20, 20);

      const codeLines = q.code.split('\n');
      const codeLineHeight = 4.0;

      for (const line of codeLines) {
        doc.text(line || ' ', margin, y);
        y += codeLineHeight;
      }

      // Check if this question forces terminal to the next page (Q24, Q27, Q30)
      if (q.forceNewPageForTerminal) {
        doc.addPage();
        currentPage++;
        y = 35; // Top of next page
      } else {
        y += 8; // Small spacing before terminal
      }

      // ---- 3. Terminal Output Box ----
      drawTerminalBox(doc, q, layout, margin, y, contentWidth, pageHeight);
      currentPage++;

      // Yield for smooth browser animation
      if (i % 3 === 0) {
        await new Promise(r => requestAnimationFrame(() => setTimeout(r, 20)));
      }
    }

    return doc;
  }

  /* ---------- Draw Terminal Box (pixel-perfect per layout) ---------- */
  function drawTerminalBox(doc, question, layout, margin, startY, contentWidth, pageHeight) {
    const key = state.selectedLayout;
    let y = startY;

    // Pick appropriate compile/run command
    let compileCmd = question.isPackageQuestion ? layout.packageCompileCmd : layout.compileCmd;
    let runCmd = question.isPackageQuestion ? layout.packageRunCmd : layout.runCmd;

    compileCmd = replacePlaceholders(compileCmd);
    runCmd = replacePlaceholders(runCmd);
    const titleText = replacePlaceholders(layout.titleBar);

    // ==========================================
    // LAYOUT: CodeChef Online Compiler (PDF 1)
    // ==========================================
    if (key === 'codechef') {
      const topBarHeight = 7.5;
      const lineHeight = 4.2;
      const innerPadding = 6;
      const termHeight = topBarHeight + 20 + (question.output.length * lineHeight) + innerPadding * 2;

      // Header bar (light silver)
      doc.setFillColor(212, 216, 222);
      doc.rect(margin, y, contentWidth, topBarHeight, 'F');

      // Header text
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(20, 20, 20);
      doc.text("Status :   Successfully executed", margin + 5, y + 5);

      // Body background (dark navy)
      doc.setFillColor(16, 21, 31);
      doc.rect(margin, y + topBarHeight, contentWidth, termHeight - topBarHeight, 'F');

      // Body text
      let textY = y + topBarHeight + 7;
      doc.setFont('courier', 'normal');
      doc.setFontSize(8);

      // Time & Memory labels
      doc.setTextColor(140, 155, 175);
      doc.text("Time:                 Memory:", margin + 6, textY);
      textY += 4.5;

      // Time & Memory values
      doc.setTextColor(220, 230, 240);
      doc.text("0.0450 secs           37.450 Mb", margin + 6, textY);
      textY += 7;

      // "Your Output" label
      doc.setTextColor(240, 245, 255);
      doc.text("Your Output", margin + 6, textY);
      textY += 5;

      // Actual Output lines
      doc.setTextColor(255, 255, 255);
      for (const line of question.output) {
        doc.text(line || ' ', margin + 8, textY);
        textY += lineHeight;
      }
      return textY;
    }

    // ==========================================
    // LAYOUT: Mac Terminal (zsh) (PDF 4)
    // ==========================================
    if (key === 'mac') {
      const promptTemplate = replacePlaceholders(layout.promptTemplate);
      const topBarHeight = 7.5;
      const lineHeight = 4.0;
      const innerPadding = 6;

      const termLines = [
        compileCmd,
        runCmd,
        ...question.output,
        promptTemplate + " █"
      ];

      const bodyHeight = termLines.length * lineHeight + innerPadding * 2;
      const totalHeight = topBarHeight + bodyHeight;

      // Terminal outer border & white background
      doc.setDrawColor(180, 180, 180);
      doc.setLineWidth(0.3);
      doc.setFillColor(255, 255, 255); // PURE WHITE background matching PDF 4!
      doc.rect(margin, y, contentWidth, totalHeight, 'FD');

      // Top title bar (light silver)
      doc.setFillColor(232, 232, 232);
      doc.rect(margin, y, contentWidth, topBarHeight, 'FD');

      // macOS Traffic light buttons
      const dotY = y + topBarHeight / 2;
      doc.setFillColor(255, 95, 86);
      doc.circle(margin + 5, dotY, 1.3, 'F');
      doc.setFillColor(255, 189, 46);
      doc.circle(margin + 10, dotY, 1.3, 'F');
      doc.setFillColor(39, 201, 63);
      doc.circle(margin + 15, dotY, 1.3, 'F');

      // Centered Title
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7.5);
      doc.setTextColor(70, 70, 70);
      doc.text(titleText, margin + contentWidth / 2, y + 5, { align: 'center' });

      // Body text (Courier, black #000000)
      doc.setFont('courier', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(0, 0, 0);

      let textY = y + topBarHeight + innerPadding + 2;
      for (const line of termLines) {
        doc.text(line || ' ', margin + 5, textY);
        textY += lineHeight;
      }
      return textY;
    }

    // ==========================================
    // LAYOUT: Windows CMD (PDF 2)
    // ==========================================
    if (key === 'cmd') {
      const promptTemplate = replacePlaceholders(layout.promptTemplate);
      const topBarHeight = 7.5;
      const lineHeight = 4.0;
      const innerPadding = 6;

      const termLines = [
        compileCmd,
        runCmd,
        ...question.output,
        promptTemplate
      ];

      const bodyHeight = termLines.length * lineHeight + innerPadding * 2;
      const totalHeight = topBarHeight + bodyHeight;

      // Top title bar (white)
      doc.setFillColor(255, 255, 255);
      doc.rect(margin, y, contentWidth, topBarHeight, 'F');

      // Title bar contents
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(20, 20, 20);

      // Left: 'c:' box + 'Command Prompt'
      doc.rect(margin + 4, y + 2, 3.5, 3.5, 'S');
      doc.text('c:', margin + 4.5, y + 4.6);
      doc.text('Command Prompt', margin + 10, y + 5);

      // Right: '-  □  X'
      doc.text('—   □   ✕', margin + contentWidth - 16, y + 5);

      // Terminal body (pure black)
      doc.setFillColor(12, 12, 12);
      doc.rect(margin, y + topBarHeight, contentWidth, bodyHeight, 'F');

      // Text (Courier, light gray #d5d5d5)
      doc.setFont('courier', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(215, 215, 215);

      let textY = y + topBarHeight + innerPadding + 2;
      for (const line of termLines) {
        doc.text(line || ' ', margin + 5, textY);
        textY += lineHeight;
      }
      return textY;
    }

    // ==========================================
    // LAYOUT: VS Code (PowerShell) (PDF 3) & fallback
    // ==========================================
    {
      const promptTemplate = replacePlaceholders(layout.promptTemplate);
      const topBarHeight = 7.5;
      const lineHeight = 4.0;
      const innerPadding = 6;

      const termLines = [
        compileCmd,
        runCmd,
        ...question.output,
        promptTemplate + " █"
      ];

      const bodyHeight = termLines.length * lineHeight + innerPadding * 2;
      const totalHeight = topBarHeight + bodyHeight;

      // Top Bar (dark gray #1f1f1f)
      doc.setFillColor(31, 31, 31);
      doc.rect(margin, y, contentWidth, topBarHeight, 'F');

      // Left Tabs: PROBLEMS OUTPUT DEBUG CONSOLE TERMINAL PORTS
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(6.5);
      doc.setTextColor(130, 130, 130);
      doc.text("PROBLEMS   OUTPUT   DEBUG CONSOLE", margin + 5, y + 5);

      // Active tab: TERMINAL (white text with underline)
      doc.setTextColor(255, 255, 255);
      const termTabX = margin + 57;
      doc.text("TERMINAL", termTabX, y + 5);
      doc.setDrawColor(255, 255, 255);
      doc.setLineWidth(0.4);
      doc.line(termTabX, y + 6.8, termTabX + 13, y + 6.8);

      doc.setTextColor(130, 130, 130);
      doc.text("PORTS", termTabX + 17, y + 5);

      // Right: powershell + v = ^ x
      doc.text("powershell   +   v   =   ^   x", margin + contentWidth - 36, y + 5);

      // Terminal body (dark charcoal #181818)
      doc.setFillColor(24, 24, 24);
      doc.rect(margin, y + topBarHeight, contentWidth, bodyHeight, 'F');

      // Text (Courier, light gray #cccccc)
      doc.setFont('courier', 'normal');
      doc.setFontSize(8);
      doc.setTextColor(205, 205, 205);

      let textY = y + topBarHeight + innerPadding + 2;
      for (const line of termLines) {
        doc.text(line || ' ', margin + 5, textY);
        textY += lineHeight;
      }
      return textY;
    }
  }

  /* ---------- Confetti Particle Effect ---------- */
  function fireConfetti() {
    if (reducedMotion) return;

    const canvas = els.confetti;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const colors = ['#818cf8', '#6366f1', '#4ade80', '#f97316', '#f43f5e', '#06b6d4'];
    const particles = [];

    for (let i = 0; i < 140; i++) {
      particles.push({
        x: canvas.width / 2 + (Math.random() - 0.5) * 300,
        y: canvas.height / 2 - 40,
        vx: (Math.random() - 0.5) * 14,
        vy: -Math.random() * 16 - 6,
        w: Math.random() * 8 + 4,
        h: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 16,
        gravity: 0.32,
        drag: 0.98,
        opacity: 1
      });
    }

    let startTime = performance.now();
    const duration = 3200;

    function animate(now) {
      const elapsed = now - startTime;
      if (elapsed > duration) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.vx *= p.drag;
        p.vy += p.gravity;
        p.vy *= p.drag;
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.rotationSpeed;
        p.opacity = Math.max(0, 1 - elapsed / duration);

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      }

      requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  /* ---------- Download helper ---------- */
  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 8000);
  }

  /* ---------- Show / hide sections ---------- */
  function showSection(sectionId) {
    ['step1', 'step2', 'actionArea', 'successSection', 'errorSection'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    els.terminalAnim.classList.remove('visible');

    const target = document.getElementById(sectionId);
    if (target) target.style.display = '';
  }

  function showAllSteps() {
    ['step1', 'step2', 'actionArea'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = '';
    });
    ['successSection', 'errorSection'].forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    els.terminalAnim.classList.remove('visible');
  }

  /* ---------- Layout name for filename ---------- */
  function getLayoutFileName(key) {
    const map = {
      vscode: 'VSCode',
      mac: 'MacTerminal',
      linux: 'LinuxTerminal',
      cmd: 'WindowsCMD',
      codechef: 'CodeChef'
    };
    return map[key] || 'Personalized';
  }

  /* ---------- Format file size ---------- */
  function formatBytes(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  }

  /* ---------- GENERATE & DOWNLOAD ---------- */
  async function handleGenerate() {
    if (state.isGenerating) return;
    state.isGenerating = true;

    // UI: enter generating state
    els.generateBtn.classList.add('generating');
    els.nameInput.disabled = true;
    document.querySelectorAll('.layout-card').forEach(c => {
      c.style.pointerEvents = 'none';
    });

    updateGenerationStatus('Reading Java template...', 5);
    announce('Generating Java lab PDF...');

    // Start terminal animation
    runTerminalAnimation();

    try {
      await sleep(reducedMotion ? 100 : 500);
      updateGenerationStatus(`Personalizing for ${state.name || 'you'}...`, 15);
      await sleep(reducedMotion ? 50 : 350);

      // Generate all 36 pages
      const doc = await generatePDF();

      updateGenerationStatus('Finalizing document...', 96);
      await sleep(reducedMotion ? 50 : 250);

      // Create blob
      const blob = doc.output('blob');
      const folderName = state.folder || 'Student';
      const fileName = `${folderName}_Java_Lab_${getLayoutFileName(state.selectedLayout)}.pdf`;

      state.generatedBlob = blob;
      state.generatedFileName = fileName;

      // Update progress to 100%
      updateGenerationStatus('Done!', 100);
      await sleep(reducedMotion ? 100 : 400);

      // Auto download
      downloadBlob(blob, fileName);

      // Show success
      els.generateBtn.classList.remove('generating');
      showSection('successSection');
      els.successFile.textContent = fileName;
      els.successSize.textContent = `${formatBytes(blob.size)} • 39 pages`;

      announce('PDF generated successfully. Download started.');

      // Confetti!
      fireConfetti();

    } catch (err) {
      console.error('PDF generation error:', err);
      els.generateBtn.classList.remove('generating');
      showSection('errorSection');
      els.errorMessage.textContent = 'Something went wrong: ' + (err.message || 'Unknown error. Please try again.');
      announce('Error generating PDF.');
    } finally {
      state.isGenerating = false;
      els.nameInput.disabled = false;
      document.querySelectorAll('.layout-card').forEach(c => {
        c.style.pointerEvents = '';
      });
    }
  }

  /* ---------- Reset (Make Another) ---------- */
  function resetApp() {
    state.name = '';
    state.user = '';
    state.folder = '';
    state.generatedBlob = null;
    state.generatedFileName = '';

    els.nameInput.value = '';
    els.nameInput.classList.remove('valid', 'invalid');
    els.inputGroup.classList.remove('valid');
    els.nameHint.textContent = '';
    els.charCount.textContent = '0/30';

    updateTerminalPreviews();
    updateProgress();
    updateGenerateBtn();
    showAllSteps();

    els.nameInput.focus();
  }

  /* ---------- Floating code symbols ---------- */
  function createFloatingSymbols() {
    const container = document.querySelector('.floating-symbols');
    if (!container || reducedMotion) return;

    const symbols = ['{ }', ';', '< >', '( )', '//', '/*', '*/', '=>', '::', '[ ]', '.', ',', '+', '-', '=', '!', '?', '#', '&&', '||'];

    for (let i = 0; i < 22; i++) {
      const span = document.createElement('span');
      span.className = 'float-symbol';
      span.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      span.style.left = Math.random() * 100 + '%';
      span.style.top = (Math.random() * 100 + 100) + '%';
      span.style.fontSize = (13 + Math.random() * 11) + 'px';
      span.style.animationDuration = (16 + Math.random() * 16) + 's';
      span.style.animationDelay = -(Math.random() * 20) + 's';
      container.appendChild(span);
    }
  }

  /* ---------- Theme toggle ---------- */
  function handleThemeToggle() {
    state.isDarkTheme = !state.isDarkTheme;
    document.documentElement.setAttribute('data-theme', state.isDarkTheme ? 'dark' : 'light');
  }

  /* ---------- Initialization ---------- */
  function init() {
    els.inputGroup = els.nameInput.closest('.input-group');
    els.btnText = els.generateBtn.querySelector('.btn-text');
    els.btnStatus = els.generateBtn.querySelector('.btn-status');
    els.btnProgressFill = els.generateBtn.querySelector('.btn-progress-fill');
    els.progressSteps = document.querySelectorAll('.progress-step');
    els.progressLines = document.querySelectorAll('.progress-line');

    createFloatingSymbols();
    renderLayoutCards();

    els.nameInput.addEventListener('input', handleNameInput);
    els.generateBtn.addEventListener('click', handleGenerate);
    els.themeToggle.addEventListener('click', handleThemeToggle);

    document.getElementById('downloadAgainBtn').addEventListener('click', () => {
      if (state.generatedBlob && state.generatedFileName) {
        downloadBlob(state.generatedBlob, state.generatedFileName);
      }
    });

    document.getElementById('makeAnotherBtn').addEventListener('click', resetApp);

    document.getElementById('tryAgainBtn').addEventListener('click', () => {
      showAllSteps();
      updateProgress();
      updateGenerateBtn();
    });

    updateProgress();
    updateGenerateBtn();
    updateTerminalPreviews();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
