import message from '../lang/messages/en/user.js';

document.title = message.title;
document.getElementById('header').textContent = message.header;
document.getElementById('name').textContent = message.name;
document.getElementById('studentId').textContent = message.studentId;
document.getElementById('writerButton').textContent = message.writer;
document.getElementById('readerButton').textContent = message.reader;