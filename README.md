# 🔗 Clean Links

![Version](https://img.shields.io/badge/version-v2.0.3-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-orange)

A privacy-focused Chrome extension that removes tracking parameters from URLs before they can follow you around the web.

No more URL mambo jumbo.

---

## 📸 Dashboard

<p align="center">
  <img src="assets/popup.png" alt="Clean Links Dashboard" width="350">
</p>

---

## ✨ Features

### 🛡️ Multi-Layer URL Protection

Clean Links protects your browsing through multiple layers:

- Capture-phase click interception
- Pre-click link cleaning
- Dynamic link monitoring
- SPA navigation interception
- Current URL cleanup

---

## 🧬 Smart Rule Engine

Clean Links removes known tracking parameters while preserving parameters required for functionality.

### Example

**Before**

```
https://www.google.com/search?q=weather&source=hp&oq=wea&gs_psrp=abc123
```

**After**

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

## 🔍 Google Search Cleanup

Removes Google-specific tracking and telemetry parameters:

- `source`
- `sourceid`
- `sxsrf`
- `sca_esv`
- `ei`
- `iflsig`
- `ved`
- `gs_lp`
- `gs_psrp`
- `gs_lcrp`
- `sclient`
- `oq`
- `fbs`
- `sa`

Preserves:

- `q`
- `hl`
- `udm`
- `ie`
- `newwindow`

---

## 🤖 Google AI Mode Cleanup

Tested support for Google AI Mode URLs.

Removed:

- `mtid`
- `ntc`
- `aep`
- `mstk`
- `csuir`

Preserved:

- `q`
- `udm`
- `newwindow`

---

## 🎨 Google Doodle Cleanup

Removes Doodle-specific telemetry and metadata:

- `oi`
- `noiga`
- `ct`
- `stick`

Example:

**Before**

```
https://www.google.com/search?newwindow=1&q=FIFA+World+Cup+2026&oi=ddle&noiga=1&ct=460195071&stick=...
```

**After**

```
https://www.google.com/search?newwindow=1&q=FIFA+World+Cup+2026
```

---

## 🟣 Yahoo Search Cleanup

Removes:

- `fr`
- `fr2`
- `mkr`
- `fp`

Example:

**Before**

```
https://search.yahoo.com/search?p=world+cup&fr=yfp-t-s&fr2=...&mkr=7&fp=1
```

**After**

```
https://search.yahoo.com/search?p=world+cup
```

---

## 📦 Amazon Cleanup

Removes referral tracking parameters:

- `ref`
- `ref_`

Example:

**Before**

```
https://www.amazon.in/dp/B0G3X263DY?ref=ppx_yo2ov_dt_b_fed_asin_title
```

**After**

```
https://www.amazon.in/dp/B0G3X263DY
```

---

## 🛒 Flipkart Cleanup

Removes:

- `pid`
- `lid`
- `marketplace`

Example:

**Before**

```
https://www.flipkart.com/product/p/itm123?pid=ABC&lid=XYZ&marketplace=FLIPKART
```

**After**

```
https://www.flipkart.com/product/p/itm123
```

---

## 📺 YouTube Cleanup

Removes:

- `si`

Example:

**Before**

```
https://youtube.com/watch?v=abc123&si=tracking-data
```

**After**

```
https://youtube.com/watch?v=abc123
```

---

## 📊 Statistics Dashboard

Tracks:

- Total trackers removed
- Most common trackers
- Most common domains
- Toolbar badge counter

---

## 🏗️ Built With

- Manifest V3
- Chrome Extensions API
- MutationObserver
- Chrome Storage API
- Service Workers
- Content Scripts
- History API Interception

---

## 🚀 Installation

### Clone the Repository

```bash
git clone https://github.com/tatsumioga1/clean-links.git
```

### Load Into Chrome

1. Open:

```
chrome://extensions/
```

2. Enable **Developer Mode**

3. Click **Load unpacked**

4. Select the Clean Links folder

5. Enjoy cleaner URLs

---

## 🧪 Philosophy

Clean Links follows a simple rule:

> Keep what describes the user's intent.
>
> Remove what describes the website's observation.

A good URL cleaner should behave like a scalpel, not a chainsaw.

---

## 🚀 Roadmap

Clean Links started as a simple URL cleaner.

The long-term goal is to evolve beyond maintaining a static list of tracking parameters and help identify new tracking techniques as they appear.

### 🔬 v2.1 — Tracker Discovery Mode

Planned features:

- Detect unknown URL parameters
- Count occurrences
- Track which domains use them
- Surface suspicious parameters
- Build a local tracker intelligence database

Example:

```
Unknown Parameters

mstk
Seen: 47 times

csuir
Seen: 22 times

fr2
Seen: 18 times
```

---

### 🔎 v2.2 — URL Inspector

Analyze the current URL and explain exactly what Clean Links is doing.

Example:

```
KEEP
✓ q
✓ p
✓ udm

REMOVE
✖ sourceid
✖ fbclid

UNKNOWN
? xyz_123
```

Planned features:

- Current URL analysis
- Parameter explanations
- Removal reasoning
- Unknown parameter identification

---

### ⚙️ v2.3 — Custom Rules

Planned features:

- Add custom parameters
- Remove custom parameters
- Domain-specific rules
- Import/export rule sets
- Local configuration backups

### ⚡ v2.4 — Performance & Architecture

As Clean Links grows, performance becomes increasingly important.

Rather than changing programming languages, the focus will be on improving architecture and reducing unnecessary work.

Planned improvements:

- Process only newly-added links instead of rescanning entire pages
- Avoid reprocessing previously cleaned URLs
- Smarter MutationObserver filtering
- Reduce unnecessary DOM operations
- Improve handling of large, dynamic websites
- Optimize tracker discovery storage and lookups

Research areas:

- DeclarativeNetRequest integration where appropriate
- Browser-native optimizations
- More efficient rule matching
- Lower memory usage on long browsing sessions

Goal:

Keep Clean Links lightweight, responsive, and scalable while supporting a growing tracker intelligence database.

---

### 🌍 Future Goals

- Better support for search engines
- Better support for e-commerce websites
- Improved referral tracking detection
- Community-driven rule contributions
- Smarter tracker discovery heuristics
- Stronger privacy protections while preserving functionality

---

### 🚫 What Clean Links Will Not Do

Clean Links aims to preserve functionality while improving privacy.

It will not:

- Blindly remove unknown parameters
- Break website functionality
- Remove authentication tokens
- Remove parameters required for navigation

The guiding principle remains:

> Keep what describes the user's intent.
>
> Remove what describes the website's observation.

---

## 🐉 Tracker Codex

### Google

- source
- sourceid
- sxsrf
- sca_esv
- ei
- iflsig
- ved
- gs_lp
- gs_psrp
- gs_lcrp
- sclient
- oq
- fbs
- sa
- mtid
- ntc
- aep
- mstk
- csuir
- oi
- noiga
- ct
- stick

### Yahoo

- fr
- fr2
- mkr
- fp

### Amazon

- ref
- ref_

### Flipkart

- pid
- lid
- marketplace

### YouTube

- si

### Universal

- utm_*
- fbclid
- gclid
- msclkid

---

## 📜 License

MIT License

---

## 🐉 Project History

### v1.0

- Basic URL cleanup

### v1.3

- Statistics dashboard
- Toolbar badge counter

### v1.5

- Pre-click protection

### v2.0 — Dragon Slayer Edition

- Click interception
- SPA protection
- Dynamic link monitoring

### v2.0.3 — Intelligence Update

Added support for:

- Google AI Mode
- Google Doodles
- Yahoo Search
- Amazon referral cleanup
- Flipkart tracking cleanup

Expanded tracker codex and laid the groundwork for Tracker Discovery Mode.

---

Made with ☕, curiosity, and a healthy dislike of unnecessary URL tracking.
