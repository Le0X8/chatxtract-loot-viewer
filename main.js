// EDIT HERE
const port = 12752;
// EDIT HERE

const http = require('http');
const colors = require('ansi-colors');
const fs = require('fs');
const server = http.createServer((request, response) => {
    if (request.url.startsWith('/api/')) {
        response.setHeader('Content-Type', 'application/json');
        if (request.url == '/api/loots') {
            if (fs.existsSync('./loot/')) {
                response.writeHead(200);
                response.end(JSON.stringify(fs.readdirSync('./loot/')));
                console.log(colors.green(`[200 OK] ${request.socket.remoteFamily} ${request.socket.remoteAddress}:${request.socket.remotePort} requested account ids.`));
            } else {
                response.writeHead(449);
                response.end('{"error": "noloot"}');
                console.log(colors.red(`[449 The request should be retried after doing the appropriate action] ${request.socket.remoteFamily} ${request.socket.remoteAddress}:${request.socket.remotePort} requested account ids but there is no loot.`));
            };
        };
        if (request.url.startsWith('/api/getdata')) {
            if (request.url.startsWith('/api/getdata/nobinary/')) {
                response.setHeader('Content-Type', 'application/json');
                if (request.url.includes('chat')) {
                    if(fs.existsSync('./loot/' + decodeURIComponent(request.url.split('_')[1]) + '/chats.json')) {
                        response.writeHead(200);
                        response.end(fs.readFileSync('./loot/' + decodeURIComponent(request.url.split('_')[1]) + '/chats.json'));
                        console.log(colors.green(`[200 OK] ${request.socket.remoteFamily} ${request.socket.remoteAddress}:${request.socket.remotePort} requested chat list from account ${decodeURIComponent(request.url.split('_')[1])}.`));
                    } else {
                        response.writeHead(400);
                        response.end('{"error": "invalid_id"}');
                        console.log(colors.red(`[400 Bad Request] ${request.socket.remoteFamily} ${request.socket.remoteAddress}:${request.socket.remotePort} requested chat list from account was not found ${decodeURIComponent(request.url.split('_')[1])}.`));
                    };
                };
                if (request.url.includes('contact')) {
                    if(fs.existsSync('./loot/' + decodeURIComponent(request.url.split('_')[1]) + '/contacts.json')) {
                        response.writeHead(200);
                        response.end(fs.readFileSync('./loot/' + decodeURIComponent(request.url.split('_')[1]) + '/contacts.json'));
                        console.log(colors.green(`[200 OK] ${request.socket.remoteFamily} ${request.socket.remoteAddress}:${request.socket.remotePort} requested contact list from account ${decodeURIComponent(request.url.split('_')[1])}.`));
                    } else {
                        response.writeHead(400);
                        response.end('{"error": "invalid_id"}');
                        console.log(colors.red(`[400 Bad Request] ${request.socket.remoteFamily} ${request.socket.remoteAddress}:${request.socket.remotePort} requested contact list from account was not found ${decodeURIComponent(request.url.split('_')[1])}.`));
                    };
                };
                if (request.url.includes('info')) {
                    if(fs.existsSync('./loot/' + decodeURIComponent(request.url.split('_')[1]) + '/clientinfo.json')) {
                        response.writeHead(200);
                        response.end(fs.readFileSync('./loot/' + decodeURIComponent(request.url.split('_')[1]) + '/clientinfo.json'));
                        console.log(colors.green(`[200 OK] ${request.socket.remoteFamily} ${request.socket.remoteAddress}:${request.socket.remotePort} requested client detail from account ${decodeURIComponent(request.url.split('_')[1])}.`));
                    } else {
                        response.writeHead(400);
                        response.end('{"error": "invalid_id"}');
                        console.log(colors.red(`[400 Bad Request] ${request.socket.remoteFamily} ${request.socket.remoteAddress}:${request.socket.remotePort} requested client detail from account was not found ${decodeURIComponent(request.url.split('_')[1])}.`));
                    };
                };
                if (request.url.includes('history')) {
                    if(fs.existsSync('./loot/' + decodeURIComponent(request.url.split('_')[1]) + '/chats/' + decodeURIComponent(request.url.split('_')[2]) + '.json')) {
                        response.writeHead(200);
                        response.end(fs.readFileSync('./loot/' + decodeURIComponent(request.url.split('_')[1]) + '/chats/' + decodeURIComponent(request.url.split('_')[2]) + '.json'));
                        console.log(colors.green(`[200 OK] ${request.socket.remoteFamily} ${request.socket.remoteAddress}:${request.socket.remotePort} requested chat history from chat ${decodeURIComponent(request.url.split('_')[2])} from account ${decodeURIComponent(request.url.split('_')[1])}.`));
                    } else {
                        response.writeHead(400);
                        response.end('{"error": "invalid_id_or_chat"}');
                        console.log(colors.red(`[400 Bad Request] ${request.socket.remoteFamily} ${request.socket.remoteAddress}:${request.socket.remotePort} failed to request chat history from chat ${decodeURIComponent(request.url.split('_')[2])} from account ${decodeURIComponent(request.url.split('_')[1])}.`));
                    };
                };
            };
            if (request.url.startsWith('/api/getdata/binary/')) {
                if(fs.existsSync('./loot/' + decodeURIComponent(request.url.split('_')[1]) + '/chats/' + decodeURIComponent(request.url.split('_')[2]) + '/' + decodeURIComponent(request.url.split('_')[3]))) {
                    response.setHeader('Content-Type', request.url.split('_')[3].split('.')[1].replace('Slash', '/'));
                    response.writeHead(200);
                    response.end(fs.readFileSync('./loot/' + decodeURIComponent(request.url.split('_')[1]) + '/chats/' + decodeURIComponent(request.url.split('_')[2]) + '/' + decodeURIComponent(request.url.split('_')[3])));
                    console.log(colors.green(`[200 OK] ${request.socket.remoteFamily} ${request.socket.remoteAddress}:${request.socket.remotePort} requested binary data #${decodeURIComponent(request.url.split('_')[3].split('.')[0])} (${request.url.split('_')[3].split('.')[1].replace('Slash', '/')}) from chat ${decodeURIComponent(request.url.split('_')[2])} from account ${decodeURIComponent(request.url.split('_')[1])}.`));
                };
            };
        };
    } else {
        response.setHeader('Content-Type', 'text/html');
        response.writeHead(200);
        response.end(fs.readFileSync('./webapp.html'));
    };
});
server.listen(port, '127.0.0.1', _ => {
    console.log(colors.yellow('Go into your browser and open http://127.0.0.1:' + port + '/.') + colors.white('\n\n---------- LOG ----------'));
});