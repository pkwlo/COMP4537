import message from '../lang/messages/en/user.js';

const notes = document.getElementById("note-container")
const add = document.getElementById("add")

class Writer {
    constructor() {
        this.id = 0;
    }

    addNote() {
        this.id++;

        const wrapper = document.createElement('div');
        wrapper.classList.add('wrapper');
        wrapper.id = `input-${this.id}`;
        const input = document.createElement('input');
        input.placeholder = message.placeholder;
        input.classList.add('text-box');

        this.saveNote(input);

        const button = this.addDeleteButton();

        wrapper.appendChild(input);
        wrapper.appendChild(button);
        notes.appendChild(wrapper);

    }

    addDeleteButton() {
        const button = document.createElement('button');
        button.classList.add('button')
        button.id = 'remove';
        button.textContent = message.remove;
        button.addEventListener('click', () => {
            const parentElement = button.parentElement;
            const elementToRemove = document.getElementById(`${parentElement.id}`);
            if(elementToRemove) {
                elementToRemove.remove();
                localStorage.removeItem(`note-${parentElement.id}`)
                location.reload();
            }
        });
        return button;
    }

    saveNote(input) {
        input.addEventListener('blur', () => {
        const text = input.value;
        const parentElement = input.parentElement;
        if (text) {
            localStorage.setItem(`note-${parentElement.id}`, text);
        } 
        location.reload();})
    }

    checkEmpty() {
        if (localStorage.length === 0) {
            const emptyMessage = document.createElement('p');
            emptyMessage.textContent = message.emptyWriter;
            notes.appendChild(emptyMessage);
        }
    }

    showAllNotes() {
        const length = localStorage.length;
        this.id = length;
        this.checkEmpty();

        for (let i = 0; i < length; i++) {
            const key = localStorage.key(i);
            const value = localStorage.getItem(key);

            const wrapper = document.createElement('div');
            wrapper.classList.add('wrapper');
            wrapper.id = `input-${i+1}`;

            const input = document.createElement('input');
            input.classList.add('text-box');
            input.value = value;

            this.saveNote(input);
            const button = this.addDeleteButton();

            wrapper.appendChild(input);
            wrapper.appendChild(button);
            notes.appendChild(wrapper);
        }

    }
}

const writer = new Writer();

writer.showAllNotes();

add.addEventListener('click',() => {
    writer.addNote();
});