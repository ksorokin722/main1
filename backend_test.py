#!/usr/bin/env python3
"""
Backend API Testing Script for Ublogger
Tests all backend API endpoints with realistic Russian blogger data
"""

import requests
import json
import sys
from datetime import datetime

# Backend URL from frontend/.env
BACKEND_URL = "https://ublogger.preview.emergentagent.com/api"

# Test data - realistic Russian blogger data
test_user_data = {
    "name": "Анна Петрова",
    "email": "anna.petrova@example.com", 
    "password": "SecurePass123!",
    "phone": "+7 (925) 123-45-67",
    "social_accounts": [
        {
            "id": "anna_petrova_vk",
            "name": "VK - Анна Петрова",
            "followers": 85000,
            "platform_url": "https://vk.com/anna_petrova_blog"
        },
        {
            "id": "anna_petrova_tg",
            "name": "Telegram - Анна о красоте",
            "followers": 42000,
            "platform_url": "https://t.me/anna_beauty_blog"
        }
    ]
}

test_login_data = {
    "email": "anna.petrova@example.com",
    "password": "SecurePass123!"
}

def print_test_header(test_name):
    print(f"\n{'='*60}")
    print(f"TESTING: {test_name}")
    print(f"{'='*60}")

def print_curl_command(method, url, data=None, headers=None):
    print(f"\nCURL Command:")
    if method == "GET":
        print(f"curl -X GET '{url}'")
    elif method == "POST":
        headers_str = ""
        if headers:
            for key, value in headers.items():
                headers_str += f" -H '{key}: {value}'"
        data_str = f" -d '{json.dumps(data)}'" if data else ""
        print(f"curl -X POST '{url}'{headers_str}{data_str}")

def test_api_root():
    """Test 1: Basic API connectivity"""
    print_test_header("API Root Endpoint")
    
    url = f"{BACKEND_URL}/"
    print_curl_command("GET", url)
    
    try:
        response = requests.get(url, timeout=10)
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "Ublogger API" in data["message"]:
                print("✅ API Root endpoint working correctly")
                return True
            else:
                print("❌ API Root endpoint returned unexpected response")
                return False
        else:
            print(f"❌ API Root endpoint failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ API Root endpoint connection failed: {e}")
        return False

def test_user_registration():
    """Test 2: User registration endpoint"""
    print_test_header("User Registration")
    
    url = f"{BACKEND_URL}/auth/register"
    headers = {"Content-Type": "application/json"}
    print_curl_command("POST", url, test_user_data, headers)
    
    try:
        response = requests.post(url, json=test_user_data, headers=headers, timeout=10)
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
        
        if response.status_code == 200:
            data = response.json()
            if "id" in data and data["email"] == test_user_data["email"]:
                print("✅ User registration working correctly")
                return True, data["id"]
            else:
                print("❌ User registration returned unexpected response")
                return False, None
        elif response.status_code == 400:
            error_detail = response.json().get("detail", "")
            if "already exists" in error_detail:
                print("⚠️ User already exists - this is expected for repeated tests")
                return True, None
            else:
                print(f"❌ User registration failed: {error_detail}")
                return False, None
        else:
            print(f"❌ User registration failed with status {response.status_code}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ User registration connection failed: {e}")
        return False, None

def test_user_login():
    """Test 3: User login endpoint"""
    print_test_header("User Login")
    
    url = f"{BACKEND_URL}/auth/login"
    headers = {"Content-Type": "application/json"}
    print_curl_command("POST", url, test_login_data, headers)
    
    try:
        response = requests.post(url, json=test_login_data, headers=headers, timeout=10)
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
        
        if response.status_code == 200:
            data = response.json()
            if "id" in data and data["email"] == test_login_data["email"]:
                print("✅ User login working correctly")
                return True, data["id"]
            else:
                print("❌ User login returned unexpected response")
                return False, None
        else:
            print(f"❌ User login failed with status {response.status_code}")
            return False, None
            
    except requests.exceptions.RequestException as e:
        print(f"❌ User login connection failed: {e}")
        return False, None

def test_campaigns_endpoint():
    """Test 4: Campaigns endpoint"""
    print_test_header("Campaigns Endpoint")
    
    url = f"{BACKEND_URL}/campaigns"
    print_curl_command("GET", url)
    
    try:
        response = requests.get(url, timeout=10)
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                print(f"✅ Campaigns endpoint working correctly - returned {len(data)} campaigns")
                return True
            else:
                print("❌ Campaigns endpoint returned unexpected response format")
                return False
        else:
            print(f"❌ Campaigns endpoint failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Campaigns endpoint connection failed: {e}")
        return False

def test_analytics_endpoint(user_id):
    """Test 5: Analytics endpoint"""
    print_test_header("Analytics Endpoint")
    
    if not user_id:
        print("⚠️ Skipping analytics test - no valid user_id available")
        return False
    
    url = f"{BACKEND_URL}/analytics/{user_id}"
    print_curl_command("GET", url)
    
    try:
        response = requests.get(url, timeout=10)
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
        
        if response.status_code == 200:
            data = response.json()
            if "earnings" in data and "campaigns" in data:
                print("✅ Analytics endpoint working correctly")
                return True
            else:
                print("❌ Analytics endpoint returned unexpected response format")
                return False
        else:
            print(f"❌ Analytics endpoint failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Analytics endpoint connection failed: {e}")
        return False

def test_loyalty_points_endpoint(user_id):
    """Test 6: Loyalty points endpoint"""
    print_test_header("Loyalty Points Endpoint")
    
    if not user_id:
        print("⚠️ Skipping loyalty points test - no valid user_id available")
        return False
    
    url = f"{BACKEND_URL}/loyalty/{user_id}/add"
    params = {"points": 50, "reason": "Тестовое начисление баллов"}
    print_curl_command("POST", f"{url}?points=50&reason=Тестовое начисление баллов")
    
    try:
        response = requests.post(url, params=params, timeout=10)
        print(f"\nStatus Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2, ensure_ascii=False)}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data and "50" in data["message"]:
                print("✅ Loyalty points endpoint working correctly")
                return True
            else:
                print("❌ Loyalty points endpoint returned unexpected response")
                return False
        else:
            print(f"❌ Loyalty points endpoint failed with status {response.status_code}")
            return False
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Loyalty points endpoint connection failed: {e}")
        return False

def main():
    """Run all backend API tests"""
    print("🚀 Starting Ublogger Backend API Tests")
    print(f"Backend URL: {BACKEND_URL}")
    print(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    results = {}
    user_id = None
    
    # Test 1: API Root
    results["api_root"] = test_api_root()
    
    # Test 2: User Registration
    reg_success, reg_user_id = test_user_registration()
    results["user_registration"] = reg_success
    if reg_user_id:
        user_id = reg_user_id
    
    # Test 3: User Login
    login_success, login_user_id = test_user_login()
    results["user_login"] = login_success
    if login_user_id and not user_id:
        user_id = login_user_id
    
    # Test 4: Campaigns
    results["campaigns"] = test_campaigns_endpoint()
    
    # Test 5: Analytics (requires user_id)
    results["analytics"] = test_analytics_endpoint(user_id)
    
    # Test 6: Loyalty Points (requires user_id)
    results["loyalty_points"] = test_loyalty_points_endpoint(user_id)
    
    # Summary
    print(f"\n{'='*60}")
    print("TEST SUMMARY")
    print(f"{'='*60}")
    
    passed = sum(1 for result in results.values() if result)
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{test_name.replace('_', ' ').title()}: {status}")
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend API tests passed!")
        return 0
    else:
        print("⚠️ Some backend API tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())