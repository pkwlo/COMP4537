const http = require('http');
const fs = require('fs');
let dateTime = require('./modules/utils');
let message = require('./lang/messages/en/user');

http.createServer((req, res) => {
    // creates a URL opbject that is built into node.js
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);

    //Part B
    if (reqUrl.pathname === '/getDate/') {
        let name = reqUrl.searchParams.get('name') || 'Guest';
        let dateTimeStr = dateTime.getDateTime();

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(message.getMessage(name, dateTimeStr) + '\n');
    } 
    //Part C.1
    else if (reqUrl.pathname === '/writeFile/') {
        let text = reqUrl.searchParams.get('text') || 'Default Text';
        
        fs.appendFile('file.txt', text + '\n', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error writing to file.\n');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('The file has been updated!\n');
        });
    } 
    //Part C.2
    else if (reqUrl.pathname.startsWith('/readFile/')) {
        let fileName = reqUrl.pathname.replace('/readFile/', '');

        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(`404 Not Found: ${fileName}\n`);
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
    }
}).listen(3000, () => {
    console.log('Server running at http://localhost:3000/');
});
