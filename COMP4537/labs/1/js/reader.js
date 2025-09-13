import message from '../lang/messages/en/user.js';
const localStorageList = document.getElementById('note-container');
const sleep = (ms) => new Promise(res => setTimeout(res, ms));

class Reader {
    constructor() {
        this.init();
    }
    
    async init() {
        while (true) {
            await sleep(5000);
            location.reload();
        }
    }

    showUpdateTime() {
        const updateMessage = document.createElement('p');
        updateMessage.textContent = message.readerUpdate + new Date().toLocaleTimeString();
        localStorageList.appendChild(updateMessage);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    localStorageList.innerHTML = '';
    
    const reader = new Reader();
    reader.showUpdateTime();

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        const input = document.createElement('input');
        input.classList.add('text-box');
        input.disabled = true;
        input.value = value;
        wrapper.appendChild(input);
        localStorageList.appendChild(wrapper);
    }

    if (localStorage.length === 0) {
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = message.emptyReader;
        localStorageList.appendChild(emptyMessage);
    }

});