"""Call Anker Cloud API to get bluetooth password for A2687 charger."""

from __future__ import annotations

import asyncio
import json
import sys
import typing
import enum
import logging

# Python 3.10 compat patches
if not hasattr(typing, 'Self'):
    from typing_extensions import Self
    typing.Self = Self
if not hasattr(enum, 'StrEnum'):
    class StrEnum(str, enum.Enum):
        pass
    enum.StrEnum = StrEnum

sys.path.insert(0, r"c:\Users\Kirin\OneDrive\Code\_tmp_anker_solix_api")

import aiohttp
from api.session import AnkerSolixClientSession

sys.stdout.reconfigure(encoding='utf-8')

EMAIL = "qq512554339@gmail.com"
PASSWORD = "Pp8787789."
COUNTRY_ID = "US"
DEVICE_SN = "ANSDJ7M0E46400063"

logging.basicConfig(level=logging.WARNING, format="%(levelname)s: %(message)s")


async def try_api(client, method, endpoint, payload, label=""):
    try:
        resp = await client.request(method, endpoint, json=payload)
        return resp
    except Exception as exc:
        err = str(exc)
        if len(err) > 300:
            err = err[:300] + "..."
        if label:
            print(f"   [{label}] {type(exc).__name__}: {err}")
        return None


async def main():
    print("=" * 60)
    print("  Anker Cloud API - BT Password Retrieval")
    print("=" * 60)

    async with aiohttp.ClientSession() as websession:
        client = AnkerSolixClientSession(
            email=EMAIL,
            password=PASSWORD,
            countryId=COUNTRY_ID,
            websession=websession,
        )

        # Step 1: Authenticate
        print("\n1. Authenticating...")
        try:
            auth_ok = await client.async_authenticate()
            if auth_ok:
                print(f"   OK! user_id: {client.get_login_info('user_id')}")
            else:
                print("   FAIL")
                return
        except Exception as exc:
            print(f"   ERROR: {type(exc).__name__}: {str(exc)[:300]}")
            return

        # Step 2: List sites
        print("\n2. Sites...")
        resp = await try_api(client, "post",
            "power_service/v1/site/get_site_list", {}, "sites")
        if resp:
            print(f"   {json.dumps(resp, indent=2, ensure_ascii=False)[:2000]}")

        # Step 3: Bound devices
        print("\n3. Bound devices...")
        resp = await try_api(client, "post",
            "power_service/v1/app/get_relate_and_bind_devices", {}, "bind")
        if resp:
            print(f"   {json.dumps(resp, indent=2, ensure_ascii=False)[:2000]}")

        # Step 4: Charger endpoints
        print("\n4. Charger settings...")
        for ep, pay in [
            ("mini_power/v1/app/setting/get_device_setting",
             {"device_sn": DEVICE_SN}),
            ("mini_power/v1/app/power/get_day_power_data",
             {"device_sn": DEVICE_SN, "device_model": "A2687",
              "date": "2026-03-05"}),
        ]:
            resp = await try_api(client, "post", ep, pay, "charger")
            if resp:
                print(f"\n   {ep}:")
                print(f"   {json.dumps(resp, indent=2, ensure_ascii=False)[:1500]}")

        # Step 5: BT password
        print("\n5. Bluetooth password...")
        for pay in [
            {"device_sn": DEVICE_SN},
            {"deviceSn": DEVICE_SN},
            {"device_sn": DEVICE_SN, "product_code": "A2687"},
        ]:
            resp = await try_api(client, "post",
                "charging_hes_svc/check_device_bluetooth_password", pay, "bt")
            if resp:
                print(f"\n   BT PASSWORD: {json.dumps(resp, indent=2, ensure_ascii=False)}")
                break

        # Step 6: User devices
        print("\n6. User devices...")
        resp = await try_api(client, "post",
            "power_service/v1/site/list_user_devices", {}, "udev")
        if resp:
            print(f"   {json.dumps(resp, indent=2, ensure_ascii=False)[:2000]}")

    print("\n" + "=" * 60)


if __name__ == "__main__":
    asyncio.run(main())
