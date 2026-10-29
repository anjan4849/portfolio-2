# Anjan Tripathi — Developer Portfolio Website

A modern developer portfolio crafted using **pure semantic HTML5 and modern CSS3** (no external framework bloat or JavaScript dependencies required).

Designed for **Anjan Tripathi**, 1st-year technology student at **Newton School of Technology**, aspiring software developer with core interests in **Python** scripting, **CSS** architecture, and software engineering.

---

## 🚀 Live Preview & Architecture

- **Stack**: Pure HTML5, Modern CSS3 (Grid, Flexbox, Custom Properties, Glassmorphism, Pure CSS `:target` Modals, Pure CSS Checkbox Navigation).
- **Zero JavaScript Runtime Dependency**: Every interactive element — responsive navigation, project case-study modals, resume preview, hover transforms, and animated glows — functions natively in pure CSS.
- **Assets**: Custom SVG illustrations tailored for Python CLI, modern CSS architecture, and student dashboard concepts.
- **Responsive**: Mobile-first architecture tested across 320px, 768px, 1024px, and 1440px+ viewports.

---

## 📁 Project Directory Structure

```text
├── index.html                   # Main semantic portfolio entrypoint
├── serve.py                     # Python 3 local development server script
├── css/
│   └── style.css                # Pure modern CSS design tokens, layouts & components
├── assets/
│   ├── favicon.svg              # Glowing < AT > code-bracket monogram favicon
│   ├── Anjan_Tripathi_Resume.pdf# Downloadable 1-page resume PDF
│   └── images/
│       ├── profile-avatar.svg   # Custom developer avatar with tech badges (.py, <css>)
│       ├── project1.svg         # PyTask CLI terminal interface mockup
│       ├── project2.svg         # StyleCraft CSS layout lab split-screen mockup
│       └── project3.svg         # CampusPulse NST student dashboard mockup
└── README.md                    # Setup, customization, and deployment instructions
```

---

## 💻 How to Run Locally

### Option 1: Python Dev Server (Recommended)
Run the included Python 3 dev server:
```bash
python3 serve.py
```
This automatically finds an available port (e.g. `http://localhost:8000`) and launches your default browser.

### Option 2: Direct File Viewing
Simply double-click `index.html` in your file explorer to preview the site in any web browser. No build steps or package managers required!


## 🛠️ How to Customize Your Portfolio

### 1. Update Personal Profile & Social Links
Open [`index.html`](file:///Users/anjantripathi/s%20and%20ai%20debug/index.html) and search for:
- **Name & Title**: Line 40+ (`Anjan Tripathi`, `Newton School of Technology | Tech Student`)
- **Bio & Intro**: Hero section description paragraph
- **Social Profiles**:
  - Replace `https://github.com/anjantripathi` with your actual GitHub username.
  - Replace `https://linkedin.com/in/anjantripathi` with your actual LinkedIn profile.
  - Replace `anjan.tripathi@example.com` with your real email address.

### 2. Update or Add Projects
Each project card in `#projects` links to a corresponding pure CSS modal:
- **Card 1**: PyTask CLI (`#modal-project1`)
- **Card 2**: StyleCraft Lab (`#modal-project2`)
- **Card 3**: CampusPulse Hub (`#modal-project3`)

To change project details:
1. Edit the title, description, and tags inside the `<article class="project-card">` in [`index.html`](file:///Users/anjantripathi/s%20and%20ai%20debug/index.html).
2. Edit the corresponding `<div id="modal-project*" class="modal-overlay">` modal to update problem statements, architecture, and learnings.
3. Replace the SVGs in `assets/images/` or add your own project screenshots (`.png`, `.webp`, `.jpg`).

### 3. Update Your Resume PDF
To update your downloadable resume:
1. Export your resume as a PDF named `Anjan_Tripathi_Resume.pdf`.
2. Place it in the `assets/` folder, replacing the included starter PDF.
3. The "Download Resume" buttons across the header, hero, and resume modal will immediately serve your new PDF.

### 4. Configure Real Contact Form Submissions
The contact form is currently configured with native `mailto:`:
```html
<form action="mailto:your_email@example.com" method="post" enctype="text/plain">
```
To enable background email delivery without opening the user's mail client, you can use **Formspree** (100% free for static sites):
1. Sign up at [formspree.io](https://formspree.io).
2. Create a new form and copy your endpoint ID (e.g. `https://formspree.io/f/mqkenvba`).
3. In [`index.html`](file:///Users/anjantripathi/s%20and%20ai%20debug/index.html), change:
   ```html
   <form action="https://formspree.io/f/YOUR_ENDPOINT_ID" method="POST" class="contact-form">
   ```
4. Now all submissions are delivered directly to your inbox automatically!

---

## 🌐 How to Deploy (Free & Instant)

### Option A: GitHub Pages (Recommended)
1. Initialize git and commit:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio release"
   ```
2. Create a new repository on GitHub named `portfolio` (or `anjantripathi.github.io`).
3. Push your code:
   ```bash
   git remote add origin https://github.com/<your-username>/<repo-name>.git
   git branch -M main
   git push -u origin main
   ```
4. On GitHub, go to **Settings > Pages**, select the `main` branch, and click **Save**.
5. Your portfolio will be live at `https://<your-username>.github.io/<repo-name>/`.

### Option B: Netlify or Vercel (Drag-and-Drop)
1. Go to [Netlify Drop](https://app.netlify.com/drop) or [Vercel](https://vercel.com).
2. Drag and drop this entire project folder.
3. Your portfolio goes live in under 10 seconds with free SSL!

---

## 🎨 Color Palette Reference

| Token | Hex Value | Role |
| :--- | :--- | :--- |
| `--bg-body` | `#080c14` | Primary Deep Midnight Background |
| `--bg-surface` | `#0e1422` | Card & Panel Surface |
| `--accent-primary` | `#10b981` | Vibrant Emerald Accent |
| `--accent-secondary` | `#06b6d4` | Radiant Cyan Accent |
| `--text-main` | `#f8fafc` | High Contrast Off-White Heading & Body |
| `--text-muted` | `#94a3b8` | Subtle Secondary Text |
