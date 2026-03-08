# Anker Prime 160W (A2687) Web BLE Telemetry

<img width="2642" height="1782" alt="3a12df1485ee40d11616c0669f038e6b" src="https://github.com/user-attachments/assets/1868013a-8b48-4e2c-b127-e1dad08678e7" />




This is an AI-assisted Web Bluetooth telemetry project for the **Anker Prime 160W (A2687)**.

The implementation is based on prior BLE reverse-engineering work and public research from:
- [flip-dots/SolixBLE](https://github.com/flip-dots/SolixBLE)
- [atc1441/Anker_Prime_BLE_hacking](https://github.com/atc1441/Anker_Prime_BLE_hacking)

This project focuses on **telemetry only**. Control-related UI and logic were intentionally removed because they were not reliable enough for practical use.

## Status

- Supported target device: **Anker Prime 160W (A2687)**
- Current focus: **live telemetry over Web Bluetooth**
- Scope: **single-device support**, not a general compatibility layer for other Anker models

## Features

- Connect to the charger from a Chromium-based browser with Web Bluetooth support
- Read live per-port telemetry
- Display port status, voltage, current, power, cable type, and charging info
- Lightweight telemetry-only UI for daily monitoring and testing

## Known Cable IDs

At the moment, cable and charging labels are based only on observed real-device tests.

Confirmed cable IDs so far:
- `0200`
- `0201`
- `0100`

If you find additional cable IDs or charging info mappings, contributions are very welcome.

## Files

- `AnkerPrimeWebBle_A2687.html` — main Web UI
- `AnkerPrimeWebBle_A2687.js` — BLE handshake, polling, parsing, and UI updates
- `AnkerPrimeWebBle_A2687.data.js` — static UI data and known mappings

## Usage

1. Serve this folder from `https://` or `http://localhost`
2. Open `AnkerPrimeWebBle_A2687.html`
3. Click the connect button and select your A2687 device
4. Start telemetry monitoring

## Charger Appearance

If you want to change the charger appearance in the UI (for example US / EU / AU style), open the `img` folder and choose the matching variant image.

The main image file used by the page is:
- `img/imgl_device_a2687_black_normal.png`

Available variant images currently include:
- `img/imgl_device_a2687_black_normal_us.png`
- `img/imgl_device_a2687_black_normal_eu.png`
- `img/imgl_device_a2687_black_normal_au.png`
- `img/imgl_device_a2687_black_normal_en.png`

To switch the appearance, replace or rename your preferred variant so it becomes `img/imgl_device_a2687_black_normal.png`.

## Firmware Version Notes

This project is currently verified with the following version combination:
- Charger firmware shown in the Anker app: `v1.5.1.2`
- BLE / device version shown in the web page: `v0.0.5.0`

If your device reports different versions, it may still connect successfully, but telemetry data may be incomplete, incorrect, or fail to parse.

If that happens, check `A2687_Firmware_Update_Playbook.md` and try the troubleshooting steps there.

## Notes

- This is **not** an official Anker project.
- The project is currently optimized for the author's own A2687 unit.
- Unknown cable codes may still appear until more mappings are confirmed.

## Connection Behavior

The Anker app and this Web Bluetooth page cannot use the device at the same time.

In practice:
- If the app is connected to the charger, the web page may not be able to find the device at all.
- If the web page is connected to the charger, the app may fail to connect.

If scanning or connection fails, make sure the device is disconnected from the Anker app first, then try again in the browser.

## Thanks

Special thanks to the original research and reverse-engineering work that made this possible:
- [flip-dots/SolixBLE](https://github.com/flip-dots/SolixBLE)
- [atc1441/Anker_Prime_BLE_hacking](https://github.com/atc1441/Anker_Prime_BLE_hacking)



