import http from 'http';

const PORT = 3000;

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const makeRequest = (data) => {
    return new Promise((resolve, reject) => {
        const options = {
            hostname: 'localhost',
            port: PORT,
            path: '/api/email-template',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                resolve({ status: res.statusCode, body: JSON.parse(body) });
            });
        });

        req.on('error', (e) => {
            console.error('Request Error:', e.message);
            reject(e);
        });

        req.write(JSON.stringify(data));
        req.end();
    });
};

const runTests = async () => {
    console.log('Running tests against localhost:' + PORT);

    console.log('\nTest 1: Valid Request');
    try {
        const res1 = await makeRequest({
            purpose: 'welcome new customer',
            recipient_name: 'Alice',
            tone: 'friendly'
        });
        console.log('Status:', res1.status);
        console.log('Body:', JSON.stringify(res1.body, null, 2));
    } catch (e) {
        console.error('Test 1 Failed to connect');
    }

    console.log('\nTest 2: Invalid Request (Missing fields)');
    try {
        const res2 = await makeRequest({
            purpose: 'welcome'
        });
        console.log('Status:', res2.status);
        console.log('Body:', JSON.stringify(res2.body, null, 2));
    } catch (e) {
        console.error('Test 2 Failed to connect');
    }
};

runTests();
