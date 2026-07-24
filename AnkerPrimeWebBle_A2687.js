const connectButton = document.getElementById('connectButton'), resetButton = document.getElementById('resetButton'), logDiv = document.getElementById('log');
        const statusMac = document.getElementById('statusMac'), statusSerial = document.getElementById('statusSerial'), statusVersion = document.getElementById('statusVersion');
        const statusTotalOutput = document.getElementById('statusTotalOutput');
        const totalPowerArc = document.getElementById('totalPowerArc'), totalPowerUnit = document.getElementById('totalPowerUnit');
        const statusUsbC1Mode = document.getElementById('statusUsbC1Mode'), statusUsbC1Voltage = document.getElementById('statusUsbC1Voltage'), statusUsbC1Power = document.getElementById('statusUsbC1Power'), statusUsbC1Current = document.getElementById('statusUsbC1Current'), statusUsbC1Cable = document.getElementById('statusUsbC1Cable'), statusUsbC1ChargingInfo = document.getElementById('statusUsbC1ChargingInfo');
        const statusUsbC2Mode = document.getElementById('statusUsbC2Mode'), statusUsbC2Voltage = document.getElementById('statusUsbC2Voltage'), statusUsbC2Power = document.getElementById('statusUsbC2Power'), statusUsbC2Current = document.getElementById('statusUsbC2Current'), statusUsbC2Cable = document.getElementById('statusUsbC2Cable'), statusUsbC2ChargingInfo = document.getElementById('statusUsbC2ChargingInfo');
        const statusUsbAMode = document.getElementById('statusUsbAMode'), statusUsbAVoltage = document.getElementById('statusUsbAVoltage'), statusUsbAPower = document.getElementById('statusUsbAPower'), statusUsbACurrent = document.getElementById('statusUsbACurrent'), statusUsbACable = document.getElementById('statusUsbACable'), statusUsbAChargingInfo = document.getElementById('statusUsbAChargingInfo');
        const totalPowerToggle = document.getElementById('totalPowerToggle');
        const toggleUsbC1 = document.getElementById('toggleUsbC1');
        const toggleUsbC2 = document.getElementById('toggleUsbC2');
        const toggleUsbC3 = document.getElementById('toggleUsbC3');
        const timerMaster = document.getElementById('timerMaster');
        const timerUsbC1 = document.getElementById('timerUsbC1');
        const timerUsbC2 = document.getElementById('timerUsbC2');
        const timerUsbC3 = document.getElementById('timerUsbC3');
        const controlConnectionBadge = document.getElementById('controlConnectionBadge');
        const controlModeState = document.getElementById('controlModeState');
        const controlFixedState = document.getElementById('controlFixedState');
        const controlLastResult = document.getElementById('controlLastResult');
        const chargingModeSelect = document.getElementById('chargingModeSelect');
        const fixedAllocationSelect = document.getElementById('fixedAllocationSelect');
        const applyChargeModeButton = document.getElementById('applyChargeModeButton');
        const applyFixedAllocationButton = document.getElementById('applyFixedAllocationButton');
        const refreshControlStateButton = document.getElementById('refreshControlStateButton');
        const customProfileNumber = document.getElementById('customProfileNumber');
        const customAutoExit = document.getElementById('customAutoExit');
        const customPowerC1 = document.getElementById('customPowerC1');
        const customPowerC2 = document.getElementById('customPowerC2');
        const customPowerC3 = document.getElementById('customPowerC3');
        const customPowerTotal = document.getElementById('customPowerTotal');
        const customPowerValidation = document.getElementById('customPowerValidation');
        const customCommandPreview = document.getElementById('customCommandPreview');
        const protocolLimitMessage = document.getElementById('protocolLimitMessage');
        const customExperimentalUnlock = document.getElementById('customExperimentalUnlock');
        const applyCustomModeButton = document.getElementById('applyCustomModeButton');
        const settingsConnectionBadge = document.getElementById('settingsConnectionBadge');
        const settingsWriteUnlock = document.getElementById('settingsWriteUnlock');
        const settingsLastResult = document.getElementById('settingsLastResult');
        const screenBrightnessInput = document.getElementById('screenBrightnessInput');
        const screenBrightnessValue = document.getElementById('screenBrightnessValue');
        const screenTimeoutSelect = document.getElementById('screenTimeoutSelect');
        const screenDirectionSelect = document.getElementById('screenDirectionSelect');
        const gyroscopeSwitch = document.getElementById('gyroscopeSwitch');
        const deviceLanguageSelect = document.getElementById('deviceLanguageSelect');
        const deviceIdentificationSwitch = document.getElementById('deviceIdentificationSwitch');
        const applyScreenBrightnessButton = document.getElementById('applyScreenBrightnessButton');
        const applyScreenTimeoutButton = document.getElementById('applyScreenTimeoutButton');
        const applyScreenDirectionButton = document.getElementById('applyScreenDirectionButton');
        const applyGyroscopeButton = document.getElementById('applyGyroscopeButton');
        const applyDeviceLanguageButton = document.getElementById('applyDeviceLanguageButton');
        const applyDeviceIdentificationButton = document.getElementById('applyDeviceIdentificationButton');
        const protocolMaskElements = {
            C1: document.getElementById('protocolMaskC1'),
            C2: document.getElementById('protocolMaskC2'),
            C3: document.getElementById('protocolMaskC3'),
        };
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
        let a17a5EcdhKeyPair = null;
        let activeCryptoMode = 'AES-CBC';
        let activeAad = null;
        let gattWriteChain = Promise.resolve();
        let pollTimers = [];
        let lastLegacySnapshotText = '';

        const initialPowerStatus = { temperature: null, batteryLevel: null, totalInputPower: null, totalOutputPower: null, portC1: { mode: 'N/A', voltage: 'N/A', power: 'N/A', current: 'N/A', cable: 'N/A', chargingInfo: 'N/A', cableCode: null }, portC2: { mode: 'N/A', voltage: 'N/A', power: 'N/A', current: 'N/A', cable: 'N/A', chargingInfo: 'N/A', cableCode: null }, portA: { mode: 'N/A', voltage: 'N/A', power: 'N/A', current: 'N/A', cable: 'N/A', chargingInfo: 'N/A', cableCode: null } };
        let powerStatus = JSON.parse(JSON.stringify(initialPowerStatus));
        const A17A5_CMD_USB_OUTPUT = 0x0207;
        const A17A5_CMD_USB_TIMER = 0x0209;
        const A17A5_CMD_PORT_HISTORY = 0x020C;
        const A2687_CMD_FIXED_ALLOCATION = 0x0205;
        const A2687_CMD_CHARGING_MODE = 0x0206;
        const A2687_CMD_LANGUAGE = 0x0202;
        const A2687_CMD_SCREEN_TIMEOUT = 0x0203;
        const A2687_CMD_SCREEN_BRIGHTNESS = 0x0204;
        const A2687_CMD_SCREEN_DIRECTION = 0x020B;
        const A2687_CMD_GYROSCOPE = 0x020D;
        const A2687_CMD_DEVICE_IDENTIFICATION = 0x020F;
        const A17A5_PORT_INDEX = { C1: 0x00, C2: 0x01, C3: 0x02 };
        const portCommandInFlight = { master: false, C1: false, C2: false, C3: false };
        const A2687_CHARGING_MODE_LABELS = { 0: 'Intelligent / AI', 1: 'Standard', 4: 'Custom' };
        const A2687_FIXED_ALLOCATION_LABELS = { 0: 'Dual laptop', 1: 'C1 priority' };
        const A2687_CUSTOM_PROTOCOLS = [
            { key: 'ufcs', label: 'UFCS', mask: 0x02 },
            { key: 'scp', label: 'SCP', mask: 0x01 },
            { key: 'pd12v', label: 'PD 12V', mask: 0x04 },
            { key: 'pps11v', label: 'PPS 5–11V', mask: 0x08 },
            { key: 'pps16v', label: 'PPS 5–16V', mask: 0x10 },
            { key: 'pps20v', label: 'PPS 4.5–21V', mask: 0x20 },
        ];
        const A2687_PD_PROFILE_MASK = 0x3C;
        const A2687_PD_PROFILE_MAX_ENABLED = 3;
        const A2687_SETTING_COMMANDS = new Set([
            A2687_CMD_LANGUAGE,
            A2687_CMD_SCREEN_TIMEOUT,
            A2687_CMD_SCREEN_BRIGHTNESS,
            A2687_CMD_SCREEN_DIRECTION,
            A2687_CMD_GYROSCOPE,
            A2687_CMD_DEVICE_IDENTIFICATION,
        ]);
        const initialChargerControlState = {
            chargingMode: null,
            fixedAllocation: null,
            customPower: null,
            customProtocols: null,
            lastResult: 'No command sent',
        };
        let chargerControlState = { ...initialChargerControlState };
        let chargerControlCommandInFlight = false;
        let settingsCommandInFlight = false;
        let settingsControlState = { lastResult: 'No setting command sent' };

        const A2_STATIC_VALUE_HEX = '32633337376466613039636462373932343838396534323932613337663631633863356564353264';
        const CRYPTO_MODE_CBC = 'AES-CBC';
        const CRYPTO_MODE_GCM = 'AES-GCM';
        const A17A5_USE_APP_SEQUENCE = true;
        const A17A5_GCM_AAD_HEX = '3322110077665544bbaa9988ffeeddcc';
        const A17A5_INITIAL_KEY_HEX = 'b8ff7422955d4eb6d554a2c470280559';
        const A17A5_INITIAL_IV_HEX = '6ba3e3f2f3a60f2971ce5d1f';
        const A17A5_CMD_0022_A3_HEX = '808fffff';
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

        const isSessionReady = () => Boolean(writeCharacteristic) && cryptoState === 'Session';
        const getPortStatus = (portKey) => {
            if (portKey === 'C1') return powerStatus.portC1;
            if (portKey === 'C2') return powerStatus.portC2;
            return powerStatus.portA;
        };
        const isPortOn = (portStatus) => {
            if (!portStatus) return false;
            const mode = String(portStatus.mode || '').toLowerCase();
            return mode === 'output' || mode === 'on';
        };
        const setToggleState = (toggleEl, checked, enabled, indeterminate = false) => {
            if (!toggleEl) return;
            toggleEl.indeterminate = Boolean(indeterminate);
            toggleEl.checked = Boolean(checked);
            toggleEl.disabled = !enabled;
        };
        const setPortModeLocal = (portKey, isOn) => {
            const port = getPortStatus(portKey);
            if (!port) return;
            port.mode = isOn ? 'Output' : 'Off';
            if (!isOn) _resetPortMetrics(port);
        };

        const _typedUInt8 = (value) => new Uint8Array([0x01, Number(value) & 0xFF]);
        const _typedByteArray = (values) => new Uint8Array([0x04, ...Array.from(values, (value) => Number(value) & 0xFF)]);

        function buildA2687ModeTlv(chargingMode) {
            return [
                { type: 0xA1, value: new Uint8Array([0x21]) },
                { type: 0xA2, value: _typedUInt8(chargingMode) },
                { type: 0xFE, value: _epochTimestampBytes(0) },
            ];
        }

        function buildA2687FixedAllocationTlv(fixedAllocation) {
            return [
                { type: 0xA1, value: new Uint8Array([0x21]) },
                { type: 0xA2, value: _typedUInt8(fixedAllocation) },
                { type: 0xFE, value: _epochTimestampBytes(0) },
            ];
        }

        function buildA2687SingleValueTlv(value) {
            return [
                { type: 0xA1, value: new Uint8Array([0x21]) },
                { type: 0xA2, value: _typedUInt8(value) },
                { type: 0xFE, value: _epochTimestampBytes(0) },
            ];
        }

        function buildA2687CustomModeTlv(profileNumber, autoExit, powers, protocolMasks) {
            const powerArray = [profileNumber, autoExit ? 1 : 0, powers.C1, powers.C2, powers.C3];
            const protocolArray = ['C1', 'C2', 'C3'].flatMap((portKey) => [protocolMasks[portKey], 0x00, 0x00]);
            return {
                powerArray,
                protocolArray,
                tlv: [
                    { type: 0xA1, value: new Uint8Array([0x21]) },
                    { type: 0xA2, value: _typedUInt8(4) },
                    { type: 0xA3, value: _typedByteArray(powerArray) },
                    { type: 0xA4, value: _typedByteArray(protocolArray) },
                    { type: 0xFE, value: _epochTimestampBytes(0) },
                ],
            };
        }

        function renderA2687ProtocolCheckboxes() {
            document.querySelectorAll('[data-protocol-port]').forEach((container) => {
                const portKey = container.dataset.protocolPort;
                container.innerHTML = '';
                A2687_CUSTOM_PROTOCOLS.forEach((protocol) => {
                    const label = document.createElement('label');
                    label.className = 'protocol-check';
                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.checked = protocol.key !== 'pd12v';
                    checkbox.dataset.protocolPort = portKey;
                    checkbox.dataset.protocolMask = String(protocol.mask);
                    checkbox.id = `customProtocol${portKey}${protocol.key}`;
                    const text = document.createElement('span');
                    text.textContent = protocol.label;
                    label.append(checkbox, text);
                    container.appendChild(label);
                    checkbox.addEventListener('change', () => {
                        const specialCount = countSetBits(getA2687ProtocolMasksFromUi()[portKey] & A2687_PD_PROFILE_MASK);
                        if (checkbox.checked && (protocol.mask & A2687_PD_PROFILE_MASK) !== 0 && specialCount > A2687_PD_PROFILE_MAX_ENABLED) {
                            checkbox.checked = false;
                            showA2687ProtocolLimitMessage(portKey, true);
                            log(`[PROTOCOL] ${portKey}: official App limit blocked the fourth PD/PPS profile`, 'warn');
                        } else {
                            showA2687ProtocolLimitMessage(portKey, false);
                        }
                        updateA2687OfficialProtocolLimits();
                        updateA2687ControlPanel();
                    });
                });
            });
            updateA2687OfficialProtocolLimits();
        }

        function getA2687ProtocolMasksFromUi() {
            const masks = { C1: 0, C2: 0, C3: 0 };
            document.querySelectorAll('input[data-protocol-port][data-protocol-mask]').forEach((checkbox) => {
                if (!checkbox.checked) return;
                const portKey = checkbox.dataset.protocolPort;
                masks[portKey] |= Number(checkbox.dataset.protocolMask) || 0;
            });
            return masks;
        }

        function countSetBits(value) {
            let bits = Number(value) & 0xFF;
            let count = 0;
            while (bits) {
                count += bits & 1;
                bits >>>= 1;
            }
            return count;
        }

        function showA2687ProtocolLimitMessage(portKey = null, blocked = false) {
            if (!protocolLimitMessage) return;
            protocolLimitMessage.textContent = blocked
                ? `${portKey}: 受 PD 协议规则限制，PD 12V 与三组 PPS 最多同时开启 3 项。`
                : '官方规则：每个端口的 PD 12V、5–11V PPS、5–16V PPS、4.5–21V PPS 最多同时开启 3 项；UFCS、SCP 不计入。';
            protocolLimitMessage.classList.toggle('blocked', blocked);
        }

        function updateA2687OfficialProtocolLimits() {
            const masks = getA2687ProtocolMasksFromUi();
            for (const portKey of ['C1', 'C2', 'C3']) {
                const specialCount = countSetBits(masks[portKey] & A2687_PD_PROFILE_MASK);
                document.querySelectorAll(`input[data-protocol-port="${portKey}"][data-protocol-mask]`).forEach((checkbox) => {
                    const mask = Number(checkbox.dataset.protocolMask) || 0;
                    const isSpecial = (mask & A2687_PD_PROFILE_MASK) !== 0;
                    const disabled = isSpecial && !checkbox.checked && specialCount >= A2687_PD_PROFILE_MAX_ENABLED;
                    checkbox.setAttribute('aria-disabled', disabled ? 'true' : 'false');
                    checkbox.dataset.officialDisabled = disabled ? '1' : '0';
                    const label = checkbox.closest('.protocol-check');
                    if (label) label.classList.toggle('is-disabled', disabled);
                });
            }
            if (protocolLimitMessage && !protocolLimitMessage.classList.contains('blocked')) {
                showA2687ProtocolLimitMessage();
            }
        }

        function setA2687ProtocolMasksInUi(masks) {
            document.querySelectorAll('input[data-protocol-port][data-protocol-mask]').forEach((checkbox) => {
                const portKey = checkbox.dataset.protocolPort;
                const mask = Number(checkbox.dataset.protocolMask) || 0;
                checkbox.checked = Boolean((masks[portKey] || 0) & mask);
            });
            updateA2687OfficialProtocolLimits();
        }

        function readA2687CustomUiValues() {
            const profileNumber = Number(customProfileNumber ? customProfileNumber.value : 0);
            const powers = {
                C1: Number(customPowerC1 ? customPowerC1.value : 0),
                C2: Number(customPowerC2 ? customPowerC2.value : 0),
                C3: Number(customPowerC3 ? customPowerC3.value : 0),
            };
            const protocolMasks = getA2687ProtocolMasksFromUi();
            const errors = [];
            if (!Number.isInteger(profileNumber) || profileNumber < 0 || profileNumber > 255) {
                errors.push('profile number must be 0–255');
            }
            for (const [portKey, power] of Object.entries(powers)) {
                if (!Number.isInteger(power) || power < 0 || power > 140 || (power > 0 && power < 15)) {
                    errors.push(`${portKey} must be 0 or 15–140 W`);
                }
                if (power > 0 && protocolMasks[portKey] === 0) {
                    errors.push(`${portKey} needs at least one enabled protocol`);
                }
                const pdProfileCount = countSetBits(protocolMasks[portKey] & A2687_PD_PROFILE_MASK);
                if (pdProfileCount > A2687_PD_PROFILE_MAX_ENABLED) {
                    errors.push(`${portKey} may enable at most ${A2687_PD_PROFILE_MAX_ENABLED} of PD 12V and the three PPS profiles`);
                }
            }
            const totalPower = powers.C1 + powers.C2 + powers.C3;
            if (totalPower > 160) errors.push('total power must not exceed 160 W');
            if (totalPower <= 0) errors.push('at least one port must have power');
            return {
                profileNumber,
                autoExit: Boolean(customAutoExit && customAutoExit.checked),
                powers,
                protocolMasks,
                totalPower,
                errors,
                valid: errors.length === 0,
            };
        }

        function renderA2687CustomPreview() {
            if (!customCommandPreview) return { valid: false, errors: ['control UI missing'] };
            const values = readA2687CustomUiValues();
            const built = buildA2687CustomModeTlv(values.profileNumber, values.autoExit, values.powers, values.protocolMasks);
            if (customPowerTotal) customPowerTotal.textContent = `Total: ${values.totalPower} W / 160 W`;
            if (customPowerValidation) {
                customPowerValidation.textContent = values.valid ? 'Valid: each port is 0 or 15–140 W' : values.errors.join('; ');
                customPowerValidation.classList.toggle('invalid', !values.valid);
            }
            for (const portKey of ['C1', 'C2', 'C3']) {
                if (protocolMaskElements[portKey]) {
                    const enabledCount = countSetBits(values.protocolMasks[portKey]);
                    protocolMaskElements[portKey].textContent = `${enabledCount}/6 · 0x${_hex2(values.protocolMasks[portKey])}`;
                }
            }
            customCommandPreview.textContent = [
                'CMD 0x0206  chargingProtocol=4 (custom)',
                `A3 power array: [${built.powerArray.join(', ')}]`,
                `A4 protocol array: [${built.protocolArray.join(', ')}]`,
                `Plain TLV: ${toHexString(buildTlvBuffer(built.tlv))}`,
            ].join('\n');
            return { ...values, ...built };
        }

        function updateA2687SettingsPanel() {
            const sessionReady = isSessionReady();
            const unlocked = Boolean(settingsWriteUnlock && settingsWriteUnlock.checked);
            if (settingsConnectionBadge) {
                settingsConnectionBadge.textContent = sessionReady ? 'Session ready' : 'Not connected';
                settingsConnectionBadge.classList.toggle('ready', sessionReady);
            }
            if (settingsLastResult) settingsLastResult.textContent = settingsControlState.lastResult;
            const enabled = sessionReady && unlocked && !settingsCommandInFlight;
            [
                applyScreenBrightnessButton,
                applyScreenTimeoutButton,
                applyScreenDirectionButton,
                applyGyroscopeButton,
                applyDeviceLanguageButton,
                applyDeviceIdentificationButton,
            ].forEach((button) => {
                if (button) button.disabled = !enabled;
            });
            if (screenBrightnessValue && screenBrightnessInput) {
                screenBrightnessValue.textContent = `${screenBrightnessInput.value}%`;
            }
        }

        async function sendA2687SettingCommand(command, value, description, confirmText) {
            if (!isSessionReady()) {
                log('[SETTINGS] Cannot change device settings: session is not ready', 'warn');
                return false;
            }
            if (!(settingsWriteUnlock && settingsWriteUnlock.checked)) {
                log('[SETTINGS] Enable the settings write switch first', 'warn');
                return false;
            }
            if (settingsCommandInFlight || !window.confirm(confirmText)) return false;
            settingsCommandInFlight = true;
            settingsControlState.lastResult = `Sending ${description}...`;
            updateA2687SettingsPanel();
            const tlv = buildA2687SingleValueTlv(value);
            try {
                await sendEncryptedCommand(0x0F, command, tlv, false);
                settingsControlState.lastResult = `Sent ${description}`;
                log(`[SETTINGS] ${description} sent with command 0x${_hex4(command)}`, 'success', `TLV: ${toHexString(buildTlvBuffer(tlv))}`);
                return true;
            } catch (error) {
                settingsControlState.lastResult = `Failed: ${error.message}`;
                log(`[SETTINGS] ${description} failed: ${error.message}`, 'error');
                return false;
            } finally {
                settingsCommandInFlight = false;
                updateA2687SettingsPanel();
            }
        }

        function attachA2687SettingsControls() {
            if (settingsWriteUnlock) settingsWriteUnlock.addEventListener('change', updateA2687SettingsPanel);
            if (screenBrightnessInput) screenBrightnessInput.addEventListener('input', updateA2687SettingsPanel);
            if (applyScreenBrightnessButton) applyScreenBrightnessButton.addEventListener('click', () => {
                const value = Number(screenBrightnessInput.value);
                sendA2687SettingCommand(A2687_CMD_SCREEN_BRIGHTNESS, value, `screen brightness ${value}%`, `确认把充电器屏幕亮度设为 ${value}% 吗？`);
            });
            if (applyScreenTimeoutButton) applyScreenTimeoutButton.addEventListener('click', () => {
                const value = Number(screenTimeoutSelect.value);
                const label = screenTimeoutSelect.options[screenTimeoutSelect.selectedIndex].text;
                sendA2687SettingCommand(A2687_CMD_SCREEN_TIMEOUT, value, `auto lock ${label}`, `确认把自动锁屏设为“${label}”吗？`);
            });
            if (applyScreenDirectionButton) applyScreenDirectionButton.addEventListener('click', () => {
                const value = Number(screenDirectionSelect.value);
                const label = screenDirectionSelect.options[screenDirectionSelect.selectedIndex].text;
                sendA2687SettingCommand(A2687_CMD_SCREEN_DIRECTION, value, `screen direction ${label}`, `确认把屏幕方向设为“${label}”吗？`);
            });
            if (applyGyroscopeButton) applyGyroscopeButton.addEventListener('click', () => {
                const value = gyroscopeSwitch.checked ? 1 : 0;
                sendA2687SettingCommand(A2687_CMD_GYROSCOPE, value, `automatic rotation ${value ? 'on' : 'off'}`, `确认${value ? '开启' : '关闭'}自动旋转吗？`);
            });
            if (applyDeviceLanguageButton) applyDeviceLanguageButton.addEventListener('click', () => {
                const value = Number(deviceLanguageSelect.value);
                const label = deviceLanguageSelect.options[deviceLanguageSelect.selectedIndex].text;
                sendA2687SettingCommand(A2687_CMD_LANGUAGE, value, `device language ${label}`, `确认把设备语言设为“${label}”吗？`);
            });
            if (applyDeviceIdentificationButton) applyDeviceIdentificationButton.addEventListener('click', () => {
                const value = deviceIdentificationSwitch.checked ? 1 : 0;
                sendA2687SettingCommand(A2687_CMD_DEVICE_IDENTIFICATION, value, `charging-device identification ${value ? 'on' : 'off'}`, `确认${value ? '开启' : '关闭'}充电设备识别吗？该显示还需要 AI 模式 2.0 和兼容固件。`);
            });
            updateA2687SettingsPanel();
        }

        function updateA2687ControlPanel() {
            const sessionReady = isSessionReady();
            const customValues = renderA2687CustomPreview();
            if (controlConnectionBadge) {
                controlConnectionBadge.textContent = sessionReady ? 'Session ready' : 'Not connected';
                controlConnectionBadge.classList.toggle('ready', sessionReady);
            }
            if (controlModeState) {
                const mode = chargerControlState.chargingMode;
                controlModeState.textContent = mode === null ? 'Unknown' : `${A2687_CHARGING_MODE_LABELS[mode] || 'Unknown'} (${mode})`;
            }
            if (controlFixedState) {
                const fixed = chargerControlState.fixedAllocation;
                controlFixedState.textContent = fixed === null ? 'Unknown' : `${A2687_FIXED_ALLOCATION_LABELS[fixed] || 'Unknown'} (${fixed})`;
            }
            if (controlLastResult) controlLastResult.textContent = chargerControlState.lastResult;
            const normalControlsEnabled = sessionReady && !chargerControlCommandInFlight;
            if (applyChargeModeButton) applyChargeModeButton.disabled = !normalControlsEnabled;
            if (applyFixedAllocationButton) applyFixedAllocationButton.disabled = !normalControlsEnabled;
            if (refreshControlStateButton) refreshControlStateButton.disabled = !normalControlsEnabled;
            if (applyCustomModeButton) {
                applyCustomModeButton.disabled = !normalControlsEnabled || !customValues.valid || !(customExperimentalUnlock && customExperimentalUnlock.checked);
            }
        }

        async function sendA2687ControlCommand(command, tlv, description, confirmText) {
            if (!isSessionReady()) {
                log('[WARN] Cannot change charger configuration: session is not ready', 'warn');
                return false;
            }
            if (chargerControlCommandInFlight) return false;
            if (!window.confirm(confirmText)) return false;
            chargerControlCommandInFlight = true;
            chargerControlState.lastResult = `Sending ${description}...`;
            updateA2687ControlPanel();
            try {
                await sendEncryptedCommand(0x0F, command, tlv, false);
                chargerControlState.lastResult = `Sent ${description}; waiting for device report`;
                log(`[CONTROL] ${description} sent with command 0x${_hex4(command)}`, 'success', `TLV: ${toHexString(buildTlvBuffer(tlv))}`);
                await delay(180);
                sendA17A5StatusProbe(false).catch((error) => log(`[CONTROL] Status refresh failed: ${error.message}`, 'warn'));
                return true;
            } catch (error) {
                chargerControlState.lastResult = `Failed: ${error.message}`;
                log(`[CONTROL] ${description} failed: ${error.message}`, 'error');
                return false;
            } finally {
                chargerControlCommandInFlight = false;
                updateA2687ControlPanel();
            }
        }

        function attachA2687ChargingControls() {
            if (applyChargeModeButton) {
                applyChargeModeButton.addEventListener('click', async () => {
                    const mode = Number(chargingModeSelect.value);
                    const label = A2687_CHARGING_MODE_LABELS[mode] || `mode ${mode}`;
                    await sendA2687ControlCommand(
                        A2687_CMD_CHARGING_MODE,
                        buildA2687ModeTlv(mode),
                        `charging mode: ${label}`,
                        `确认把充电模式切换为“${label}”吗？`,
                    );
                });
            }
            if (applyFixedAllocationButton) {
                applyFixedAllocationButton.addEventListener('click', async () => {
                    const fixedAllocation = Number(fixedAllocationSelect.value);
                    const label = A2687_FIXED_ALLOCATION_LABELS[fixedAllocation] || `profile ${fixedAllocation}`;
                    await sendA2687ControlCommand(
                        A2687_CMD_FIXED_ALLOCATION,
                        buildA2687FixedAllocationTlv(fixedAllocation),
                        `fixed allocation: ${label}`,
                        `确认应用固定功率分配“${label}”吗？`,
                    );
                });
            }
            if (refreshControlStateButton) {
                refreshControlStateButton.addEventListener('click', async () => {
                    if (!isSessionReady() || chargerControlCommandInFlight) return;
                    chargerControlState.lastResult = 'Refreshing device reports...';
                    updateA2687ControlPanel();
                    try {
                        await sendA17A5StatusProbe(false);
                        await delay(120);
                        await sendA17A5RealtimeProbe(false);
                        chargerControlState.lastResult = 'Refresh requests sent';
                    } catch (error) {
                        chargerControlState.lastResult = `Refresh failed: ${error.message}`;
                    }
                    updateA2687ControlPanel();
                });
            }
            if (applyCustomModeButton) {
                applyCustomModeButton.addEventListener('click', async () => {
                    const values = renderA2687CustomPreview();
                    if (!values.valid) {
                        log(`[CONTROL] Custom configuration is invalid: ${values.errors.join('; ')}`, 'warn');
                        return;
                    }
                    const powerText = `C1 ${values.powers.C1}W / C2 ${values.powers.C2}W / C3 ${values.powers.C3}W`;
                    const maskText = `masks ${['C1', 'C2', 'C3'].map((key) => `${key}=0x${_hex2(values.protocolMasks[key])}`).join(', ')}`;
                    await sendA2687ControlCommand(
                        A2687_CMD_CHARGING_MODE,
                        values.tlv,
                        `custom mode (${powerText}; ${maskText})`,
                        `这是实验性自定义控制。确认发送？\n\n${powerText}\n${maskText}\n总功率 ${values.totalPower}W`,
                    );
                });
            }
            document.querySelectorAll('#chargingControlCard input, #chargingControlCard select').forEach((element) => {
                element.addEventListener('input', updateA2687ControlPanel);
                element.addEventListener('change', updateA2687ControlPanel);
            });
        }

        function buildA17A5PortOutputTlv(portIndex, isOn) {
            return [
                { type: 0xA1, value: new Uint8Array([0x21]) },
                { type: 0xA2, value: new Uint8Array([0x01, portIndex]) },
                { type: 0xA3, value: new Uint8Array([0x01, isOn ? 0x01 : 0x00]) },
                { type: 0xFE, value: _epochTimestampBytes(0) },
            ];
        }

        function buildA17A5PortTimerTlv(portIndex, seconds) {
            const timerValue = new Uint8Array(5);
            timerValue[0] = 0x04;
            timerValue.set(_u32le(seconds), 1);
            return [
                { type: 0xA1, value: new Uint8Array([0x21]) },
                { type: 0xA2, value: new Uint8Array([0x01, portIndex]) },
                { type: 0xA3, value: timerValue },
                { type: 0xFE, value: _epochTimestampBytes(0) },
            ];
        }

        async function sendA17A5PortOutput(portKey, isOn) {
            if (!isSessionReady()) {
                log('[WARN] Cannot control ports: not connected', 'warn');
                return false;
            }
            const portIndex = A17A5_PORT_INDEX[portKey];
            if (portIndex === undefined) {
                log(`[WARN] Unknown port key: ${portKey}`, 'warn');
                return false;
            }
            try {
                await sendEncryptedCommand(0x0F, A17A5_CMD_USB_OUTPUT, buildA17A5PortOutputTlv(portIndex, isOn), false);
                log(`[CMD] USB-${portKey} ${isOn ? 'ON' : 'OFF'} sent`, 'success');
                return true;
            } catch (error) {
                log(`[CMD] USB-${portKey} ${isOn ? 'ON' : 'OFF'} failed: ${error.message}`, 'error');
                return false;
            }
        }

        async function sendA17A5PortTimer(portKey, seconds) {
            if (!isSessionReady()) {
                log('[WARN] Cannot set timer: not connected', 'warn');
                return false;
            }
            const portIndex = A17A5_PORT_INDEX[portKey];
            if (portIndex === undefined) {
                log(`[WARN] Unknown port key: ${portKey}`, 'warn');
                return false;
            }
            try {
                await sendEncryptedCommand(0x0F, A17A5_CMD_USB_TIMER, buildA17A5PortTimerTlv(portIndex, seconds), false);
                const mins = Math.max(0, Math.round(seconds / 60));
                log(`[CMD] USB-${portKey} timer set: ${mins} min`, 'success');
                return true;
            } catch (error) {
                log(`[CMD] USB-${portKey} timer failed: ${error.message}`, 'error');
                return false;
            }
        }

        function promptTimerMinutes(portKey) {
            const label = (portKey === 'ALL') ? '全部USB口' : `USB-${portKey}`;
            const raw = window.prompt(`${label} 定时关断（分钟），输入 0 取消:`, '30');
            if (raw === null) return null;
            const trimmed = String(raw).trim();
            if (trimmed === '') return null;
            const value = Number(trimmed);
            if (!Number.isFinite(value) || value < 0) {
                log(`[WARN] 无效的定时输入: ${trimmed}`, 'warn');
                return null;
            }
            return Math.round(value * 60);
        }

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

        function buildA17A5PortHistoryProbeTlv(notificationSend = 0) {
            const normalizedNotificationSend = Math.max(0, Math.min(255, Number(notificationSend) || 0));
            return [
                { type: 0xA1, value: new Uint8Array([0x21]) },
                { type: 0xA2, value: new Uint8Array([0x01, normalizedNotificationSend]) },
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

        async function sendA17A5PortHistoryProbe(expectsResponse = false) {
            if (!writeCharacteristic || cryptoState !== 'Session') return;
            const tlv = buildA17A5PortHistoryProbeTlv(0);
            if (expectsResponse) {
                await sendEncryptedCommandExpectingNotification(0x0F, A17A5_CMD_PORT_HISTORY, tlv, 6000);
                return;
            }
            await sendEncryptedCommand(0x0F, A17A5_CMD_PORT_HISTORY, tlv, false);
            log('[PORT_HISTORY] Sent app-derived 0x020C read request (notificationSend=0).', 'info');
        }

        async function createA17A5ClientEcdhMaterial(parentElement = null) {
            if (!window.crypto || !window.crypto.subtle) {
                throw new Error('WebCrypto is unavailable; open this page in a secure Chrome/Edge context');
            }
            a17a5EcdhKeyPair = await window.crypto.subtle.generateKey(
                { name: 'ECDH', namedCurve: 'P-256' },
                true,
                ['deriveBits'],
            );
            const rawPublic = new Uint8Array(await window.crypto.subtle.exportKey('raw', a17a5EcdhKeyPair.publicKey));
            if (rawPublic.length !== 65 || rawPublic[0] !== 0x04) {
                throw new Error(`Unexpected P-256 public key encoding (${rawPublic.length} bytes)`);
            }
            log('[ECDH] Generated a fresh ephemeral P-256 client key pair', 'success', null, parentElement);
            return rawPublic.slice(1);
        }

        async function applyA17A5SessionCrypto(devicePublicCoordinates, parentElement = null) {
            if (!a17a5EcdhKeyPair || !a17a5EcdhKeyPair.privateKey) {
                throw new Error('Missing client ECDH private key for the 0x0021 response');
            }
            if (!(devicePublicCoordinates instanceof Uint8Array) || devicePublicCoordinates.length !== 64) {
                throw new Error(`Invalid device P-256 public key length: ${devicePublicCoordinates ? devicePublicCoordinates.length : 0}`);
            }
            const rawDevicePublic = new Uint8Array(65);
            rawDevicePublic[0] = 0x04;
            rawDevicePublic.set(devicePublicCoordinates, 1);
            const devicePublicKey = await window.crypto.subtle.importKey(
                'raw', rawDevicePublic, { name: 'ECDH', namedCurve: 'P-256' }, false, [],
            );
            const sharedSecret = new Uint8Array(await window.crypto.subtle.deriveBits(
                { name: 'ECDH', public: devicePublicKey },
                a17a5EcdhKeyPair.privateKey,
                256,
            ));
            if (sharedSecret.length !== 32) {
                throw new Error(`Unexpected ECDH shared secret length: ${sharedSecret.length}`);
            }
            await setupCrypto(
                sharedSecret.slice(0, 16),
                sharedSecret.slice(16, 28),
                'Session',
                { mode: CRYPTO_MODE_GCM, aad: hexToBytes(A17A5_GCM_AAD_HEX) },
            );
            deviceInfo.sessionKeyDerivation = 'ECDH P-256 (fresh per connection)';
            log('[ECDH] Derived the session AES key and GCM nonce from the live 0x0021 exchange', 'success', null, parentElement);
        }

        async function tryProcessA17A5SessionHandshake(payload, parentElement = null) {
            const offset = (payload.length > 0 && payload[0] === 0x00) ? 1 : 0;
            for (const { type, value } of _parseTlvGenerator(payload, offset)) {
                if (type === 0xA1 && value.length === 64) {
                    log('[ECDH] Device P-256 public key received in the 0x0021 response', 'success', null, parentElement);
                    await applyA17A5SessionCrypto(value, parentElement);
                    return true;
                }
            }
            return false;
        }

        async function performA17A5AppConnectSequence() {
            log('--- Starting A17A5 app-compatible AES-GCM sequence ---', 'warn');
            const gcmAad = hexToBytes(A17A5_GCM_AAD_HEX);
            const clientPublicCoordinates = await createA17A5ClientEcdhMaterial(currentTransactionWrapper);

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
                { type: 0xA1, value: clientPublicCoordinates },
            ], 6000);
            if (cryptoState !== 'Session') {
                const switched = await tryProcessA17A5SessionHandshake(sessionResp, currentTransactionWrapper);
                if (!switched) {
                    throw new Error('0x0021 did not return a 64-byte P-256 device public key');
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
            await delay(120);
            // The official power-curve page sends this read once when it opens.
            // Keep it out of the polling loop because the response can be multipart.
            await sendA17A5PortHistoryProbe(false);
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
            // Official CPowerControl tail: [cableInfo][deviceVID/chargingInfo].
            return `${_hex2(payload[payload.length - 2])}${_hex2(payload[payload.length - 1])}`;
        };

        const A17A5_CABLE_CODE_PROFILES = (A17A5_UI_DATA && A17A5_UI_DATA.cableProfiles) ? A17A5_UI_DATA.cableProfiles : {};
        const A17A5_CABLE_CAPABILITY_LABELS = {
            '00': '3A-60W MAX',
            '01': '5A-100W MAX',
            '02': 'EPR-240W MAX',
        };
        const A17A5_CHARGING_INFO_LABELS = {
            '01': 'Apple PD Fast Charging',
            '02': 'Samsung Fast Charging',
            '03': 'Samsung Super Fast Charging',
        };

        const a17a5CableProfileFromCode = (code) => {
            if (!code) return null;
            const configuredProfile = A17A5_CABLE_CODE_PROFILES[code];
            if (configuredProfile) return configuredProfile;

            const normalizedCode = String(code).toUpperCase();
            if (!/^[0-9A-F]{4}$/.test(normalizedCode)) return null;
            const cableCapabilityCode = normalizedCode.slice(0, 2);
            const chargingInfoCode = normalizedCode.slice(2, 4);
            const cableLabel = A17A5_CABLE_CAPABILITY_LABELS[cableCapabilityCode];
            if (!cableLabel) return null;
            return {
                cableLabel,
                chargingInfo: A17A5_CHARGING_INFO_LABELS[chargingInfoCode] || null,
            };
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
            if (String(code).toUpperCase().startsWith('03')) return 'N/A';
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

            const sessionReady = isSessionReady();
            const c1On = isPortOn(powerStatus.portC1);
            const c2On = isPortOn(powerStatus.portC2);
            const c3On = isPortOn(powerStatus.portA);
            const anyOn = c1On || c2On || c3On;
            const allOn = c1On && c2On && c3On;
            const busyAny = portCommandInFlight.master || portCommandInFlight.C1 || portCommandInFlight.C2 || portCommandInFlight.C3;
            setToggleState(toggleUsbC1, c1On, sessionReady && !portCommandInFlight.C1 && !portCommandInFlight.master);
            setToggleState(toggleUsbC2, c2On, sessionReady && !portCommandInFlight.C2 && !portCommandInFlight.master);
            setToggleState(toggleUsbC3, c3On, sessionReady && !portCommandInFlight.C3 && !portCommandInFlight.master);
            setToggleState(totalPowerToggle, anyOn, sessionReady && !busyAny, anyOn && !allOn);
            if (timerMaster) timerMaster.disabled = !(sessionReady && !busyAny);
            if (timerUsbC1) timerUsbC1.disabled = !(sessionReady && !portCommandInFlight.C1 && !portCommandInFlight.master);
            if (timerUsbC2) timerUsbC2.disabled = !(sessionReady && !portCommandInFlight.C2 && !portCommandInFlight.master);
            if (timerUsbC3) timerUsbC3.disabled = !(sessionReady && !portCommandInFlight.C3 && !portCommandInFlight.master);

            document.getElementById('portC1').className = powerStatus.portC1.mode === 'Off' ? 'port-card port-off' : 'port-card';
            document.getElementById('portC2').className = powerStatus.portC2.mode === 'Off' ? 'port-card port-off' : 'port-card';
            document.getElementById('portA').className = powerStatus.portA.mode === 'Off' ? 'port-card port-off' : 'port-card';
            updateCableOverlayDisplay();
            updateA2687ControlPanel();
            updateA2687SettingsPanel();
        }

        function attachPortToggle(toggleEl, portKey) {
            if (!toggleEl) return;
            toggleEl.addEventListener('change', async (event) => {
                const targetOn = Boolean(event.target.checked);
                const previousOn = isPortOn(getPortStatus(portKey));
                if (!isSessionReady()) {
                    log('[WARN] Cannot control ports: not connected', 'warn');
                    event.target.checked = previousOn;
                    return;
                }
                if (portCommandInFlight.master || portCommandInFlight[portKey]) {
                    event.target.checked = previousOn;
                    return;
                }
                portCommandInFlight[portKey] = true;
                setPortModeLocal(portKey, targetOn);
                updateStatusDisplay();
                const ok = await sendA17A5PortOutput(portKey, targetOn);
                if (!ok) {
                    setPortModeLocal(portKey, previousOn);
                    updateStatusDisplay();
                    event.target.checked = previousOn;
                } else {
                    await delay(120);
                    sendA17A5RealtimeProbe(false).catch((e) => log(`Realtime refresh failed: ${e.message}`, 'warn'));
                }
                portCommandInFlight[portKey] = false;
                updateStatusDisplay();
            });
        }

        function attachTimerButton(buttonEl, portKey) {
            if (!buttonEl) return;
            buttonEl.addEventListener('click', async () => {
                if (!isSessionReady()) {
                    log('[WARN] Cannot set timer: not connected', 'warn');
                    return;
                }
                if (portCommandInFlight.master || portCommandInFlight[portKey]) {
                    return;
                }
                const seconds = promptTimerMinutes(portKey);
                if (seconds === null) return;
                portCommandInFlight[portKey] = true;
                updateStatusDisplay();
                const ok = await sendA17A5PortTimer(portKey, Math.max(0, seconds));
                portCommandInFlight[portKey] = false;
                updateStatusDisplay();
                if (ok) {
                    await delay(120);
                    sendA17A5RealtimeProbe(false).catch((e) => log(`Realtime refresh failed: ${e.message}`, 'warn'));
                }
            });
        }

        function attachMasterTimerButton(buttonEl) {
            if (!buttonEl) return;
            buttonEl.addEventListener('click', async () => {
                if (!isSessionReady()) {
                    log('[WARN] Cannot set timer: not connected', 'warn');
                    return;
                }
                if (portCommandInFlight.master || portCommandInFlight.C1 || portCommandInFlight.C2 || portCommandInFlight.C3) {
                    return;
                }
                const seconds = promptTimerMinutes('ALL');
                if (seconds === null) return;
                portCommandInFlight.master = true;
                updateStatusDisplay();
                const keys = ['C1', 'C2', 'C3'];
                for (const key of keys) {
                    await sendA17A5PortTimer(key, Math.max(0, seconds));
                    await delay(120);
                }
                await delay(120);
                sendA17A5RealtimeProbe(false).catch((e) => log(`Realtime refresh failed: ${e.message}`, 'warn'));
                portCommandInFlight.master = false;
                updateStatusDisplay();
            });
        }

        function attachMasterToggle(toggleEl) {
            if (!toggleEl) return;
            toggleEl.addEventListener('change', async (event) => {
                const targetOn = Boolean(event.target.checked);
                const previous = {
                    C1: isPortOn(powerStatus.portC1),
                    C2: isPortOn(powerStatus.portC2),
                    C3: isPortOn(powerStatus.portA),
                };
                if (!isSessionReady()) {
                    log('[WARN] Cannot control ports: not connected', 'warn');
                    updateStatusDisplay();
                    return;
                }
                if (portCommandInFlight.master) {
                    updateStatusDisplay();
                    return;
                }
                portCommandInFlight.master = true;
                setPortModeLocal('C1', targetOn);
                setPortModeLocal('C2', targetOn);
                setPortModeLocal('C3', targetOn);
                updateStatusDisplay();

                const keys = ['C1', 'C2', 'C3'];
                for (const key of keys) {
                    const ok = await sendA17A5PortOutput(key, targetOn);
                    if (!ok) {
                        setPortModeLocal(key, previous[key]);
                    }
                    await delay(120);
                }
                await delay(120);
                sendA17A5RealtimeProbe(false).catch((e) => log(`Realtime refresh failed: ${e.message}`, 'warn'));
                portCommandInFlight.master = false;
                updateStatusDisplay();
            });
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
                throw error;
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
                    if (fullCommand === 0x0205 || fullCommand === 0x0206 || fullCommand === 0x0303) {
                        parseA2687ChargingControlResponse(decryptedPayload, fullCommand);
                    }
                    if (A2687_SETTING_COMMANDS.has(fullCommand)) {
                        parseA2687SettingResponse(decryptedPayload, fullCommand);
                    }
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
                        case 0x0207:
                        case 0x0206:
                        case 0x4300:
                        case 0x0300:
                        case 0x0303:
                        case 0x0410:
                            parseLegacyRealtime0857(decryptedPayload, fullCommand);
                            break;
                        case 0x0205:
                            break;
                        case 0x020C:
                        case 0x0A0C:
                            log('[PORT_HISTORY] Received a 0x020C/0x0A0C history packet; preserving raw TLVs for field mapping.', 'success', `Plaintext: ${toHexString(decryptedPayload)}`, targetWrapper);
                            break;
                        case 0x0301:
                            log('[DEVICE_STATUS] 0x0301 may contain the qualitative device error/over-temperature state or OTA-ready state; preserving raw TLVs.', 'info', `Plaintext: ${toHexString(decryptedPayload)}`, targetWrapper);
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

        function readA2687TypedScalar(raw) {
            const decoded = readLegacyTypedValue(raw);
            if (typeof decoded.u === 'number') return decoded.u;
            if (typeof decoded.i === 'number') return decoded.i;
            return null;
        }

        function readA2687TypedByteArray(raw) {
            if (!raw || raw.length === 0) return null;
            const decoded = readLegacyTypedValue(raw);
            if (decoded.type === 0x04 && decoded.payload) return Array.from(decoded.payload);
            return Array.from(raw);
        }

        function applyA2687ReportedCustomConfig(powerArray, protocolArray) {
            if (Array.isArray(powerArray) && powerArray.length >= 5) {
                chargerControlState.customPower = powerArray.slice(0, 5);
                if (customProfileNumber) customProfileNumber.value = String(powerArray[0]);
                if (customAutoExit) customAutoExit.checked = powerArray[1] === 1;
                if (customPowerC1) customPowerC1.value = String(powerArray[2]);
                if (customPowerC2) customPowerC2.value = String(powerArray[3]);
                if (customPowerC3) customPowerC3.value = String(powerArray[4]);
            }
            if (Array.isArray(protocolArray) && protocolArray.length >= 9) {
                chargerControlState.customProtocols = protocolArray.slice(0, 9);
                setA2687ProtocolMasksInUi({
                    C1: protocolArray[0],
                    C2: protocolArray[3],
                    C3: protocolArray[6],
                });
            }
        }

        function parseA2687ChargingControlResponse(payload, commandHint) {
            const fields = new Map();
            const offset = (payload.length > 0 && payload[0] === 0x00) ? 1 : 0;
            for (const { type, value } of _parseTlvGenerator(payload, offset)) fields.set(type, value);

            const replyState = fields.has(0xA1) ? readA2687TypedScalar(fields.get(0xA1)) : null;
            if (commandHint === 0x0205) {
                const fixedAllocation = fields.has(0xA2) ? readA2687TypedScalar(fields.get(0xA2)) : null;
                if (fixedAllocation === 0 || fixedAllocation === 1) {
                    chargerControlState.fixedAllocation = fixedAllocation;
                }
            }

            if (commandHint === 0x0206 || commandHint === 0x0303) {
                const chargingMode = fields.has(0xA2) ? readA2687TypedScalar(fields.get(0xA2)) : null;
                if (chargingMode === 0 || chargingMode === 1 || chargingMode === 4) {
                    chargerControlState.chargingMode = chargingMode;
                }
                const powerArray = fields.has(0xA3) ? readA2687TypedByteArray(fields.get(0xA3)) : null;
                const protocolArray = fields.has(0xA4) ? readA2687TypedByteArray(fields.get(0xA4)) : null;
                if ((powerArray && powerArray.length >= 5) || (protocolArray && protocolArray.length >= 9)) {
                    applyA2687ReportedCustomConfig(powerArray, protocolArray);
                }
            }

            const updatedMode = chargerControlState.chargingMode;
            const updatedFixed = chargerControlState.fixedAllocation;
            if (replyState !== null) {
                chargerControlState.lastResult = replyState === 0 ? 'Device accepted control (state 0)' : `Device reply state: ${replyState}`;
            } else if (commandHint === 0x0303 && updatedMode !== null) {
                chargerControlState.lastResult = `Device reported ${A2687_CHARGING_MODE_LABELS[updatedMode] || `mode ${updatedMode}`}`;
            } else if (commandHint === 0x0205 && updatedFixed !== null) {
                chargerControlState.lastResult = `Device reported ${A2687_FIXED_ALLOCATION_LABELS[updatedFixed] || `profile ${updatedFixed}`}`;
            }
            updateA2687ControlPanel();
        }

        function parseA2687SettingResponse(payload, commandHint) {
            const offset = (payload.length > 0 && payload[0] === 0x00) ? 1 : 0;
            let replyState = null;
            let reportedValue = null;
            for (const { type, value } of _parseTlvGenerator(payload, offset)) {
                if (type === 0xA1) replyState = readA2687TypedScalar(value);
                if (type === 0xA2) reportedValue = readA2687TypedScalar(value);
            }
            const commandText = `0x${_hex4(commandHint)}`;
            if (replyState !== null) {
                settingsControlState.lastResult = replyState === 0
                    ? `Device accepted setting ${commandText}`
                    : `Setting ${commandText} reply state: ${replyState}`;
            } else if (reportedValue !== null) {
                settingsControlState.lastResult = `Device reported ${commandText} value ${reportedValue}`;
            } else {
                settingsControlState.lastResult = `Device replied to setting ${commandText}`;
            }
            updateA2687SettingsPanel();
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
            a17a5EcdhKeyPair = null;
            activeCryptoMode = CRYPTO_MODE_CBC;
            activeAad = null;
            cryptoState = 'INACTIVE';
            gattWriteChain = Promise.resolve();
            connectButton.disabled = false;
            currentTransactionWrapper = null;
            powerStatus = JSON.parse(JSON.stringify(initialPowerStatus));
            chargerControlState = { ...initialChargerControlState };
            chargerControlCommandInFlight = false;
            if (customExperimentalUnlock) customExperimentalUnlock.checked = false;
            settingsCommandInFlight = false;
            settingsControlState = { lastResult: 'No setting command sent' };
            if (settingsWriteUnlock) settingsWriteUnlock.checked = false;
            lastLegacySnapshotText = '';
            chargerRawStatus.textContent = 'No charger snapshot yet.';
            updateStatusDisplay();
        }
        function fullReset() { log('Performing full reset', 'warn'); if (device && device.gatt.connected) device.gatt.disconnect(); deviceInfo = {}; sessionUtcTimestampBytes = null; onDisconnected(); logDiv.innerHTML = ''; log('Log and all state data cleared'); updateStatusDisplay(); }
        resetButton.addEventListener('click', fullReset);
        attachMasterToggle(totalPowerToggle);
        attachMasterTimerButton(timerMaster);
        attachPortToggle(toggleUsbC1, 'C1');
        attachPortToggle(toggleUsbC2, 'C2');
        attachPortToggle(toggleUsbC3, 'C3');
        attachTimerButton(timerUsbC1, 'C1');
        attachTimerButton(timerUsbC2, 'C2');
        attachTimerButton(timerUsbC3, 'C3');
        renderA2687ProtocolCheckboxes();
        attachA2687ChargingControls();
        attachA2687SettingsControls();
        updateStatusDisplay();
        log('Telemetry utility initialized. Please press "Connect & Start Telemetry" to start.');
