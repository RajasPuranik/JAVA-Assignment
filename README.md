# Java Lab PDF Personalizer

A polished, client-side single-page website that personalizes 36 Java lab exercises across 4 different terminal environments and generates downloadable PDFs automatically in the browser.

![Screenshot](screenshot.png) <!-- optional preview -->

## ✨ Features

- **3-Step Core Flow**:
  1. Type your name
  2. Select your preferred terminal style
  3. Click **Generate & Download**
- **4 Authentic Terminal Layouts** (pixel-matched from real Java lab submissions):
  - **VS Code (PowerShell)**: Dark theme, tab header (`PROBLEMS OUTPUT DEBUG CONSOLE TERMINAL PORTS`), yellow compiler keywords.
  - **Mac Terminal (zsh)**: Clean white terminal body, silver title bar with red/yellow/green traffic light controls, title `<name> - -zsh - 80x24`.
  - **Windows CMD**: White title bar with `c:` icon & window controls, black terminal body, prompt `C:\<folder>>`.
  - **CodeChef (Online IDE)**: Silver header with `Status : Successfully executed`, dark navy body, execution time/memory stats.
- **Complete Java Lab Curriculum**:
  - Covers all 36 exercises (basics, math, loops, arrays, OOP, inheritance, abstract classes, interfaces, packages, custom checked exceptions, multithreading).
  - Exact 39-page output pagination matching real lab PDFs.
- **Privacy First**:
  - 100% client-side execution using `jsPDF`.
  - No backend, no database, no analytics, no API keys. Names never leave your device.
- **Modern UI / UX**:
  - Glassmorphism card with ambient floating code particles.
  - Dark / Light mode toggle.
  - 3D cursor-follow tilt on cards and interactive confetti celebration on download.
  - Full keyboard accessibility and `prefers-reduced-motion` compliance.

## 🚀 How to Run Locally

Just open `index.html` in any modern web browser or serve via:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .
```

Then visit [http://localhost:8080](http://localhost:8080).

## 🌐 Deploy to GitHub Pages

1. Go to your repository settings: **Settings** → **Pages**.
2. Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
3. Select branch: `main` and folder: `/(root)`.
4. Click **Save**. Your site will be live at `https://<username>.github.io/<repo>/`!

---
Developed with vanilla HTML, CSS, and JavaScript.
