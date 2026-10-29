/**
 * ====================================================================
 * INTERACTIVE TERMINAL & CODE SHOWCASE COMPONENT
 * ====================================================================
 * Powers the interactive developer window in the hero section:
 * - Interactive bash terminal with real commands (about, skills, projects, contact, clear)
 * - Python file preview tab (anjan.py)
 * - CSS stylesheet preview tab (styles.css)
 * - Quick command suggestion chips
 */

(function () {
  function initTerminal() {
    const tabButtons = document.querySelectorAll(".term-tab-btn");
    const tabPanes = document.querySelectorAll(".term-pane");
    const terminalOutput = document.getElementById("terminal-output");
    const terminalInput = document.getElementById("terminal-input");
    const terminalForm = document.getElementById("terminal-form");
    const chipButtons = document.querySelectorAll(".term-chip");

    // 1. Tab Switching
    tabButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetTab = btn.getAttribute("data-tab");
        tabButtons.forEach((b) => b.classList.remove("active"));
        tabPanes.forEach((p) => p.classList.remove("active"));

        btn.classList.add("active");
        const activePane = document.getElementById(`tab-${targetTab}`);
        if (activePane) {
          activePane.classList.add("active");
        }
      });
    });

    if (!terminalOutput || !terminalInput || !terminalForm) return;

    // Terminal command history
    const commandHistory = [];
    let historyIndex = -1;

    // Available commands
    const commands = {
      help: () => `
<div class="term-line-output">
  <span class="term-accent font-bold">Available Commands:</span><br>
  &nbsp;&nbsp;<span class="term-cmd">about</span>     - Summary of who I am & my education<br>
  &nbsp;&nbsp;<span class="term-cmd">skills</span>    - Core technical stack (Python, CSS, etc.)<br>
  &nbsp;&nbsp;<span class="term-cmd">projects</span>  - List of featured projects<br>
  &nbsp;&nbsp;<span class="term-cmd">run python</span>- Executes anjan.py live<br>
  &nbsp;&nbsp;<span class="term-cmd">contact</span>   - How to reach me & social links<br>
  &nbsp;&nbsp;<span class="term-cmd">clear</span>     - Clear the terminal screen<br>
  &nbsp;&nbsp;<span class="term-cmd">help</span>      - Show this manual
</div>`,

      about: () => `
<div class="term-line-output">
  <span class="term-highlight">Anjan Tripathi</span><br>
  🎓 <span class="term-dim">Student:</span> Newton School of Technology (1st Year Tech Degree)<br>
  📍 <span class="term-dim">Location:</span> Lucknow, India<br>
  💡 <span class="term-dim">Interests:</span> Python, Modern CSS, Web Development, Artificial Intelligence<br>
  🚀 <span class="term-dim">Motto:</span> "Building, Learning, and Creating with Technology."
</div>`,

      skills: () => `
<div class="term-line-output">
  <span class="term-accent font-bold">Technical Stack & Focus:</span><br>
  &nbsp;• <span class="term-highlight">Python:</span> OOP, Automation, Scripting, Problem Solving<br>
  &nbsp;• <span class="term-highlight">CSS3:</span> Grid, Flexbox, Custom Variables, Keyframe Animations<br>
  &nbsp;• <span class="term-highlight">Web:</span> HTML5 Semantic, JavaScript (ES6+), Responsive Layouts<br>
  &nbsp;• <span class="term-highlight">Tools:</span> Git, GitHub, VS Code, Linux Shell, Chrome DevTools
</div>`,

      projects: () => `
<div class="term-line-output">
  <span class="term-accent font-bold">Featured Projects:</span><br>
  &nbsp;1. <span class="term-highlight">PyTask CLI:</span> Python-based modular CLI task automator & study log<br>
  &nbsp;2. <span class="term-highlight">StyleCraft:</span> Interactive modern CSS layout lab & component engine<br>
  &nbsp;3. <span class="term-highlight">CampusPulse:</span> Student academic tracking dashboard with offline storage<br>
  <span class="term-dim">(Scroll down to the Projects section to explore interactive previews &amp; deep dives!)</span>
</div>`,

      contact: () => `
<div class="term-line-output">
  <span class="term-accent font-bold">Get In Touch:</span><br>
  &nbsp;✉️ Email: <a href="mailto:${window.PORTFOLIO_DATA?.profile?.email || 'anjantripathi.tech@gmail.com'}" class="term-link">${window.PORTFOLIO_DATA?.profile?.email || 'anjantripathi.tech@gmail.com'}</a><br>
  &nbsp;🐙 GitHub: <a href="${window.PORTFOLIO_DATA?.profile?.github || '#'}" target="_blank" rel="noopener" class="term-link">${window.PORTFOLIO_DATA?.profile?.github || 'github.com/anjantripathi'}</a><br>
  &nbsp;💼 LinkedIn: <a href="${window.PORTFOLIO_DATA?.profile?.linkedin || '#'}" target="_blank" rel="noopener" class="term-link">linkedin.com/in/anjantripathi</a><br>
  &nbsp;📍 Location: Lucknow, India
</div>`,

      clear: () => {
        terminalOutput.innerHTML = "";
        return null;
      },

      "run python": () => `
<div class="term-line-output">
  <span class="term-dim">[Executing python3 anjan.py...]</span><br>
  <span class="term-success">✓ Loaded Developer Model</span><br>
  &gt;&gt;&gt; name = "Anjan Tripathi"<br>
  &gt;&gt;&gt; school = "Newton School of Technology"<br>
  &gt;&gt;&gt; status = "1st-year student building practical tech solutions"<br>
  &gt;&gt;&gt; print(status)<br>
  <span class="term-highlight font-bold">"Building, learning, and creating with technology."</span>
</div>`,

      "python anjan.py": () => commands["run python"](),
      "python": () => commands["run python"]()
    };

    function executeCommand(rawCmd) {
      const trimmed = rawCmd.trim().toLowerCase();
      if (!trimmed) return;

      commandHistory.push(rawCmd);
      historyIndex = commandHistory.length;

      // Echo command
      const echoEl = document.createElement("div");
      echoEl.className = "term-line";
      echoEl.innerHTML = `<span class="term-prompt">visitor@anjan-mac:~$</span> <span class="term-echo">${escapeHtml(rawCmd)}</span>`;
      terminalOutput.appendChild(echoEl);

      // Resolve command
      let responseHtml = "";
      if (commands[trimmed]) {
        responseHtml = commands[trimmed]();
      } else if (trimmed.startsWith("python")) {
        responseHtml = commands["run python"]();
      } else {
        responseHtml = `<div class="term-line-output term-error">zsh: command not found: ${escapeHtml(rawCmd)}. Type <span class="term-cmd">help</span> for a list of commands.</div>`;
      }

      if (responseHtml) {
        const resEl = document.createElement("div");
        resEl.innerHTML = responseHtml;
        terminalOutput.appendChild(resEl);
      }

      // Auto scroll to bottom
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function escapeHtml(str) {
      return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    // Handle Form Submit
    terminalForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const val = terminalInput.value;
      terminalInput.value = "";
      executeCommand(val);
    });

    // Handle Arrow Keys for History
    terminalInput.addEventListener("keydown", (e) => {
      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (historyIndex > 0) {
          historyIndex--;
          terminalInput.value = commandHistory[historyIndex] || "";
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex < commandHistory.length - 1) {
          historyIndex++;
          terminalInput.value = commandHistory[historyIndex] || "";
        } else {
          historyIndex = commandHistory.length;
          terminalInput.value = "";
        }
      }
    });

    // Handle Quick Command Chips
    chipButtons.forEach((chip) => {
      chip.addEventListener("click", () => {
        // Switch to terminal tab if not active
        const termTabBtn = document.querySelector('[data-tab="terminal"]');
        if (termTabBtn) termTabBtn.click();

        const cmd = chip.getAttribute("data-cmd");
        if (cmd) {
          executeCommand(cmd);
          terminalInput.focus();
        }
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTerminal);
  } else {
    initTerminal();
  }
})();
