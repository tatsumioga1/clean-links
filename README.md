# 🔗 Clean Links

**Clean Links** is a privacy-focused Chrome extension that removes unnecessary tracking parameters from URLs before they can follow you around the web.

No more URL mambo jumbo. 🧹

---

## ✨ Features

### 🛡️ Multi-layer URL Protection

Clean Links protects your browsing with several layers:

- ⚔️ Capture-phase click interception
- 🔗 Pre-click link cleaning
- 👁️ Dynamic link monitoring
- 🐉 SPA navigation interception
- 🧹 Current URL emergency cleanup

---

## 🧬 Smart Rule Engine

Clean Links removes known tracking parameters while preserving the parts of a URL that actually matter.

**Example:**

Before:

```
https://www.google.com/search?q=weather&source=hp&gs_psrp=abc123&oq=wea
```

After:

```
https://www.google.com/search?q=weather
```

---

## 🌎 Universal Tracker Removal

Works across websites:

- `utm_*`
- `fbclid`
- `gclid`
- `msclkid`

---

## 🔍 Google Search Intelligence

Removes Google-specific tracking and internal parameters:

- `source`
- `sxsrf`
- `sca_esv`
- `ei`
- `iflsig`
- `ved`
- `gs_lp`
- `gs_psrp`
- `sclient`
- `oq`
- `fbs`
- `sa`

While preserving important parameters like:

- `q` (your search)
- `hl` (language)
- `udm` (search mode)
- `newwindow` (user preference)

---

## 📺 YouTube Cleanup

Removes:

- `si`

Example:

Before:

```
https://youtube.com/watch?v=abc123&si=tracking-data
```

After:

```
https://youtube.com/watch?v=abc123
```

---

## 📊 Privacy Dashboard

Clean Links includes a built-in dashboard showing:

- 🏆 Total trackers removed
- 👾 Most common tracking parameters
- 🌎 Domains that send the most tracking data
- 🔔 Live toolbar badge counter

---

## 🏗️ Architecture

Built using:

- Manifest V3
- Chrome Service Workers
- Content Scripts
- MutationObserver
- Chrome Storage API
- Message Passing
- History API interception

---

## 🚀 Installation

### Install manually

1. Download or clone this repository:

```
git clone https://github.com/tatsumioga1/clean-links.git
```

2. Open Chrome and go to:

```
chrome://extensions/
```

3. Enable **Developer mode**

4. Click:

```
Load unpacked
```

5. Select the `clean-links` folder

6. Done! 🔗

---

## 🧪 Development Philosophy

Clean Links follows a simple rule:

> Keep what describes what I want.  
> Remove what describes how I got there.

A good URL cleaner should act like a scalpel, not a chainsaw.

---

## 📜 License

MIT License

---

## 🐉 Project History

What began as a simple idea:

> "Why does Google put so much mambo jumbo in my URLs?"

Evolved into:

- v1.0 — Basic URL cleanup
- v1.3 — Badge counter and statistics
- v1.5 — Pre-click cleaning
- v1.6 — Tracker intelligence dashboard
- v2.0 — Dragon Slayer Edition 🐉

---

Made with ☕, curiosity, and a healthy dislike of unnecessary URL tracking.
