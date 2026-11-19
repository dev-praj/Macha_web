# Macha Website & Field Guide

The official public download website and comprehensive user field guide for the **Macha** AI companion app.
Built with clean, modern HTML5, CSS3, and vanilla JavaScript (zero build step required).

---

## Running Locally

**Option 1 — Python simple server (recommended):**
```sh
cd website
python -m http.server 8000
```
Then visit:
- Landing & Downloads: `http://localhost:8000/index.html`
- User Field Guide: `http://localhost:8000/guide.html`

**Option 2 — Node / npx:**
```sh
npx serve website
```
Then visit `http://localhost:3000`

---

## Deploying

### GitHub Pages
1. Push this repository to GitHub.
2. In repository **Settings &rarr; Pages**, set Source to Deploy from branch `main` / folder `/website`.
3. Your site will be published at `https://<username>.github.io/<repo>/`.

### Netlify
1. Drag the `website/` folder directly onto [app.netlify.com/drop](https://app.netlify.com/drop).
2. Or connect the repository and set the **Publish directory** to `website`.

---

## Replacing the Download Files

Place release binaries inside `website/downloads/`:

| File | Description |
| :--- | :--- |
| `website/downloads/Macha.apk` | Android companion APK (sideload) |
| `website/downloads/Macha.exe` | Windows standalone installer / executable |

The download buttons in both `index.html` and `guide.html` link to these exact filenames without version numbers.

---

## Guide Maintenance & Screenshot Placement

The user field guide lives at `website/guide.html` with styles in `website/css/guide.css` and behavior in `website/js/guide.js`.

### Adding or Updating Guide Screenshots

Screenshots for features are stored in `website/assets/guide/`.

The guide currently uses 7 real screenshots copied from the app:
- `claude-approval.png` — Claude Code CLI approval prompt
- `chat-screen.png` — Conversational interface with syntax-highlighted code
- `compact-island.png` — Desktop island in compact pill state
- `file-drop.png` — Drag-and-drop file ingestion
- `island-overview.png` — Expanded island interface
- `settings-hub.png` — Settings hub and model configuration
- `greeting-launch.png` — Startup greeting ceremony with avatar trio

For remaining features, styled placeholders are displayed. To add real screenshots, simply save your captured images into `website/assets/guide/` using these exact filenames:
- `nixi-dictation.png` — Voice dictation waveform or screen marquee
- `vision-gestures.png` — Hand tracking cursor and pinch detection
- `hey-macha-calibration.png` — Voice calibration meter in Settings
- `live-diffs.png` — Live code additions/deletions ticker
- `android-companion-sync.png` — Android app connected screen and biometrics
- `android-widgets.png` — Android home screen showing widgets
- `workflows-macro.png` — Saved PowerShell macros in Settings
- `media-controls.png` — Island active media player controls

See [`website/GUIDE_TODO.md`](GUIDE_TODO.md) for detailed dimensions, guidelines, and user review items.

---

## Project Structure

```
website/
  index.html            # Main landing & download page
  guide.html            # Complete user field manual & documentation
  GUIDE_TODO.md         # Guide asset checklist & screenshot tracking
  css/
    style.css           # Core design system (60/30/10 dark matcha palette)
    guide.css           # Guide-specific styles (two-column, TOC, search, cards)
  js/
    main.js             # Hero avatar animation, startup greeting sequence
    guide.js            # Guide scroll-spy TOC, client-side search, checklist
  assets/
    macha-face.svg      # Macha brand logo
    macha-face.png      # Macha brand logo (raster)
    avatar-cluster.svg  # Logo cluster (Macha, Cubee, Onee)
    startup/            # Authentic startup assets & wav chimes
    guide/              # Screenshots for guide features
  downloads/
    Macha.apk           # Android build
    Macha.exe           # Windows build
  README.md             # This file
```

---

## Credits

- **Created by Prajwal** ([github.com/dev-praj/Macha_by_Prajwal](https://github.com/dev-praj/Macha_by_Prajwal))
- Character trio (Macha, Cubee, Onee) and design system from the Macha codebase.
