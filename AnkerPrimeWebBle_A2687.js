const connectButton = document.getElementById('connectButton'), resetButton = document.getElementById('resetButton'), logDiv = document.getElementById('log');
        const statusMac = document.getElementById('statusMac'), statusSerial = document.getElementById('statusSerial'), statusVersion = document.getElementById('statusVersion');
        const statusTotalOutput = document.getElementById('statusTotalOutput');
        const totalPowerArc = document.getElementById('totalPowerArc'), totalPowerUnit = document.getElementById('totalPowerUnit');
        const statusUsbC1Mode = document.getElementById('statusUsbC1Mode'), statusUsbC1Voltage = document.getElementById('statusUsbC1Voltage'), statusUsbC1Power = document.getElementById('statusUsbC1Power'), statusUsbC1Current = document.getElementById('statusUsbC1Current'), statusUsbC1Cable = document.getElementById('statusUsbC1Cable'), statusUsbC1ChargingInfo = document.getElementById('statusUsbC1ChargingInfo');
        const statusUsbC2Mode = document.getElementById('statusUsbC2Mode'), statusUsbC2Voltage = document.getElementById('statusUsbC2Voltage'), statusUsbC2Power = document.getElementById('statusUsbC2Power'), statusUsbC2Current = document.getElementById('statusUsbC2Current'), statusUsbC2Cable = document.getElementById('statusUsbC2Cable'), statusUsbC2ChargingInfo = document.getElementById('statusUsbC2ChargingInfo');
        const statusUsbAMode = document.getElementById('statusUsbAMode'), statusUsbAVoltage = document.getElementById('statusUsbAVoltage'), statusUsbAPower = document.getElementById('statusUsbAPower'), statusUsbACurrent = document.getElementById('statusUsbACurrent'), statusUsbACable = document.getElementById('statusUsbACable'), statusUsbAChargingInfo = document.getElementById('statusUsbAChargingInfo');
        const chargerRawStatus = document.getElementById('chargerRawStatus');        const chargerBaseLiveImage = document.getElementById('charger-base-live');
        const overlayLiveC1Image = document.getElementById('overlay-live-c1');
        const overlayLiveC2Image = document.getElementById('overlay-live-c2');
        const overlayLiveC3Image = document.getElementById('overlay-live-c3');
        const cableOverlayGroups = {
            C1: [overlayLiveC1Image].filter(Boolean),
            C2: [overlayLiveC2Image].filter(Boolean),
            C3: [overlayLiveC3Image].filter(Boolean),
        };
        const DEFAULT_A17A5_UI_DATA = {
            images: {
                chargerBaseLive: 'img/imgl_device_a2687_black_normal.png',
                cableOverlays: {
                    C1: 'img/imgl_usb_a2687_black_normal_c1.png',
                    C2: 'img/imgl_usb_a2687_black_normal_c2.png',
                    C3: 'img/imgl_usb_a2687_black_normal_c3.png',
                },
            },
            cableProfiles: {
                '0100': {
                    cableLabel: '5A-100W MAX',
                    chargingInfo: null,
                    maxPowerW: 100,
                    protocolToggles: { scp: 0, ufcs: 0, pps11v: 1, pps16v: 0, pps20v: 0, pd12v: 0, huawei: 0, xiaomi: 0 },
                },
                '0200': {
                    cableLabel: 'EPR-240W MAX',
                    chargingInfo: null,
                    maxPowerW: 240,
                    protocolToggles: { scp: 1, ufcs: 1, pps11v: 1, pps16v: 1, pps20v: 1, pd12v: 0, huawei: 0, xiaomi: 0 },
                },
                '0201': {
                    cableLabel: 'EPR-240W MAX',
                    chargingInfo: 'Apple PD Fast Charging',
                    maxPowerW: 240,
                    protocolToggles: { scp: 1, ufcs: 1, pps11v: 1, pps16v: 1, pps20v: 1, pd12v: 0, huawei: 0, xiaomi: 0 },
                },
            },
        };
        const A17A5_UI_DATA = (typeof window !== 'undefined' && window.A17A5_UI_DATA) ? window.A17A5_UI_DATA : DEFAULT_A17A5_UI_DATA;

        function applyA17A5UiAssets() {
            const images = (A17A5_UI_DATA && A17A5_UI_DATA.images) ? A17A5_UI_DATA.images : {};
            const overlays = images.cableOverlays || {};
            if (chargerBaseLiveImage && images.chargerBaseLive) chargerBaseLiveImage.src = images.chargerBaseLive;
            if (overlayLiveC1Image && overlays.C1) overlayLiveC1Image.src = overlays.C1;
            if (overlayLiveC2Image && overlays.C2) overlayLiveC2Image.src = overlays.C2;
            if (overlayLiveC3Image && overlays.C3) overlayLiveC3Image.src = overlays.C3;
        }

        applyA17A5UiAssets();
        let activePollingProfile = 'none';

        let device, server, writeCharacteristic, notifyCharacteristic, resolveNextNotificationPromise, activeKey, activeIv, cryptoState = 'INACTIVE', deviceInfo = {}, sessionUtcTimestampBytes = null, currentTransactionWrapper = null;
        let activeCryptoMode = 'AES-CBC';
        let activeAad = null;
        let gattWriteChain = Promise.resolve();
        let pollTimers = [];
        let lastLegacySnapshotText = '';

        const initialPowerStatus = { temperature: null, batteryLevel: null, totalInputPower: null, totalOutputPower: null, portC1: { mode: 'N/A', voltage: 'N/A', power: 'N/A', current: 'N/A', cable: 'N/A', chargingInfo: 'N/A', cableCode: null }, portC2: { mode: 'N/A', voltage: 'N/A', power: 'N/A', current: 'N/A', cable: 'N/A', chargingInfo: 'N/A', cableCode: null }, portA: { mode: 'N/A', voltage: 'N/A', power: 'N/A', current: 'N/A', cable: 'N/A', chargingInfo: 'N/A', cableCode: null } };
        let powerStatus = JSON.parse(JSON.stringify(initialPowerStatus));

        const A2_STATIC_VALUE_HEX = '32633337376466613039636462373932343838396534323932613337663631633863356564353264';
        const CRYPTO_MODE_CBC = 'AES-CBC';
        const CRYPTO_MODE_GCM = 'AES-GCM';
        const A17A5_USE_APP_SEQUENCE = true;
        const A17A5_GCM_AAD_HEX = '3322110077665544bbaa9988ffeeddcc';
        const A17A5_INITIAL_KEY_HEX = 'b8ff7422955d4eb6d554a2c470280559';
        const A17A5_INITIAL_IV_HEX = '6ba3e3f2f3a60f2971ce5d1f';
        const A17A5_SESSION_KEY_HEX = 'c0779a39bfa7b290ba9cd3d96b6fdc22';
        const A17A5_SESSION_IV_HEX = 'a1f6a9746d4fc81e942c3d95';
        const A17A5_CMD_0021_A1_HEX = '29154a2a892aa58615c7a6d113564f74638f39cca3338ec53b05b586c04b5be3c0ca50d063b3c19516d79aed71896e47644da29be288c768f5a532d13e67840f';
        const A17A5_CMD_0022_A3_HEX = '04808fffff';
        const A17A5_CMD_0022_A5_ASCII = 'CST-8';
        const A17A5_CMD_0027_A2_HEX = '62303932663861346533663832363864376230646339643564336538643062396431306465646264';
        const A17A5_CMD_020A_A2_HEX = '045553';
        const A17A5_CMD_020A_A3_HEX = '0462303932663861346533663832363864376230646339643564336538643062396431306465646264';
        const INITIAL_ENCRYPTION_KEY_HEX = A2_STATIC_VALUE_HEX.substring(0, 32);
        const ADVERTISED_SERVICE_UUID = 0xff09, FULL_SERVICE_UUID = '8c850001-0302-41c5-b46e-cf057c562025', WRITE_CHARACTERISTIC_UUID = '8c850002-0302-41c5-b46e-cf057c562025', NOTIFY_CHARACTERISTIC_UUID = '8c850003-0302-41c5-b46e-cf057c562025';
        const MAX_LOG_ENTRIES = 500;
        const LEGACY_STATUS_INTERVAL_MS = 12000;
        const LEGACY_REALTIME_INTERVAL_MS = 6000;
        const NOTIFICATION_TIMEOUT_MS = 6000;
        const TOTAL_POWER_GAUGE_MAX_W = 250;
        const TOTAL_POWER_ARC_MAX_LENGTH = 175.93;
        const TOTAL_POWER_CIRCUMFERENCE = 263.89;
        const LEGACY_0840_FIELD_NAMES = {
            0xA1: 'state_code',
            0xA2: 'serial_or_identifier',
            0xA3: 'reserved_blob',
            0xA4: 'product_code',
            0xA5: 'setting_a5',
            0xA6: 'setting_a6',
            0xA7: 'setting_a7',
            0xA8: 'setting_a8',
            0xA9: 'setting_a9',
            0xAA: 'setting_aa',
            0xAB: 'setting_ab',
            0xAC: 'setting_ac',
            0xAD: 'setting_ad',
            0xAE: 'setting_ae',
            0xAF: 'setting_af',
            0xB0: 'setting_b0',
            0xB1: 'setting_b1',
            0xB2: 'setting_b2',
            0xB3: 'setting_b3',
            0xB4: 'setting_b4',
            0xB5: 'setting_b5',
            0xB6: 'setting_b6',
            0xB7: 'setting_b7',
            0xB8: 'setting_b8',
            0xD0: 'port_config_0',
            0xD1: 'port_config_1',
            0xFD: 'firmware_tag',
        };

        const toHexString = bytes => Array.from(bytes).map(b => b.toString(16).toUpperCase().padStart(2, '0')).join('');
        const hexToBytes = hex => new Uint8Array(hex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
        const asciiToBytes = str => new TextEncoder().encode(str);
        const bytesToAscii = bytes => new TextDecoder().decode(bytes, { ignoreBOM: true }).replace(/[\u0000-\u001F\u007F-\u009F]/g, ".");
        const calculateChecksum = data => data.reduce((checksum, byte) => checksum ^ byte, 0);
        const delay = ms => new Promise(res => setTimeout(res, ms));
        const _hex2 = (value) => value.toString(16).toUpperCase().padStart(2, '0');
        const _hex4 = (value) => value.toString(16).toUpperCase().padStart(4, '0');
        const _resetPortMetrics = (portStatus) => {
            portStatus.voltage = 'N/A';
            portStatus.current = 'N/A';
            portStatus.power = 'N/A';
        };

        function updateChargerRawStatus(lines) {
            const text = lines.join('\n');
            if (text === lastLegacySnapshotText) return;
            lastLegacySnapshotText = text;
            chargerRawStatus.textContent = text;
        }

        function limitLogEntries() { while (logDiv.children.length > MAX_LOG_ENTRIES) { logDiv.removeChild(logDiv.firstChild); } }
        function buildTlvBuffer(tlvArray) { let totalLength = 0; tlvArray.forEach(item => totalLength += 2 + item.value.length); const buffer = new Uint8Array(totalLength); let offset = 0; tlvArray.forEach(item => { buffer[offset++] = item.type; buffer[offset++] = item.value.length; buffer.set(item.value, offset); offset += item.value.length; }); return buffer; }

        function buildRequestContent(command, tlvArray, group = 0x01) {
            const commandHigh = (command >> 8) & 0xFF;
            const commandLow = command & 0xFF;
            const commandHeader = new Uint8Array([0x03, 0x00, group, commandHigh]);
            const commandCode = new Uint8Array([commandLow]);
            const tlvData = buildTlvBuffer(tlvArray);
            const payload = new Uint8Array(commandHeader.length + commandCode.length + tlvData.length);
            payload.set(commandHeader, 0);
            payload.set(commandCode, commandHeader.length);
            payload.set(tlvData, commandHeader.length + commandCode.length);
            return payload;
        }

        function _u32le(value) {
            const b = new Uint8Array(4);
            new DataView(b.buffer).setUint32(0, value >>> 0, true);
            return b;
        }

        function _epochTimestampBytes(offsetSec = 0) {
            return _u32le(Math.floor(Date.now() / 1000) + (offsetSec | 0));
        }

        function buildA17A5StatusProbeTlv() {
            return [
                { type: 0xA1, value: new Uint8Array([0x21]) },
                { type: 0xFE, value: _epochTimestampBytes(0) },
            ];
        }

        function buildA17A5RealtimeProbeTlv() {
            return [
                { type: 0xA1, value: new Uint8Array([0x21]) },
                { type: 0xA2, value: hexToBytes(A17A5_CMD_020A_A2_HEX) },
                { type: 0xA3, value: hexToBytes(A17A5_CMD_020A_A3_HEX) },
                { type: 0xA5, value: new Uint8Array([0x01, 0x01]) },
                { type: 0xFE, value: _epochTimestampBytes(0) },
            ];
        }

        async function sendA17A5StatusProbe(expectsResponse = false) {
            if (!writeCharacteristic || cryptoState !== 'Session') return;
            if (expectsResponse) {
                await sendEncryptedCommandExpectingNotification(0x0F, 0x0200, buildA17A5StatusProbeTlv(), 6000);
                return;
            }
            await sendEncryptedCommand(0x0F, 0x0200, buildA17A5StatusProbeTlv(), false);
        }

        async function sendA17A5RealtimeProbe(expectsResponse = false) {
            if (!writeCharacteristic || cryptoState !== 'Session') return;
            if (expectsResponse) {
                await sendEncryptedCommandExpectingNotification(0x0F, 0x020A, buildA17A5RealtimeProbeTlv(), 6000);
                return;
            }
            await sendEncryptedCommand(0x0F, 0x020A, buildA17A5RealtimeProbeTlv(), false);
        }

        async function applyA17A5SessionCrypto(parentElement = null) {
            await setupCrypto(
                hexToBytes(A17A5_SESSION_KEY_HEX),
                hexToBytes(A17A5_SESSION_IV_HEX),
                'Session',
                { mode: CRYPTO_MODE_GCM, aad: hexToBytes(A17A5_GCM_AAD_HEX) },
            );
            log('[INFO] Applied A17A5 session key/nonce profile', 'success', null, parentElement);
        }

        async function tryProcessA17A5SessionHandshake(payload, parentElement = null) {
            const offset = (payload.length > 0 && payload[0] === 0x00) ? 1 : 0;
            for (const { type, value } of _parseTlvGenerator(payload, offset)) {
                if (type === 0xA1 && value.length === 64) {
                    log('[INFO] A17A5 0x0021 session material received; switching to app session crypto.', 'success', null, parentElement);
                    await applyA17A5SessionCrypto(parentElement);
                    return true;
                }
            }
            return false;
        }

        async function performA17A5AppConnectSequence() {
            log('--- Starting A17A5 app-compatible AES-GCM sequence ---', 'warn');
            const gcmAad = hexToBytes(A17A5_GCM_AAD_HEX);

            await setupCrypto(
                hexToBytes(A17A5_INITIAL_KEY_HEX),
                hexToBytes(A17A5_INITIAL_IV_HEX),
                'Initial',
                { mode: CRYPTO_MODE_GCM, aad: gcmAad },
            );

            sessionUtcTimestampBytes = _epochTimestampBytes(0);
            const hsTs1 = sessionUtcTimestampBytes;
            await sendEncryptedCommandExpectingNotification(0x01, 0x0001, [{ type: 0xA1, value: hsTs1 }], 6000);
            await delay(100);
            await sendEncryptedCommandExpectingNotification(0x01, 0x0003, [
                { type: 0xA1, value: hsTs1 },
                { type: 0xA3, value: new Uint8Array([0x20]) },
                { type: 0xA4, value: new Uint8Array([0x00, 0xF0]) },
            ], 6000);
            await delay(100);

            const infoResponsePayload = await sendEncryptedCommandExpectingNotification(0x01, 0x0029, [{ type: 0xA1, value: hsTs1 }], 6000);
            extractHandshakeInfo(infoResponsePayload);
            await delay(100);

            const hsTs2 = _epochTimestampBytes(0);
            await sendEncryptedCommandExpectingNotification(0x01, 0x0005, [
                { type: 0xA1, value: hsTs2 },
                { type: 0xA3, value: new Uint8Array([0x20]) },
                { type: 0xA4, value: new Uint8Array([0x29, 0x01]) },
                { type: 0xA5, value: new Uint8Array([0x44]) },
                { type: 0xA6, value: new Uint8Array([0x02]) },
            ], 6000);
            await delay(120);

            const sessionResp = await sendEncryptedCommandExpectingNotification(0x01, 0x0021, [
                { type: 0xA1, value: hexToBytes(A17A5_CMD_0021_A1_HEX) },
            ], 6000);
            if (cryptoState !== 'Session') {
                const switched = await tryProcessA17A5SessionHandshake(sessionResp, currentTransactionWrapper);
                if (!switched) {
                    await applyA17A5SessionCrypto(currentTransactionWrapper);
                }
            }
            await delay(120);

            // Some firmware builds do not ACK 0x0022/0x0027 reliably; send without blocking on response.
            await sendEncryptedCommand(0x01, 0x0022, [
                { type: 0xA1, value: _epochTimestampBytes(0) },
                { type: 0xA3, value: hexToBytes(A17A5_CMD_0022_A3_HEX) },
                { type: 0xA5, value: asciiToBytes(A17A5_CMD_0022_A5_ASCII) },
            ], false);
            await delay(120);

            await sendEncryptedCommand(0x01, 0x0027, [
                { type: 0xA1, value: _epochTimestampBytes(0) },
                { type: 0xA2, value: hexToBytes(A17A5_CMD_0027_A2_HEX) },
            ], false);
            await delay(120);

            await sendA17A5StatusProbe(false);
            await delay(120);
            await sendA17A5RealtimeProbe(false);
            log('A17A5 app-compatible command sequence finished.', 'success');
            return true;
        }

        function startA17A5AppPolling() {
            stopPolling();
            activePollingProfile = 'a17a5';
            sendA17A5RealtimeProbe(false).catch((e) => log(`A17A5 realtime warmup error: ${e.message}`, 'error'));
            sendA17A5StatusProbe(false).catch((e) => log(`A17A5 status warmup error: ${e.message}`, 'error'));
            pollTimers.push(setInterval(() => {
                sendA17A5RealtimeProbe(false).catch((e) => log(`A17A5 realtime poll error: ${e.message}`, 'error'));
            }, LEGACY_REALTIME_INTERVAL_MS));
            pollTimers.push(setInterval(() => {
                sendA17A5StatusProbe(false).catch((e) => log(`A17A5 status poll error: ${e.message}`, 'error'));
            }, LEGACY_STATUS_INTERVAL_MS));
            log('Telemetry polling started (A17A5 app mode: 020A + 0200).', 'info');
        }

        function stopPolling() {
            for (const id of pollTimers) clearInterval(id);
            pollTimers = [];
            activePollingProfile = 'none';
        }

        function log(message, type = 'info', payload = null, parentElement = null) {
            const isScrolledToBottom = logDiv.scrollHeight - logDiv.clientHeight <= logDiv.scrollTop + 5;
            const entry = document.createElement('div');
            entry.innerHTML = `<strong>[${new Date().toLocaleTimeString('en-US', { hour12: false })}]</strong> ${message}`;
            entry.className = `log-entry ${type}`;
            if (payload) { const payloadDiv = document.createElement('div'); payloadDiv.className = 'payload'; payloadDiv.innerText = payload; entry.appendChild(payloadDiv); }
            const target = parentElement || (type === 'sent' || type === 'received' ? null : currentTransactionWrapper) || logDiv;
            target.appendChild(entry);
            if (target === logDiv) { limitLogEntries(); }
            if (isScrolledToBottom) { logDiv.scrollTop = logDiv.scrollHeight; }
        }

        const metricNumberFromText = (valueText) => {
            if (typeof valueText !== 'string') return NaN;
            const match = valueText.match(/-?\d+(?:[.,]\d+)?/);
            if (!match) return NaN;
            const numeric = parseFloat(match[0].replace(',', '.'));
            return Number.isFinite(numeric) ? numeric : NaN;
        };

        const isPortOverlayActive = (portStatus) => {
            if (!portStatus) return false;
            const mode = String(portStatus.mode || '').toLowerCase();
            if (mode === 'output' || mode === 'input') return true;

            const powerW = metricNumberFromText(portStatus.power);
            if (Number.isFinite(powerW) && powerW > 0.2) return true;

            const currentA = metricNumberFromText(portStatus.current);
            const voltageV = metricNumberFromText(portStatus.voltage);
            if (Number.isFinite(currentA) && Number.isFinite(voltageV)) {
                return currentA > 0.02 && voltageV > 3.0;
            }
            return false;
        };

        const readA17A5CableCode = (decodedSetting) => {
            if (!decodedSetting || decodedSetting.type !== 0x04 || !decodedSetting.payload || decodedSetting.payload.length < 2) return null;
            const payload = decodedSetting.payload;
            return `${_hex2(payload[payload.length - 2])}${_hex2(payload[payload.length - 1])}`;
        };

        const A17A5_CABLE_CODE_PROFILES = (A17A5_UI_DATA && A17A5_UI_DATA.cableProfiles) ? A17A5_UI_DATA.cableProfiles : {};

        const a17a5CableProfileFromCode = (code) => {
            if (!code) return null;
            return A17A5_CABLE_CODE_PROFILES[code] || null;
        };

        const a17a5CableLabelFromCode = (code) => {
            const profile = a17a5CableProfileFromCode(code);
            return profile ? profile.cableLabel : null;
        };

        const a17a5ChargingInfoFromCode = (code) => {
            const profile = a17a5CableProfileFromCode(code);
            return profile ? profile.chargingInfo : null;
        };

        const formatA17A5CableText = (code, isConnected) => {
            if (!code) return isConnected ? 'Connected' : 'N/A';
            if (code === '0300') return 'N/A';
            const mappedLabel = a17a5CableLabelFromCode(code);
            if (mappedLabel) return mappedLabel;
            return `UNKNOW (${code})`;
        };

        const formatA17A5ChargingInfoText = (code, isConnected) => {
            if (!isConnected) return 'N/A';
            const chargingInfo = a17a5ChargingInfoFromCode(code);
            return chargingInfo || 'N/A';
        };

        const applyA17A5CableToPort = (portStatus, decodedSetting) => {
            if (!portStatus) return;
            const connected = isPortOverlayActive(portStatus);
            const code = readA17A5CableCode(decodedSetting);
            portStatus.cableCode = code;
            portStatus.cable = formatA17A5CableText(code, connected);
            portStatus.chargingInfo = formatA17A5ChargingInfoText(code, connected);
        };

        function setOverlayActive(element, isActive) {
            if (!element) return;
            element.classList.toggle('is-active', Boolean(isActive));
        }

        function setOverlayGroupActive(elements, isActive) {
            if (!Array.isArray(elements)) return;
            elements.forEach((element) => setOverlayActive(element, isActive));
        }

        function updateCableOverlayDisplay() {
            setOverlayGroupActive(cableOverlayGroups.C1, isPortOverlayActive(powerStatus.portC1));
            setOverlayGroupActive(cableOverlayGroups.C2, isPortOverlayActive(powerStatus.portC2));
            setOverlayGroupActive(cableOverlayGroups.C3, isPortOverlayActive(powerStatus.portA));
        }

        function updateStatusDisplay() {
            const hasDisplayValue = (val) => val !== null && val !== undefined && String(val).trim() !== '' && String(val).trim().toUpperCase() !== 'N/A';
            const update = (el, val, inactiveText = 'N/A') => {
                const hasValue = hasDisplayValue(val);
                el.textContent = hasValue ? val : inactiveText;
                el.className = hasValue ? 'value' : 'value status-inactive';
            };
            const updateCable = (el, portStatus) => {
                const connected = isPortOverlayActive(portStatus);
                const cableText = (portStatus && hasDisplayValue(portStatus.cable)) ? portStatus.cable : (connected ? 'Connected' : 'N/A');
                const inactive = !hasDisplayValue(cableText) || /^N\/A\b/i.test(String(cableText).trim());
                el.textContent = cableText;
                el.className = inactive ? 'value status-inactive' : 'value';
            };

            update(statusMac, deviceInfo.macAddress, '-----');
            update(statusSerial, deviceInfo.serialNumber || deviceInfo.legacyIdentifier, '-----');
            update(statusVersion, deviceInfo.version || deviceInfo.firmwareTag, '-----');

            const totalOutputW = metricNumberFromText(powerStatus.totalOutputPower);
            if (Number.isFinite(totalOutputW)) {
                statusTotalOutput.textContent = totalOutputW.toFixed(1);
                statusTotalOutput.className = 'total-power-number';
                totalPowerUnit.textContent = 'W';
                const ratio = Math.max(0, Math.min(1, totalOutputW / TOTAL_POWER_GAUGE_MAX_W));
                const arcLen = ratio * TOTAL_POWER_ARC_MAX_LENGTH;
                totalPowerArc.style.strokeDasharray = `${arcLen} ${TOTAL_POWER_CIRCUMFERENCE}`;
            } else {
                statusTotalOutput.textContent = 'N/A';
                statusTotalOutput.className = 'total-power-number status-inactive';
                totalPowerUnit.textContent = '';
                totalPowerArc.style.strokeDasharray = `0 ${TOTAL_POWER_CIRCUMFERENCE}`;
            }

            update(statusUsbC1Mode, powerStatus.portC1.mode); update(statusUsbC1Voltage, powerStatus.portC1.voltage); update(statusUsbC1Power, powerStatus.portC1.power); update(statusUsbC1Current, powerStatus.portC1.current);
            update(statusUsbC2Mode, powerStatus.portC2.mode); update(statusUsbC2Voltage, powerStatus.portC2.voltage); update(statusUsbC2Power, powerStatus.portC2.power); update(statusUsbC2Current, powerStatus.portC2.current);
            update(statusUsbAMode, powerStatus.portA.mode); update(statusUsbAVoltage, powerStatus.portA.voltage); update(statusUsbAPower, powerStatus.portA.power); update(statusUsbACurrent, powerStatus.portA.current);
            updateCable(statusUsbC1Cable, powerStatus.portC1);
            updateCable(statusUsbC2Cable, powerStatus.portC2);
            updateCable(statusUsbACable, powerStatus.portA);
            update(statusUsbC1ChargingInfo, powerStatus.portC1.chargingInfo);
            update(statusUsbC2ChargingInfo, powerStatus.portC2.chargingInfo);
            update(statusUsbAChargingInfo, powerStatus.portA.chargingInfo);

            document.getElementById('portC1').className = powerStatus.portC1.mode === 'Off' ? 'port-card port-off' : 'port-card';
            document.getElementById('portC2').className = powerStatus.portC2.mode === 'Off' ? 'port-card port-off' : 'port-card';
            document.getElementById('portA').className = powerStatus.portA.mode === 'Off' ? 'port-card port-off' : 'port-card';
            updateCableOverlayDisplay();
        }

        async function setupCrypto(keyBytes, ivBytes, state, options = {}) {
            try {
                const mode = options.mode || CRYPTO_MODE_CBC;
                const aadBytes = options.aad || null;
                if (keyBytes.length !== 16) throw new Error(`Key length must be 16 bytes, got ${keyBytes.length}`);
                if (mode === CRYPTO_MODE_CBC && ivBytes.length !== 16) throw new Error(`IV length must be 16 bytes for AES-CBC, got ${ivBytes.length}`);
                if (mode === CRYPTO_MODE_GCM && ivBytes.length !== 12) throw new Error(`Nonce length must be 12 bytes for AES-GCM, got ${ivBytes.length}`);
                activeKey = await window.crypto.subtle.importKey("raw", keyBytes, { name: mode, length: 128 }, false, ["encrypt", "decrypt"]);
                activeIv = ivBytes;
                activeCryptoMode = mode;
                activeAad = aadBytes;
                deviceInfo.activeKeyHex = toHexString(keyBytes);
                deviceInfo.activeIvHex = toHexString(ivBytes);
                cryptoState = state;
                log(`Crypto context set to state "${state}" (${mode})`, 'success');
            } catch (error) {
                log(`ERROR during crypto initialization: ${error.message}`, 'error');
            }
            updateStatusDisplay();
        }
        async function encrypt(plainText) {
            if (!activeKey || !activeIv) throw new Error('Encryption context is not initialized');
            if (activeCryptoMode === CRYPTO_MODE_GCM) {
                if (!activeAad) throw new Error('AES-GCM requires AAD but activeAad is empty');
                const encrypted = await window.crypto.subtle.encrypt(
                    { name: CRYPTO_MODE_GCM, iv: activeIv, additionalData: activeAad, tagLength: 128 },
                    activeKey,
                    plainText,
                );
                return new Uint8Array(encrypted);
            }
            const encrypted = await window.crypto.subtle.encrypt({ name: CRYPTO_MODE_CBC, iv: activeIv }, activeKey, plainText);
            return new Uint8Array(encrypted);
        }

        async function decrypt(cipherText) {
            if (!activeKey || !activeIv) throw new Error('Decryption context is not initialized');
            if (activeCryptoMode === CRYPTO_MODE_GCM) {
                if (!activeAad) throw new Error('AES-GCM requires AAD but activeAad is empty');
                const decrypted = await window.crypto.subtle.decrypt(
                    { name: CRYPTO_MODE_GCM, iv: activeIv, additionalData: activeAad, tagLength: 128 },
                    activeKey,
                    cipherText,
                );
                return new Uint8Array(decrypted);
            }
            const decrypted = await window.crypto.subtle.decrypt({ name: CRYPTO_MODE_CBC, iv: activeIv }, activeKey, cipherText);
            return new Uint8Array(decrypted);
        }

        async function writeGattSerialized(packet) {
            if (!writeCharacteristic) throw new Error('No writable characteristic');
            const run = async () => {
                // Keep all writes strictly serialized to avoid:
                // "GATT operation already in progress."
                await writeCharacteristic.writeValueWithoutResponse(packet);
            };
            const task = gattWriteChain.then(run, run);
            gattWriteChain = task.catch(() => { });
            await task;
        }

        function waitForNextNotification(timeoutMs = NOTIFICATION_TIMEOUT_MS) {
            return new Promise((resolve, reject) => {
                if (resolveNextNotificationPromise) {
                    log('[WARN] Replacing pending notification waiter.', 'warn');
                }

                let handler = null;
                const timeoutId = setTimeout(() => {
                    if (resolveNextNotificationPromise === handler) {
                        resolveNextNotificationPromise = null;
                    }
                    reject(new Error(`Timed out waiting for device notification (${timeoutMs}ms)`));
                }, timeoutMs);

                handler = (payload) => {
                    clearTimeout(timeoutId);
                    if (resolveNextNotificationPromise === handler) {
                        resolveNextNotificationPromise = null;
                    }
                    resolve(payload);
                };

                resolveNextNotificationPromise = handler;
            });
        }

        async function sendPayloadExpectingNotification(payload, timeoutMs = NOTIFICATION_TIMEOUT_MS) {
            const responsePromise = waitForNextNotification(timeoutMs);
            await sendRawPayload(payload, true);
            return await responsePromise;
        }

        async function sendEncryptedCommandExpectingNotification(group, command, tlvArray, timeoutMs = NOTIFICATION_TIMEOUT_MS) {
            const responsePromise = waitForNextNotification(timeoutMs);
            await sendEncryptedCommand(group, command, tlvArray, true);
            return await responsePromise;
        }

        async function sendRawPayload(payload, expectsResponse = false) {
            if (!writeCharacteristic) return log('Cannot send: No connection', 'error');

            const commandHighByte = payload[3];
            const commandLowByte = payload[4];
            const isEncrypted = (commandHighByte & 0x40) !== 0;
            const fullCommand = ((commandHighByte & ~0x40) << 8) | commandLowByte;

            let flagDescriptions = [];
            if (isEncrypted) flagDescriptions.push("Encrypted (0x40)");
            if (flagDescriptions.length === 0) flagDescriptions.push("None");

            const logMessage = `--> SENDING Command: 0x${fullCommand.toString(16).toUpperCase().padStart(4, '0')}`;
            const logPayload = `Header: ${toHexString(payload.slice(0, 5))} (Group: ${payload[2]}, CmdByte1: 0x${commandHighByte.toString(16).toUpperCase().padStart(2, '0')})\nPayload: ${toHexString(payload.slice(5))}`;

            if (expectsResponse) {
                currentTransactionWrapper = document.createElement('div');
                currentTransactionWrapper.className = 'log-transaction';
                logDiv.appendChild(currentTransactionWrapper);
                limitLogEntries();
            }
            log(logMessage, 'sent', logPayload, currentTransactionWrapper);

            const totalPacketLength = payload.length + 5;
            const messageForChecksum = new Uint8Array(4 + payload.length);
            const view = new DataView(messageForChecksum.buffer);
            view.setUint8(0, 0xff);
            view.setUint8(1, 0x09);
            view.setUint16(2, totalPacketLength, true);
            messageForChecksum.set(payload, 4);
            const checksum = calculateChecksum(messageForChecksum);
            const finalMessage = new Uint8Array([...messageForChecksum, checksum]);
            console.log(`[RAW SEND] Final packet written to characteristic: ${toHexString(finalMessage)}`);
            await writeGattSerialized(finalMessage);
        }

        async function sendEncryptedCommand(group, command, tlvArray, expectsResponse) {
            if (cryptoState !== 'Initial' && cryptoState !== 'Session') {
                throw new Error("Encryption requested, but crypto context is not ready.");
            }
            const commandHigh = (command >> 8) & 0xFF;
            const commandLow = command & 0xFF;
            const finalCommandHigh = commandHigh | 0x40; // Add encryption flag

            const tlvForEncryption = buildTlvBuffer(tlvArray);
            const cipherText = await encrypt(tlvForEncryption);

            const commandHeader = new Uint8Array([0x03, 0x00, group, finalCommandHigh, commandLow]);
            const finalPayload = new Uint8Array(commandHeader.length + cipherText.length);
            finalPayload.set(commandHeader, 0);
            finalPayload.set(cipherText, commandHeader.length);

            await sendRawPayload(finalPayload, expectsResponse);
        }

        connectButton.addEventListener('click', async () => {
            log('Starting connection process...'); connectButton.disabled = true;
            try {
                device = await navigator.bluetooth.requestDevice({
                    filters: [
                        { services: [ADVERTISED_SERVICE_UUID] },
                        { namePrefix: 'ASHDJW' },
                    ],
                    optionalServices: [FULL_SERVICE_UUID],
                });
                log(`Device selected: ${device.name || 'Unknown'}`, 'success');
                device.addEventListener('gattserverdisconnected', onDisconnected);
                server = await device.gatt.connect();
                const service = await server.getPrimaryService(FULL_SERVICE_UUID);
                writeCharacteristic = await service.getCharacteristic(WRITE_CHARACTERISTIC_UUID);
                notifyCharacteristic = await service.getCharacteristic(NOTIFY_CHARACTERISTIC_UUID);
                await notifyCharacteristic.startNotifications();
                notifyCharacteristic.addEventListener('characteristicvaluechanged', handleNotifications);
                log('Connection successful. Starting A17A5 telemetry sequence', 'success');
                await delay(300);
                const appFlowSuccess = await performA17A5AppConnectSequence();
                if (!appFlowSuccess || cryptoState !== 'Session') {
                    throw new Error('A17A5 app sequence did not establish session crypto.');
                }
                await delay(300);
                startA17A5AppPolling();
                log('--- AUTOMATED SEQUENCE COMPLETE ---', 'success');
            } catch (error) { log(`SEQUENCE FAILED: ${error.message}`, 'error'); if (device && device.gatt.connected) { device.gatt.disconnect(); } else { fullReset(); } }
        });

        async function handleNotifications(event) {
            const rawData = new Uint8Array(event.target.value.buffer);
            const targetWrapper = resolveNextNotificationPromise ? currentTransactionWrapper : null;
            if (rawData.byteLength < 5) { log(`<-- RECEIVED (${rawData.byteLength} Bytes)`, 'received', `${toHexString(rawData)}`, targetWrapper); if (resolveNextNotificationPromise) resolveNextNotificationPromise(rawData); return; }
            const payloadWithHeader = rawData.slice(4, rawData.byteLength - 1);
            let isEncrypted = false, isAck = false, fullCommand = 0, commandHighByte = 0, flagDescriptions = ['None'];

            if (payloadWithHeader.length >= 5) {
                commandHighByte = payloadWithHeader[3];
                const commandLowByte = payloadWithHeader[4];
                isEncrypted = (commandHighByte & 0x40) !== 0;
                isAck = (commandHighByte & 0x08) !== 0;
                const commandHighNoFlags = commandHighByte & ~(0x40 | 0x08);
                fullCommand = (commandHighNoFlags << 8) | commandLowByte;
                flagDescriptions = [];
                if (isEncrypted) flagDescriptions.push("Encrypted (0x40)");
                if (isAck) flagDescriptions.push("ACK (0x08)");
                if (flagDescriptions.length === 0) flagDescriptions.push("None");
            }

            const logMessage = `<-- RECEIVED Command: 0x${fullCommand.toString(16).toUpperCase().padStart(4, '0')}`;
            const logPayload = `CmdByte1: 0x${commandHighByte.toString(16).toUpperCase().padStart(2, '0')} (${flagDescriptions.join(', ')})\nRaw Packet: ${toHexString(rawData)}`;
            log(logMessage, 'received', logPayload, targetWrapper);

            let contentToParse = payloadWithHeader;
            if (isEncrypted) {
                if (!activeKey) { log('[DECRYPTION_ERROR] No active key available', 'error', null, targetWrapper); if (resolveNextNotificationPromise) resolveNextNotificationPromise(rawData); return; }
                const cipherText = payloadWithHeader.slice(5);
                try {
                    const decryptedPayload = await decrypt(cipherText);
                    log('[SUCCESS] Packet decrypted', 'success', `Plaintext: ${toHexString(decryptedPayload)}`, targetWrapper);
                    contentToParse = decryptedPayload;
                    switch (fullCommand) {
                        case 0x0000:
                            parseSessionAckStatus(decryptedPayload);
                            break;
                        case 0x0021:
                            await tryProcessA17A5SessionHandshake(decryptedPayload, targetWrapper);
                            break;
                        case 0x0200:
                        case 0x0A00:
                            parseLegacyStatus0405(decryptedPayload);
                            parseLegacyRealtime0857(decryptedPayload, fullCommand);
                            break;
                        case 0x020A:
                        case 0x020B:
                        case 0x0207:
                        case 0x0206:
                        case 0x4300:
                        case 0x0300:
                        case 0x0303:
                        case 0x0410:
                            parseLegacyRealtime0857(decryptedPayload, fullCommand);
                            break;
                    }
                } catch (e) {
                    const msg = (e && e.message) ? e.message : String(e);
                    log('[DECRYPTION_ERROR] ' + msg, 'error', `Ciphertext: ${toHexString(cipherText)}`, targetWrapper);
                    if (resolveNextNotificationPromise) resolveNextNotificationPromise(rawData);
                    return;
                }
            } else {
                contentToParse = new Uint8Array();
                log('[INFO] Ignored unencrypted packet for A17A5-only mode', 'info', `Raw Packet: ${toHexString(rawData)}`, targetWrapper);
            }
            logTlvData(contentToParse, targetWrapper);
            if (resolveNextNotificationPromise) { resolveNextNotificationPromise(contentToParse); currentTransactionWrapper = null; }
        }

        function* _parseTlvGenerator(payload, offset) { let i = offset; while (i < payload.length - 1) { const type = payload[i], length = payload[i + 1]; if (i + 2 + length > payload.length) { log(`[TLV_ERROR] Type 0x${toHexString([type])} at index ${i} declares length ${length}, which exceeds packet boundaries`, 'error'); return; } const value = payload.slice(i + 2, i + 2 + length); yield { type, length, value }; i += 2 + length; } }

        function extractHandshakeInfo(payload) {
            log('[EXTRACT] Searching for handshake data (SN, FW, MAC)', 'info', null, currentTransactionWrapper);
            let offset = 0;
            if (payload.length > 0 && payload[0] === 0x00) {
                offset = 1;
            } else if (payload.length > 5 && payload[0] === 0x03 && payload[1] === 0x00) {
                offset = 6;
            }

            const normalizeAscii = (value) => bytesToAscii(value).replace(/\s+/g, ' ').trim();
            const looksLikeFirmware = (text) => /^v?\d+(?:\.\d+){1,5}$/i.test(text) || /^v\d/i.test(text);
            const looksLikeSerial = (text) => /^[A-Z0-9_-]{10,30}$/i.test(text) && !looksLikeFirmware(text);
            const looksLikeMacText = (text) => /^([0-9A-F]{2}[:-]){5}[0-9A-F]{2}$/i.test(text);
            const tryMacFromBytes = (value) => {
                if (!value || value.length < 6) return null;
                const b = Array.from(value.slice(0, 6));
                if (b.every((x) => x === 0)) return null;
                return b.map((x) => x.toString(16).toUpperCase().padStart(2, '0')).join(':');
            };

            for (const { type, value } of _parseTlvGenerator(payload, offset)) {
                const ascii = normalizeAscii(value);
                switch (type) {
                    case 0xA3:
                        if (looksLikeFirmware(ascii)) deviceInfo.version = ascii;
                        break;
                    case 0xA4:
                        if (looksLikeSerial(ascii)) deviceInfo.serialNumber = ascii;
                        break;
                    case 0xA5: {
                        const macFromA5 = tryMacFromBytes(value);
                        if (macFromA5) deviceInfo.macAddress = macFromA5;
                        break;
                    }
                }

                // Firmware update compatibility: fallback with content-based matching.
                if (!deviceInfo.version && looksLikeFirmware(ascii)) {
                    deviceInfo.version = ascii;
                }
                if (!deviceInfo.serialNumber && looksLikeSerial(ascii)) {
                    deviceInfo.serialNumber = ascii;
                }
                if (!deviceInfo.macAddress) {
                    if (looksLikeMacText(ascii)) {
                        deviceInfo.macAddress = ascii.replace(/-/g, ':').toUpperCase();
                    } else if (value.length >= 6 && (value[0] < 0x20 || value[0] > 0x7E || value[1] < 0x20 || value[1] > 0x7E)) {
                        const candidateMac = tryMacFromBytes(value);
                        if (candidateMac) deviceInfo.macAddress = candidateMac;
                    }
                }
            }
            updateStatusDisplay();
        }

        function readLegacyTypedValue(raw) {
            if (!raw || raw.length === 0) return { type: 0xFF };
            const typeByte = raw[0];
            const payload = raw.slice(1);
            const view = new DataView(payload.buffer, payload.byteOffset, payload.byteLength);
            const out = { type: typeByte, payload };

            if (typeByte === 0x00) {
                out.text = bytesToAscii(payload).replace(/\.+$/g, '');
            } else if (typeByte === 0x01 && payload.length >= 1) {
                out.u = view.getUint8(0);
                out.i = view.getInt8(0);
            } else if (typeByte === 0x02 && payload.length >= 2) {
                out.u = view.getUint16(0, true);
                out.i = view.getInt16(0, true);
            } else if (typeByte === 0x03 && payload.length >= 4) {
                out.u = view.getUint32(0, true);
                out.i = view.getInt32(0, true);
            }
            return out;
        }

        function legacyDecodedToString(decoded, raw) {
            if (!decoded) return toHexString(raw || new Uint8Array());
            if (typeof decoded.text === 'string' && decoded.text.length > 0) return decoded.text;
            if (typeof decoded.u === 'number' && typeof decoded.i === 'number' && decoded.u !== decoded.i) {
                return `${decoded.u} (signed ${decoded.i})`;
            }
            if (typeof decoded.u === 'number') return `${decoded.u}`;
            if (typeof decoded.i === 'number') return `${decoded.i}`;
            const hex = toHexString(raw || new Uint8Array());
            return hex.length > 64 ? `${hex.slice(0, 64)}...` : hex;
        }

        function parseSessionAckStatus(payload) {
            const offset = (payload.length > 0 && payload[0] === 0x00) ? 1 : 0;
            for (const { type, value } of _parseTlvGenerator(payload, offset)) {
                if (type !== 0xA1 || value.length < 1) continue;
                const decoded = readLegacyTypedValue(value);
                const stateCode = (typeof decoded.u === 'number') ? decoded.u : value[value.length - 1];
                log(`[INFO] Session ACK state: 0x${_hex2(stateCode)}`, 'info');
                return;
            }
        }

        function parseLegacyStatus0405(payload) {
            let infoChanged = false;
            const lines = [];
            const offset = (payload.length > 0 && payload[0] === 0x00) ? 1 : 0;
            lines.push(`Snapshot ${new Date().toLocaleTimeString('en-US', { hour12: false })}  cmd=0x0840/0x0405`);
            for (const { type, value } of _parseTlvGenerator(payload, offset)) {
                const decoded = readLegacyTypedValue(value);
                const keyName = LEGACY_0840_FIELD_NAMES[type] || `field_0x${_hex2(type)}`;
                lines.push(`0x${_hex2(type)} ${keyName}: ${legacyDecodedToString(decoded, value)}`);

                if (type === 0xA2 && decoded.text) {
                    if (!deviceInfo.legacyIdentifier || deviceInfo.legacyIdentifier !== decoded.text) {
                        deviceInfo.legacyIdentifier = decoded.text;
                        infoChanged = true;
                    }
                } else if (type === 0xA4 && decoded.text) {
                    if (!deviceInfo.productCode || deviceInfo.productCode !== decoded.text) {
                        deviceInfo.productCode = decoded.text;
                        infoChanged = true;
                    }
                } else if (type === 0xFD && decoded.text) {
                    if (!deviceInfo.firmwareTag || deviceInfo.firmwareTag !== decoded.text) {
                        deviceInfo.firmwareTag = decoded.text;
                        infoChanged = true;
                    }
                }
            }
            updateChargerRawStatus(lines);
            if (infoChanged) {
                updateStatusDisplay();
            }
        }

        function parseLegacyRealtime0857(payload, commandHint = null) {
            const fields = new Map();
            const offset = (payload.length > 0 && payload[0] === 0x00) ? 1 : 0;
            for (const { type, value } of _parseTlvGenerator(payload, offset)) {
                fields.set(type, readLegacyTypedValue(value));
            }
            const isStatusSnapshotCommand = commandHint === 0x0200 || commandHint === 0x0A00 || commandHint === 0x0040 || commandHint === 0x0405;
            const isLowConfidenceRealtimeCommand =
                commandHint === 0x0207 ||
                commandHint === 0x0206 ||
                commandHint === 0x020B ||
                commandHint === 0x0057 ||
                commandHint === 0x0300 ||
                commandHint === 0x0303 ||
                commandHint === 0x0410 ||
                commandHint === 0x0A0B ||
                commandHint === 0x0B03;

            // A17A5 app-mode stream (0x4300) packs per-port data in type 0x04 structs:
            // [status(1), voltage_mV(2), current_mA(2), power_cW(2)].
            const hasA17A5PortStruct =
                [0xA5, 0xA6, 0xA7].some((type) => {
                    const decoded = fields.get(type);
                    return !!decoded && decoded.type === 0x04 && decoded.payload && decoded.payload.length >= 7;
                });

            if (hasA17A5PortStruct) {
                const readPortStruct = (type) => {
                    const decoded = fields.get(type);
                    if (!decoded || decoded.type !== 0x04 || !decoded.payload || decoded.payload.length < 7) return null;
                    const p = decoded.payload;
                    const modeByte = p[0];
                    const voltageMv = p[1] | (p[2] << 8);
                    const currentMa = p[3] | (p[4] << 8);
                    const powerCentiW = p[5] | (p[6] << 8);
                    return {
                        modeByte,
                        voltageV: voltageMv / 1000.0,
                        currentA: currentMa / 1000.0,
                        powerW: powerCentiW / 100.0,
                    };
                };

                const applyPortStruct = (portStatus, type) => {
                    const port = readPortStruct(type);
                    if (!port) return 0;
                    portStatus.mode = port.modeByte === 0 ? 'Off' : 'Output';
                    portStatus.voltage = `${port.voltageV.toFixed(2)} V`;
                    portStatus.current = `${port.currentA.toFixed(3)} A`;
                    portStatus.power = `${port.powerW.toFixed(2)} W`;
                    return (port.modeByte === 0) ? 0 : port.powerW;
                };

                const newStatus = JSON.parse(JSON.stringify(powerStatus));
                let p1 = 0, p2 = 0, p3 = 0;
                if (!isStatusSnapshotCommand) {
                    p1 = applyPortStruct(newStatus.portC1, 0xA5);
                    p2 = applyPortStruct(newStatus.portC2, 0xA6);
                    p3 = applyPortStruct(newStatus.portA, 0xA7);
                    newStatus.totalOutputPower = `${(p1 + p2 + p3).toFixed(2)} W`;
                }
                applyA17A5CableToPort(newStatus.portC1, fields.get(0xAC));
                applyA17A5CableToPort(newStatus.portC2, fields.get(0xAD));
                applyA17A5CableToPort(newStatus.portA, fields.get(0xAE));

                const maybeLogCableCodeChange = (label, oldPort, nextPort) => {
                    const oldCode = oldPort ? oldPort.cableCode : null;
                    const nextCode = nextPort ? nextPort.cableCode : null;
                    if (oldCode === nextCode) return;
                    const nextLabel = a17a5CableLabelFromCode(nextCode);
                    const oldLabel = a17a5CableLabelFromCode(oldCode);
                    const oldDisplay = oldCode ? (oldLabel || `UNKNOW (${oldCode})`) : '--';
                    const nextDisplay = nextCode ? (nextLabel || `UNKNOW (${nextCode})`) : '--';
                    log(`[CABLE] ${label}: ${oldDisplay} -> ${nextDisplay}`, 'info');
                };
                maybeLogCableCodeChange('USB-C 1', powerStatus.portC1, newStatus.portC1);
                maybeLogCableCodeChange('USB-C 2', powerStatus.portC2, newStatus.portC2);
                maybeLogCableCodeChange('USB-C 3', powerStatus.portA, newStatus.portA);

                powerStatus = newStatus;
                updateStatusDisplay();
                return;
            }

            if (isStatusSnapshotCommand) {
                return;
            }

            const readNum = (type) => {
                const decoded = fields.get(type);
                if (!decoded) return null;
                if (typeof decoded.u === 'number') return decoded.u;
                if (typeof decoded.i === 'number') return decoded.i;
                return null;
            };

            const voltage1 = readNum(0xA2);
            const voltage2 = readNum(0xA3);
            const voltage3 = readNum(0xA4);
            const current1 = readNum(0xA5);
            const current2 = readNum(0xA6);
            const current3 = readNum(0xA7);
            const power1 = readNum(0xB0);
            const power2 = readNum(0xB1);
            const power3 = readNum(0xB2);
            const totalPower = readNum(0xA8);

            const applyPort = (portLabel, portStatus, previousPort, vRaw, cRaw, pRaw) => {
                if (vRaw === null && cRaw === null && pRaw === null) return;
                // ACK/keepalive packets may carry only a voltage flag (e.g. A2=0100).
                // Ignore these partial updates so they cannot flip mode to Off.
                if (cRaw === null && pRaw === null) return;
                const voltage = vRaw === null ? null : (vRaw / 10.0);
                const current = cRaw === null ? null : (cRaw / 10.0);
                const power = pRaw === null ? ((voltage !== null && current !== null) ? (voltage * current) : null) : pRaw;
                const nextMode = (power !== null && power > 0.2) ? 'Output' : 'Off';
                if (nextMode === 'Off' && isPortOverlayActive(previousPort) && isLowConfidenceRealtimeCommand) {
                    log(`[GUARD] Ignored transient Off on ${portLabel} from cmd=0x${_hex4(commandHint || 0)}`, 'info');
                    return;
                }
                portStatus.mode = nextMode;
                if (voltage !== null) portStatus.voltage = `${voltage.toFixed(2)} V`;
                if (current !== null) portStatus.current = `${current.toFixed(2)} A`;
                if (power !== null) portStatus.power = `${power.toFixed(2)} W`;
                if (nextMode === 'Off') _resetPortMetrics(portStatus);
            };

            const newStatus = JSON.parse(JSON.stringify(powerStatus));
            applyPort('USB-C 1', newStatus.portC1, powerStatus.portC1, voltage1, current1, power1);
            applyPort('USB-C 2', newStatus.portC2, powerStatus.portC2, voltage2, current2, power2);
            applyPort('USB-C 3', newStatus.portA, powerStatus.portA, voltage3, current3, power3);
            if (totalPower !== null) newStatus.totalOutputPower = `${totalPower.toFixed(2)} W`;

            powerStatus = newStatus;
            updateStatusDisplay();
        }

        function logTlvData(payload, parentElement) {
            // At this point unencrypted packets should already be raw[10:-1] TLV only.
            // Decrypted packets may still contain leading status byte 0x00.
            const offset = (payload.length > 0 && payload[0] === 0x00) ? 1 : 0;
            if (payload.length <= offset) return;
            if (offset === 1) log(`[INFO] Decrypted Status Code: 0x00`, 'success', null, parentElement);

            for (const { type, value, length } of _parseTlvGenerator(payload, offset)) {
                log(`[TLV] Type: 0x${toHexString([type])}, Length: ${length}`, 'info', `Hex: ${toHexString(value)}\nASCII: ${bytesToAscii(value)}`, parentElement);
                if (cryptoState === 'Initial' && activeCryptoMode === CRYPTO_MODE_CBC && type === 0xA1 && value.length === 16) {
                    log('[INFO] New session key received!', 'success', null, parentElement);
                    setupCrypto(value, asciiToBytes(deviceInfo.serialNumber).slice(0, 16), 'Session');
                }
            }
        }

        function onDisconnected() {
            log('Disconnected from device. Please reconnect', 'error');
            stopPolling();
            device = server = writeCharacteristic = notifyCharacteristic = null;
            resolveNextNotificationPromise = null;
            activeKey = activeIv = null;
            activeCryptoMode = CRYPTO_MODE_CBC;
            activeAad = null;
            cryptoState = 'INACTIVE';
            gattWriteChain = Promise.resolve();
            connectButton.disabled = false;
            currentTransactionWrapper = null;
            powerStatus = JSON.parse(JSON.stringify(initialPowerStatus));
            lastLegacySnapshotText = '';
            chargerRawStatus.textContent = 'No charger snapshot yet.';
            updateStatusDisplay();
        }
        function fullReset() { log('Performing full reset', 'warn'); if (device && device.gatt.connected) device.gatt.disconnect(); deviceInfo = {}; sessionUtcTimestampBytes = null; onDisconnected(); logDiv.innerHTML = ''; log('Log and all state data cleared'); updateStatusDisplay(); }
        resetButton.addEventListener('click', fullReset);
        updateStatusDisplay();
        log('Telemetry utility initialized. Please press "Connect & Start Telemetry" to start.');