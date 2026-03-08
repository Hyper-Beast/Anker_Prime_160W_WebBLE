# A17A5 Firmware Update Playbook

Last updated: 2026-03-07
Scope: `Anker/AnkerPrimeWebBle_A2687.html`

## 1. Will this happen again after firmware updates?

Yes, it can happen again.

Firmware or app updates may change:
- Session key/nonce used after `0x0021`
- `0x0021` request payload constant (A1 64-byte blob)
- Telemetry command family (`0x0200/0x020A` vs `0x4300`)
- ACK payload format (which causes AES-GCM `OperationError` if context mismatches)

## 2. Typical failure signature

If you see this repeatedly after session switch:

```text
[DECRYPTION_ERROR] OperationError
Ciphertext: 1903D3D4BD0E1E1DBB6F357537AC5EF498
```

then handshake usually succeeded, but session crypto context is wrong (key/nonce/AAD and/or `0x0021` profile mismatch).

## 3. Important code paths

In `AnkerPrimeWebBle_A2687.html`:
- App-mode connect flow: `performA17A5AppConnectSequence()`
- Session switch: `tryProcessA17A5SessionHandshake()`
- Session apply: `applyA17A5SessionCrypto()`
- Encrypt/decrypt: `encrypt()`, `decrypt()`
- Notify dispatch: `handleNotifications()`
- Realtime parser: `parseLegacyRealtime0857()`

Critical constants:
- `A17A5_GCM_AAD_HEX`
- `A17A5_INITIAL_KEY_HEX`
- `A17A5_INITIAL_IV_HEX`
- `A17A5_CMD_0021_A1_HEX`
- `A17A5_SESSION_KEY_HEX`
- `A17A5_SESSION_IV_HEX`

## 4. Known-good values (current working profile)

These values were validated in this repo after fixing `OperationError`:

```text
A17A5_GCM_AAD_HEX     = 3322110077665544bbaa9988ffeeddcc
A17A5_INITIAL_KEY_HEX = b8ff7422955d4eb6d554a2c470280559
A17A5_INITIAL_IV_HEX  = 6ba3e3f2f3a60f2971ce5d1f

A17A5_CMD_0021_A1_HEX = 29154a2a892aa58615c7a6d113564f74638f39cca3338ec53b05b586c04b5be3c0ca50d063b3c19516d79aed71896e47644da29be288c768f5a532d13e67840f
A17A5_SESSION_KEY_HEX = c0779a39bfa7b290ba9cd3d96b6fdc22
A17A5_SESSION_IV_HEX  = a1f6a9746d4fc81e942c3d95
```

Also ensure `0x4300` is routed to realtime parser in `handleNotifications()`:
- encrypted branch includes `case 0x4300`
- unencrypted branch includes `case 0x4300`

## 5. Common confusion: `FORCED_SESSION_*` does not always apply

`FORCED_SESSION_KEY_HEX` / `FORCED_SESSION_IV_HEX` only apply in standard flow when:
- `FORCE_SESSION_CRYPTO = true`
- and code enters `performStandardSessionConnectSequence()`

If app-mode flow is active (`A17A5_USE_APP_SEQUENCE = true` and it succeeds), forced constants are ignored.

## 6. Minimal log package to send next time

When issue returns, send one hook log that includes:

1. Outgoing writes around:
- `cmd=0x4001`
- `cmd=0x4003`
- `cmd=0x4029`
- `cmd=0x4005`
- `cmd=0x4021`
- `cmd=0x4022`
- `cmd=0x4027`
- first telemetry write (`0x4200`, `0x420A`, and/or `0x4300`)

2. Incoming ACK notifications around:
- `cmd=0x48xx` and `cmd=0x4Axx`

3. Crypto lines around session switch:
- `Crypto SecretKeySpec alg=AES key=...`
- `Crypto GCMParameterSpec ... iv=...`
- `Crypto Cipher.updateAAD ...`
- `Crypto Cipher.doFinal ... in/out ...`

4. Web utility log from:
- first `SENDING 0x0021`
- to first `DECRYPTION_ERROR`

## 7. Fast repair workflow

1. Verify pre-session decrypt still works (`0x0001/0003/0029/0005/0021`).
2. From hook log, extract app-side session key/iv immediately after `0x4821` ACK.
3. Update:
- `A17A5_CMD_0021_A1_HEX`
- `A17A5_SESSION_KEY_HEX`
- `A17A5_SESSION_IV_HEX`
4. Confirm `A17A5_GCM_AAD_HEX` matches app logs.
5. Ensure `0x4300` parser routing exists.
6. Re-test and check no repeated `OperationError`.

## 8. Quick PowerShell helpers

```powershell
$p='Anker\hooklogs\YOUR_LOG.txt'

# unique AES keys observed
Select-String -Path $p -Pattern 'Crypto SecretKeySpec alg=AES key=' |
  ForEach-Object { ($_ -split 'key=')[-1].Trim() } |
  Group-Object | Sort-Object Count -Descending

# unique GCM IVs observed
Select-String -Path $p -Pattern 'Crypto GCMParameterSpec tLen=128 iv' |
  ForEach-Object { $_.Line }

# command timeline
Select-String -Path $p -Pattern 'cmd=0x4001|cmd=0x4003|cmd=0x4029|cmd=0x4005|cmd=0x4021|cmd=0x4022|cmd=0x4027|cmd=0x4200|cmd=0x420A|cmd=0x4300|cmd=0x48|cmd=0x4A'
```

## 9. What to send to assistant next time (copy template)

```text
Device model:
Firmware version:
Did this start after update? (yes/no + date):

Web log snippet (0x0021 -> first decryption error):
<paste>

Hook log filename:
<paste path>

Hook lines around 0x4021/0x4022/0x4027 and first telemetry:
<paste>

Crypto key/iv lines around session switch:
<paste>
```

