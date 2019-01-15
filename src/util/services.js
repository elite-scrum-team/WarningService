const fetch = require('node-fetch');
const querystring = require('querystring');

module.exports = {
    fetch: {
        async post(serviceName, path, query, body, userId = undefined) {
            if (userId) query['internalUserId'] = userId;
            let url = `http://${
                process.env[serviceName.toUpperCase() + '_SERVICE_SERVICE_HOST']
            }/api/v1/${path}`;
            const qs = querystring.stringify(query);
            if (qs) url += `?${qs}`;
            return await fetch(url, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
        },
        async get(serviceName, path, query, userId = undefined) {
            if (userId) query['internalUserId'] = userId;
            let url = `http://${
                process.env[serviceName.toUpperCase() + '_SERVICE_SERVICE_HOST']
            }/api/v1/${path}`;
            const qs = querystring.stringify(query);
            if (qs) url += `?${qs}`;
            return await fetch(url, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            });
        },
    },
};
