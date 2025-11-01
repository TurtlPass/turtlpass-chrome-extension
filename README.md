<p align="center">
  <img src="https://raw.githubusercontent.com/TurtlPass/turtlpass-firmware-arduino/master/assets/icon.png" alt="Logo" width="133"/>
</p>

<h2 align="center">🔗 TurtlPass Ecosystem</h2>

<p align="center">
  🐢 <a href="https://github.com/TurtlPass/turtlpass-firmware-arduino"><b>Firmware</b></a> •
  💾 <a href="https://github.com/TurtlPass/turtlpass-protobuf"><b>Protobuf</b></a> •
  💻 <a href="https://github.com/TurtlPass/turtlpass-python"><b>Host</b></a> •
  🌐 <a href="https://github.com/TurtlPass/turtlpass-chrome-extension"><b>Chrome</b></a> •
  📱 <a href="https://github.com/TurtlPass/turtlpass-android"><b>Android</b></a>
</p>

---

# 🌐 TurtlPass Chrome Extension

[![](https://img.shields.io/github/v/release/TurtlPass/turtlpass-chrome-extension?color=green&label=Release&logo=googlechrome)](https://github.com/TurtlPass/turtlpass-chrome-extension/releases/latest "GitHub Release")
[![](https://img.shields.io/badge/manifest-v3-green?logo=googlechrome)](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3 "Manifest V3")
[![](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT "License: MIT")
[![](https://img.shields.io/badge/Documentation-green?label=GitBook&logo=gitbook)](https://ryanamaral.gitbook.io/turtlpass "GitBook Documentation")

A secure, hardware-backed password generator that connects your browser to the TurtlPass USB device via Web Serial & Protobuf.
Passwords are generated on-device, and when you press the physical button, the device emulates a keyboard and types your password — safely and locally, without ever exposing it online.

---

## ⚡ Features

* 🔒 Hardware-assisted password generation
* 🧩 Communicates with the device via Protobuf
* 🌐 Auto-detects the active **Domain**
* 💾 Remembers your **Account ID**
* ⌨️ One-button password typing (no clipboard needed)
* 👁 Press `Ctrl` to reveal/hide your password

---

## 🧠 Architecture Overview

The Chrome Extension handles hashing and serialization, while the MCU validates input, generates the password using a KDF, and types it directly via USB keyboard emulation.

```
+--------------------------+     Protobuf over USB     +------------------+
|     Chrome Extension     |  <--------------------->  | TurtlPass Device |
|--------------------------|                           |------------------|
| Hash(Argon2ID + SHA-512) |    Serialized Commands:   |     Generate     |
|            of            |   → genPassword(hash) →   |     Password     |
| Domain + AccountID + PIN |    ← isSuccess(bool) ←    |      (KDF)       |
+--------------------------+                           +------------------+
             |                                                   |
             └──────────< Types password via HID keyboard <──────┘
```

---

## 📦 Installation

1. [Download](https://github.com/TurtlPass/turtlpass-chrome-extension/archive/refs/tags/3.0.0.zip) and unzip this repository
2. Go to Chrome Extensions: `chrome://extensions`
3. Enable **Developer mode**
4. Click **Load Unpacked** → select the unzipped folder
5. Done! 🚀

---

## 🚀 Usage

<img src="assets/how-to.gif" width="512px">

1. Open a login page (e.g., [GitHub Login](https://github.com/login))
2. Click the **TurtlPass icon** — the domain auto-fills
3. Enter your `Account ID` (auto-saved next time)
4. Click **Get Password** and enter your 6-digit PIN
5. Choose your **TurtlPass device** → click **Connect**
6. Press the **device button** — it types your password securely in the focused input field

---

## 🌐 Supported Browsers

|    Browser    |    Status   |
| :-----------: | :---------: |
| [Google Chrome](https://www.google.com/chrome) | ✅ Supported |
| [Gener8](https://gener8ads.com/products/browser) | ✅ Supported |

**Not supported:** Firefox, Brave, Opera, Safari, Arc

---

## 🧰 Troubleshooting

If the extension cannot connect to the device:

```text
chrome://flags/#enable-experimental-web-platform-features
```

Enable the **Web Serial API** feature.

---

## 📚 Dependencies

* [Web Serial API](https://web.dev/serial/) – USB device communication
* [Protocol Buffers](https://developers.google.com/protocol-buffers) – Message serialization
* [Argon2 Browser](https://github.com/antelle/argon2-browser) – Password hashing
* [SHA-512 JS](http://pajhome.org.uk/crypt/) – Entropy mixing
* [Lottie Web](https://github.com/airbnb/lottie-web) – Animations
* [Material Components for Web](https://github.com/material-components/material-components-web) – UI styling

---

## 📜 License

This repository is licensed under the [MIT License](./LICENSE).
