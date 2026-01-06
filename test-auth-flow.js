// Test script for authentication flow
// This script tests the complete authentication flow

const API_URL = 'http://localhost:8080';

async function testAuthFlow() {
    console.log('🧪 Testing Authentication Flow...\n');

    // Test 1: Register a new user
    console.log('1. Testing Registration...');
    const registerData = {
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'Test123!'
    };

    try {
        const registerResponse = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerData)
        });

        console.log('Register Response Status:', registerResponse.status);
        
        if (!registerResponse.ok) {
            const error = await registerResponse.text();
            console.log('Register Error:', error);
        } else {
            const data = await registerResponse.json();
            console.log('✅ Registration successful!');
            console.log('Token received:', data.token ? 'YES' : 'NO');
            console.log('Token length:', data.token?.length || 0);
        }
    } catch (error) {
        console.log('❌ Registration failed:', error.message);
    }

    // Test 2: Login with the same user
    console.log('\n2. Testing Login...');
    const loginData = {
        email: 'test@example.com',
        password: 'Test123!'
    };

    try {
        const loginResponse = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });

        console.log('Login Response Status:', loginResponse.status);
        
        if (!loginResponse.ok) {
            const error = await loginResponse.text();
            console.log('Login Error:', error);
        } else {
            const data = await loginResponse.json();
            console.log('✅ Login successful!');
            console.log('Token received:', data.token ? 'YES' : 'NO');
            console.log('Token length:', data.token?.length || 0);
            
            // Test 3: Validate token
            console.log('\n3. Testing Token Validation...');
            const validateResponse = await fetch(`${API_URL}/api/auth/validate`, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${data.token}`,
                    'Content-Type': 'application/json'
                }
            });

            const isValid = await validateResponse.json();
            console.log('Token validation result:', isValid ? '✅ VALID' : '❌ INVALID');
        }
    } catch (error) {
        console.log('❌ Login failed:', error.message);
    }

    // Test 4: Test with wrong credentials
    console.log('\n4. Testing Wrong Credentials...');
    const wrongLoginData = {
        email: 'test@example.com',
        password: 'wrongpassword'
    };

    try {
        const wrongLoginResponse = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(wrongLoginData)
        });

        console.log('Wrong Login Response Status:', wrongLoginResponse.status);
        
        if (!wrongLoginResponse.ok) {
            console.log('✅ Correctly rejected wrong credentials');
        } else {
            console.log('❌ Should have rejected wrong credentials');
        }
    } catch (error) {
        console.log('✅ Wrong credentials test passed:', error.message);
    }

    console.log('\n🧪 Authentication Flow Test Complete!');
}

// Run the test
testAuthFlow().catch(console.error);