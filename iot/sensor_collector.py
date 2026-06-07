#!/usr/bin/env python3
"""
Simple IoT sensor collector that posts sample readings to the ChainClaim backend.
Adjust `API_URL` or add authentication as needed.
"""
import time
import os
import requests
from dotenv import load_dotenv

load_dotenv()
API_URL = os.getenv('CHAINCLAIM_API', 'http://localhost:5000/api/claims')


def collect_sample():
    # Replace this with real sensor collection logic
    return {
        'claimant': 'SensorNode',
        'amount': 0,
        'status': 'pending',
        'blockchainHash': '',
        'policyId': 'IOT-DEFAULT',
        'claimType': 'sensor_event',
        'description': 'Automated sensor-generated claim event',
        'iotDevice': 'sensor-1',
        'priority': 'low'
    }


def main(poll_interval=60):
    while True:
        payload = collect_sample()
        try:
            resp = requests.post(API_URL, json=payload, timeout=8)
            print('posted', resp.status_code)
        except Exception as e:
            print('failed to post:', e)
        time.sleep(poll_interval)


if __name__ == '__main__':
    main()
