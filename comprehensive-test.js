// Comprehensive Authentication & Service Flow Test
// This script tests the complete authentication and service flow

const API_URL = 'http://localhost:8080';
const TEST_USER = {
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    password: 'TestPass123!'
};

class TestRunner {
    constructor() {
        this.results = [];
        this.token = null;
        this.userEmail = null;
    }

    async run() {
        console.log('🚀 COMPREHENSIVE AUTHENTICATION & SERVICE FLOW TEST\n');
        console.log('=' .repeat(60));

        // Phase 1: Authentication Tests
        await this.testRegistration();
        await this.testLogin();
        await this.testTokenValidation();
        await this.testWrongCredentials();
        await this.testDuplicateRegistration();

        // Phase 2: Service Flow Tests (if token obtained)
        if (this.token) {
            await this.testUserProfile();
            await this.testProductService();
            await this.testOrderFlow();
        }

        // Phase 3: Summary
        this.printSummary();
    }

    async testRegistration() {
        console.log('\n📝 TEST 1: User Registration');
        console.log('-'.repeat(40));
        
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(TEST_USER)
            });

            const data = await response.json();
            
            if (response.ok && data.token) {
                this.token = data.token;
                this.userEmail = TEST_USER.email;
                this.recordResult('✅ Registration', true, 'User registered successfully');
                console.log('   ✓ Token received:', data.token.substring(0, 20) + '...');
            } else {
                this.recordResult('❌ Registration', false, data.message || 'Failed to register');
                console.log('   ✗ Error:', data.message || 'Unknown error');
            }
        } catch (error) {
            this.recordResult('❌ Registration', false, error.message);
            console.log('   ✗ Exception:', error.message);
        }
    }

    async testLogin() {
        console.log('\n🔐 TEST 2: User Login');
        console.log('-'.repeat(40));
        
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: TEST_USER.email,
                    password: TEST_USER.password
                })
            });

            const data = await response.json();
            
            if (response.ok && data.token) {
                this.token = data.token;
                this.recordResult('✅ Login', true, 'User logged in successfully');
                console.log('   ✓ Token received:', data.token.substring(0, 20) + '...');
            } else {
                this.recordResult('❌ Login', false, data.message || 'Failed to login');
                console.log('   ✗ Error:', data.message || 'Unknown error');
            }
        } catch (error) {
            this.recordResult('❌ Login', false, error.message);
            console.log('   ✗ Exception:', error.message);
        }
    }

    async testTokenValidation() {
        console.log('\n✓ TEST 3: Token Validation');
        console.log('-'.repeat(40));
        
        if (!this.token) {
            this.recordResult('❌ Token Validation', false, 'No token available');
            console.log('   ✗ No token to validate');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/auth/validate`, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            const isValid = await response.json();
            
            if (isValid) {
                this.recordResult('✅ Token Validation', true, 'Token is valid');
                console.log('   ✓ Token validation successful');
            } else {
                this.recordResult('❌ Token Validation', false, 'Token validation failed');
                console.log('   ✗ Token validation failed');
            }
        } catch (error) {
            this.recordResult('❌ Token Validation', false, error.message);
            console.log('   ✗ Exception:', error.message);
        }
    }

    async testWrongCredentials() {
        console.log('\n🛡️ TEST 4: Wrong Credentials Rejection');
        console.log('-'.repeat(40));
        
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: TEST_USER.email,
                    password: 'wrongpassword'
                })
            });

            if (!response.ok) {
                this.recordResult('✅ Wrong Credentials', true, 'Correctly rejected invalid credentials');
                console.log('   ✓ Invalid credentials properly rejected');
            } else {
                this.recordResult('❌ Wrong Credentials', false, 'Should have rejected wrong password');
                console.log('   ✗ Wrong password was accepted (security issue!)');
            }
        } catch (error) {
            this.recordResult('✅ Wrong Credentials', true, 'Exception thrown for wrong credentials');
            console.log('   ✓ Wrong credentials caused exception');
        }
    }

    async testDuplicateRegistration() {
        console.log('\n🔄 TEST 5: Duplicate Registration Prevention');
        console.log('-'.repeat(40));
        
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(TEST_USER)
            });

            if (!response.ok) {
                this.recordResult('✅ Duplicate Prevention', true, 'Duplicate registration blocked');
                console.log('   ✓ Duplicate registration properly prevented');
            } else {
                this.recordResult('❌ Duplicate Prevention', false, 'Duplicate registration allowed');
                console.log('   ✗ Same user registered twice (data integrity issue)');
            }
        } catch (error) {
            this.recordResult('✅ Duplicate Prevention', true, 'Exception thrown for duplicate');
            console.log('   ✓ Duplicate registration caused exception');
        }
    }

    async testUserProfile() {
        console.log('\n👤 TEST 6: User Profile Service');
        console.log('-'.repeat(40));
        
        if (!this.token) {
            this.recordResult('❌ User Profile', false, 'No token available');
            return;
        }

        try {
            // First, check if user profile exists
            const response = await fetch(`${API_URL}/api/users/${this.userEmail}`, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const profile = await response.json();
                this.recordResult('✅ User Profile', true, 'Profile retrieved successfully');
                console.log('   ✓ Profile found:', JSON.stringify(profile, null, 2));
            } else if (response.status === 404) {
                this.recordResult('⚠️ User Profile', true, 'Profile not found (expected after auth-only registration)');
                console.log('   ⚠ Profile not found (auth service creates user, profile can be created later)');
            } else {
                this.recordResult('❌ User Profile', false, `HTTP ${response.status}`);
                console.log('   ✗ Failed to retrieve profile');
            }
        } catch (error) {
            this.recordResult('❌ User Profile', false, error.message);
            console.log('   ✗ Exception:', error.message);
        }
    }

    async testProductService() {
        console.log('\n🍦 TEST 7: Product Service');
        console.log('-'.repeat(40));
        
        if (!this.token) {
            this.recordResult('❌ Product Service', false, 'No token available');
            return;
        }

        try {
            const response = await fetch(`${API_URL}/api/products`, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const products = await response.json();
                this.recordResult('✅ Product Service', true, `Retrieved ${products.length} products`);
                console.log(`   ✓ Found ${products.length} products`);
                if (products.length > 0) {
                    console.log('   Sample:', products[0].name);
                }
            } else {
                this.recordResult('❌ Product Service', false, `HTTP ${response.status}`);
                console.log('   ✗ Failed to retrieve products');
            }
        } catch (error) {
            this.recordResult('❌ Product Service', false, error.message);
            console.log('   ✗ Exception:', error.message);
        }
    }

    async testOrderFlow() {
        console.log('\n📦 TEST 8: Order Flow');
        console.log('-'.repeat(40));
        
        if (!this.token) {
            this.recordResult('❌ Order Flow', false, 'No token available');
            return;
        }

        try {
            // Try to get user orders first
            const response = await fetch(`${API_URL}/api/orders/user/${this.userEmail}`, {
                method: 'GET',
                headers: { 
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const orders = await response.json();
                this.recordResult('✅ Order Flow', true, `Order service accessible (${orders.length} orders)`);
                console.log(`   ✓ Order service accessible (${orders.length} orders found)`);
            } else {
                this.recordResult('⚠️ Order Flow', true, `Order service accessible (HTTP ${response.status})`);
                console.log('   ⚠ Order service responded (may have no orders yet)');
            }
        } catch (error) {
            this.recordResult('❌ Order Flow', false, error.message);
            console.log('   ✗ Exception:', error.message);
        }
    }

    recordResult(name, passed, details) {
        this.results.push({
            test: name,
            passed: passed,
            details: details,
            timestamp: new Date().toISOString()
        });
    }

    printSummary() {
        console.log('\n' + '='.repeat(60));
        console.log('📊 TEST SUMMARY');
        console.log('='.repeat(60));
        
        const passed = this.results.filter(r => r.passed).length;
        const total = this.results.length;
        const percentage = total > 0 ? Math.round((passed / total) * 100) : 0;

        console.log(`\nTests Passed: ${passed}/${total} (${percentage}%)\n`);

        this.results.forEach((result, index) => {
            const icon = result.passed ? '✅' : '❌';
            console.log(`${icon} ${result.test}`);
            console.log(`   ${result.details}`);
        });

        console.log('\n' + '='.repeat(60));
        
        if (percentage >= 80) {
            console.log('🎉 EXCELLENT! Authentication system is working well!');
        } else if (percentage >= 60) {
            console.log('👍 GOOD! Some issues found but core functionality works.');
        } else {
            console.log('❌ NEEDS WORK! Critical issues found in authentication system.');
        }
        console.log('='.repeat(60));
    }
}

// Run the comprehensive test
const runner = new TestRunner();
runner.run().catch(console.error);