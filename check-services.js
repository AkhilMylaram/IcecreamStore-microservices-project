// Check if all services are running
const services = [
    { name: 'API Gateway', url: 'http://localhost:8080' },
    { name: 'Auth Service', url: 'http://localhost:8081/api/auth/validate' },
    { name: 'User Service', url: 'http://localhost:8082/api/users/test' },
    { name: 'Frontend', url: 'http://localhost:3000' }
];

async function checkServices() {
    console.log('🔍 Checking Service Health...\n');

    for (const service of services) {
        try {
            const response = await fetch(service.url, {
                method: service.name === 'Auth Service' ? 'GET' : 'GET',
                headers: service.name === 'Auth Service' ? { 'Authorization': 'Bearer dummy' } : {}
            });
            
            console.log(`✅ ${service.name}: Running (Status: ${response.status})`);
        } catch (error) {
            console.log(`❌ ${service.name}: Not reachable - ${error.message}`);
        }
    }
}

checkServices().catch(console.error);