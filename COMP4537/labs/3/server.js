const http = require('http');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3000;

let dateTime = require('./modules/utils');
let message = require('./lang/messages/en/user');

// Base URL path since render does not care about local folders
const BASE_PATH = '/COMP4537/labs/3';

// Directory to store/read files
const FILE_DIR = path.join(__dirname);

http.createServer((req, res) => {
    const reqUrl = new URL(req.url, `http://${req.headers.host}`);

    // Part B
    if (reqUrl.pathname === `${BASE_PATH}/getDate/`) {
        let name = reqUrl.searchParams.get('name') || 'Guest';
        let dateTimeStr = dateTime.getDateTime();

        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(message.getMessage(name, dateTimeStr) + '\n');
    } 
    // Part C.1
    else if (reqUrl.pathname === `${BASE_PATH}/writeFile/`) {
        let text = reqUrl.searchParams.get('text') || 'Default Text';
        const filePath = path.join(FILE_DIR, 'file.txt');

        fs.appendFile(filePath, text + '\n', (err) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Error writing to file.\n');
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('The file has been updated!\n');
        });
    } 
    // Part C.2
    else if (reqUrl.pathname.startsWith(`${BASE_PATH}/readFile/`)) {
        let fileName = reqUrl.pathname.replace(`${BASE_PATH}/readFile/`, '');
        const filePath = path.join(FILE_DIR, fileName);

        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(404, { 'Content-Type': 'text/plain' });
                res.end(`404 Not Found: ${fileName}\n`);
                return;
            }
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end(data);
        });
    } 
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found\n');
    }
}).listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
