# Macha Guide — Asset & Content Checklist (`GUIDE_TODO.md`)

This file tracks placeholder screenshots and items for user review in `website/guide.html`.

---

## 📸 Screenshots Needed

The guide currently uses 7 real screenshots copied from the app repository in `website/assets/guide/`:
- [x] `island-overview.png` — Dynamic Island desktop widget
- [x] `compact-island.png` — Compact pill state
- [x] `claude-approval.png` — Claude Code hook terminal approval prompt
- [x] `chat-screen.png` — AI chat interface with local Ollama
- [x] `file-drop.png` — Drag-and-drop file swallow interaction
- [x] `settings-hub.png` — Settings hub & model configuration
- [x] `greeting-launch.png` — Startup greeting & avatar trio

The following 8 features currently display an interactive, styled glass placeholder in `guide.html`. When you capture these screenshots, simply save them into `website/assets/guide/` with these exact filenames:

| Filename | Feature | Recommended Dimensions | Description to Capture |
| :--- | :--- | :--- | :--- |
| `nixi-dictation.png` | **Nixi Voice Dictation** | ~800 × 500 px | Desktop showing the voice waveform bar active while holding <kbd>Right Alt</kbd>, or the screen marquee selection box when pressing <kbd>Ctrl</kbd> + <kbd>Alt</kbd>. |
| `vision-gestures.png` | **Vision Mode (Hand Tracking)** | ~800 × 500 px | Webcam preview overlay or hand gesture cursor tracking dots showing pinch-to-click. |
| `hey-macha-calibration.png` | **"Hey Macha" Wake Word** | ~800 × 500 px | The voice calibration wizard in `Settings → Voice` with the "Record 'Hey Macha'" audio meter. |
| `live-diffs.png` | **Live File Diffs & Session Ticker** | ~800 × 450 px | The island expanded ticker showing active code additions (`+`) and deletions (`-`) with "Open in VS Code". |
| `android-companion-sync.png` | **Android Phone Link & Biometrics** | ~600 × 1200 px (phone aspect) | Android companion app screen displaying connected desktop status and the biometric fingerprint approval dialog. |
| `android-widgets.png` | **Android Home Screen Widgets** | ~600 × 1200 px (phone aspect) | Android home screen showing several of Macha's 10 widgets (e.g., *Macha Big*, *Status Pill*, *Macha's Mood*, *Approvals Waiting*). |
| `workflows-macro.png` | **Local Workflows & Automations** | ~800 × 500 px | The `Settings → Workflows` tab showing a saved PowerShell automation script and trigger hotkey. |
| `media-controls.png` | **Media Controls & Island Alerts** | ~600 × 300 px | Floating island expanded with active media track (e.g., Spotify), album artwork, and play/pause controls. |

---

## 🔍 Items for User Review & Customization

1. **GitHub Repository URL**:
   - Current: `https://github.com/dev-praj/Macha_by_Prajwal`
   - Review whether this matches your preferred public repository link.

2. **Default Local Ollama Models**:
   - The guide highlights `qwen2.5:7b` and `gpt-oss:20b` based on the codebase defaults. If you recommend specific lighter models for beginners (e.g., `llama3.2:3b`), you can update the recommended command in Section 4.

3. **Android Minimum Version**:
   - The guide notes Android 10+ for widgets and biometric approvals. If your build supports Android 8+, verify and adjust in the Requirements note.

4. **Direct Download Binaries**:
   - The download buttons point to `downloads/Macha.apk` and `downloads/Macha.exe` without version tags. Confirm your release deployment places updated binaries at these paths.
