// Docker Setup Verification Script
// This script verifies that all Docker services are properly configured

const fs = require('fs');
const path = require('path');

console.log('🔍 DOCKER SETUP VERIFICATION');
console.log('=' .repeat(50));

const checks = [];

// Check 1: Docker Compose file exists and has correct structure
try {
    const dockerCompose = fs.readFileSync('docker-compose.yml', 'utf8');
    
    // Check for all required services
    const requiredServices = [
        'api-gateway', 'auth-service', 'user-service', 'product-service',
        'order-service', 'payment-service', 'inventory-service', 
        'notification-service', 'admin-service', 'frontend'
    ];
    
    const missingServices = requiredServices.filter(s => !dockerCompose.includes(`${s}:`));
    
    if (missingServices.length === 0) {
        checks.push({ name: 'Docker Compose Services', status: '✅ PASS', details: 'All 10 services defined' });
    } else {
        checks.push({ name: 'Docker Compose Services', status: '❌ FAIL', details: `Missing: ${missingServices.join(', ')}` });
    }
    
    // Check for health checks
    const healthCheckCount = (dockerCompose.match(/healthcheck:/g) || []).length;
    if (healthCheckCount >= 8) {
        checks.push({ name: 'Health Checks', status: '✅ PASS', details: `${healthCheckCount} services have health checks` });
    } else {
        checks.push({ name: 'Health Checks', status: '⚠️ WARN', details: `Only ${healthCheckCount} services have health checks` });
    }
    
    // Check CORS configuration in docker-compose
    if (dockerCompose.includes('NEXT_PUBLIC_API_URL: http://localhost:8080')) {
        checks.push({ name: 'Frontend Environment', status: '✅ PASS', details: 'Correct API URL configured' });
    } else {
        checks.push({ name: 'Frontend Environment', status: '❌ FAIL', details: 'Incorrect API URL' });
    }
    
} catch (error) {
    checks.push({ name: 'Docker Compose File', status: '❌ FAIL', details: 'File not found or unreadable' });
}

// Check 2: Dockerfiles exist and are properly configured
const dockerfiles = [
    { service: 'API Gateway', path: 'api-gateway-dotnet/Dockerfile' },
    { service: 'Auth Service', path: 'auth-service-java/Dockerfile' },
    { service: 'User Service', path: 'user-service-java/Dockerfile' },
    { service: 'Order Service', path: 'order-service-java/Dockerfile' },
    { service: 'Inventory Service', path: 'inventory-service-java/Dockerfile' },
    { service: 'Payment Service', path: 'payment-service-dotnet/Dockerfile' },
    { service: 'Admin Service', path: 'admin-service-dotnet/Dockerfile' },
    { service: 'Product Service', path: 'product-service-python/Dockerfile' },
    { service: 'Notification Service', path: 'notification-service-python/Dockerfile' },
    { service: 'Frontend', path: 'frontend-nextjs/Dockerfile' }
];

let dockerfileCount = 0;
dockerfiles.forEach(({ service, path }) => {
    try {
        if (fs.existsSync(path)) {
            dockerfileCount++;
        } else {
            checks.push({ name: `${service} Dockerfile`, status: '❌ FAIL', details: 'File missing' });
        }
    } catch (error) {
        checks.push({ name: `${service} Dockerfile`, status: '❌ FAIL', details: 'Cannot access file' });
    }
});

if (dockerfileCount === 10) {
    checks.push({ name: 'Dockerfiles', status: '✅ PASS', details: 'All 10 Dockerfiles present' });
}

// Check 3: Java services have Actuator added
const javaServices = [
    { service: 'Auth Service', pom: 'auth-service-java/pom.xml' },
    { service: 'User Service', pom: 'user-service-java/pom.xml' },
    { service: 'Order Service', pom: 'order-service-java/pom.xml' },
    { service: 'Inventory Service', pom: 'inventory-service-java/pom.xml' }
];

let actuatorCount = 0;
javaServices.forEach(({ service, pom }) => {
    try {
        const content = fs.readFileSync(pom, 'utf8');
        if (content.includes('spring-boot-starter-actuator')) {
            actuatorCount++;
        } else {
            checks.push({ name: `${service} Actuator`, status: '❌ FAIL', details: 'Missing Actuator dependency' });
        }
    } catch (error) {
        checks.push({ name: `${service} Actuator`, status: '❌ FAIL', details: 'POM file not found' });
    }
});

if (actuatorCount === 4) {
    checks.push({ name: 'Java Actuator', status: '✅ PASS', details: 'All Java services have Actuator' });
}

// Check 4: Java services have application.yml with management config
const javaAppYmls = [
    { service: 'Auth Service', path: 'auth-service-java/src/main/resources/application.yml' },
    { service: 'User Service', path: 'user-service-java/src/main/resources/application.yml' },
    { service: 'Order Service', path: 'order-service-java/src/main/resources/application.yml' },
    { service: 'Inventory Service', path: 'inventory-service-java/src/main/resources/application.yml' }
];

let ymlConfigCount = 0;
javaAppYmls.forEach(({ service, path }) => {
    try {
        const content = fs.readFileSync(path, 'utf8');
        if (content.includes('management:') && content.includes('health')) {
            ymlConfigCount++;
        } else {
            checks.push({ name: `${service} Config`, status: '❌ FAIL', details: 'Missing management config' });
        }
    } catch (error) {
        checks.push({ name: `${service} Config`, status: '❌ FAIL', details: 'YML file not found' });
    }
});

if (ymlConfigCount === 4) {
    checks.push({ name: 'Management Config', status: '✅ PASS', details: 'All Java services configured' });
}

// Check 5: Python services have CORS middleware
const pythonServices = [
    { service: 'Product Service', main: 'product-service-python/app/main.py' },
    { service: 'Notification Service', main: 'notification-service-python/app/main.py' }
];

let pythonCorsCount = 0;
pythonServices.forEach(({ service, main }) => {
    try {
        const content = fs.readFileSync(main, 'utf8');
        if (content.includes('CORSMiddleware')) {
            pythonCorsCount++;
        } else {
            checks.push({ name: `${service} CORS`, status: '❌ FAIL', details: 'Missing CORS middleware' });
        }
    } catch (error) {
        checks.push({ name: `${service} CORS`, status: '❌ FAIL', details: 'Main file not found' });
    }
});

if (pythonCorsCount === 2) {
    checks.push({ name: 'Python CORS', status: '✅ PASS', details: 'All Python services have CORS' });
}

// Check 6: .NET services have CORS configuration
const dotnetServices = [
    { service: 'Payment Service', program: 'payment-service-dotnet/Program.cs' },
    { service: 'Admin Service', program: 'admin-service-dotnet/Program.cs' },
    { service: 'API Gateway', program: 'api-gateway-dotnet/Program.cs' }
];

let dotnetCorsCount = 0;
dotnetServices.forEach(({ service, program }) => {
    try {
        const content = fs.readFileSync(program, 'utf8');
        if (content.includes('AddCors') || content.includes('UseCors')) {
            dotnetCorsCount++;
        } else {
            checks.push({ name: `${service} CORS`, status: '❌ FAIL', details: 'Missing CORS configuration' });
        }
    } catch (error) {
        checks.push({ name: `${service} CORS`, status: '❌ FAIL', details: 'Program.cs not found' });
    }
});

if (dotnetCorsCount === 3) {
    checks.push({ name: '.NET CORS', status: '✅ PASS', details: 'All .NET services have CORS' });
}

// Check 7: Frontend API configuration
try {
    const apiFile = fs.readFileSync('frontend-nextjs/src/lib/api.ts', 'utf8');
    if (apiFile.includes('formattedEndpoint') && apiFile.includes('/api${endpoint}')) {
        checks.push({ name: 'Frontend API Config', status: '✅ PASS', details: 'API path handling fixed' });
    } else {
        checks.push({ name: 'Frontend API Config', status: '❌ FAIL', details: 'API path handling not fixed' });
    }
} catch (error) {
    checks.push({ name: 'Frontend API Config', status: '❌ FAIL', details: 'API file not found' });
}

// Check 8: Auth Service fixes
try {
    const authService = fs.readFileSync('auth-service-java/src/main/java/com/icecream/auth/service/AuthenticationService.java', 'utf8');
    if (authService.includes('repository.findByEmail(request.getEmail()).isPresent()')) {
        checks.push({ name: 'Auth Service Logic', status: '✅ PASS', details: 'Duplicate user check added' });
    } else {
        checks.push({ name: 'Auth Service Logic', status: '❌ FAIL', details: 'Missing duplicate check' });
    }
} catch (error) {
    checks.push({ name: 'Auth Service Logic', status: '❌ FAIL', details: 'Service file not found' });
}

// Print results
console.log('\n📋 VERIFICATION RESULTS:');
console.log('=' .repeat(50));

let passCount = 0;
let failCount = 0;
let warnCount = 0;

checks.forEach(check => {
    console.log(`${check.status} ${check.name}`);
    console.log(`   ${check.details}`);
    
    if (check.status.includes('✅')) passCount++;
    else if (check.status.includes('❌')) failCount++;
    else if (check.status.includes('⚠️')) warnCount++;
});

console.log('\n' + '=' .repeat(50));
console.log(`SUMMARY: ${passCount} passed, ${failCount} failed, ${warnCount} warnings`);

if (failCount === 0) {
    console.log('\n🎉 ALL CHECKS PASSED! Your Docker setup is ready.');
    console.log('\nNext steps:');
    console.log('1. Run: docker-compose up -d --build');
    console.log('2. Wait 30 seconds for services to start');
    console.log('3. Run: node comprehensive-test.js');
    console.log('4. Open: http://localhost:3000');
} else {
    console.log('\n❌ Some checks failed. Please fix the issues above.');
    process.exit(1);
}