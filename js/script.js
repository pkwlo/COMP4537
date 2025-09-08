import Message from '../lang/messages/en/user.js'

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

function getRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

class RandomButton {
  constructor(order, container) {
    this.order = order;
    this.container = container;

    this.el = document.createElement('button');
    this.el.textContent = String(order);
    this.el.dataset.num = String(order);
    this.el.className = 'memory-btn';
    Object.assign(this.el.style, {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '10em',
      height: '5em',
      margin: '10px',
      border: '2px solid rgba(0,0,0,.2)',
      fontWeight: '700',
      fontSize: '1.25rem',
      userSelect: 'none',
      cursor: 'default',
      transition: 'left .2s ease, top .2s ease, transform .15s ease',
      backgroundColor: getRandomColor()
    });

    container.appendChild(this.el);
  }

  get w() { return this.el.offsetWidth || 160; }
  get h() { return this.el.offsetHeight || 80; }

  setLocation(top, left) {
    this.el.style.top  = typeof top  === 'number' ? `${top}px`  : top;
    this.el.style.left = typeof left === 'number' ? `${left}px` : left;
  }

  randomInside() {
    const {width, height} = this.container.getBoundingClientRect();
    const maxX = Math.max(0, width  - this.w);
    const maxY = Math.max(0, height - this.h);
    const x = Math.floor(Math.random() * (maxX + 1));
    const y = Math.floor(Math.random() * (maxY + 1));
    this.setLocation(y, x);
  }

  hideNumber(on = true) {
    this.el.style.color = on ? 'transparent' : '';
    this.el.style.textShadow = on ? 'none' : '';
  }

  setClickable(on) {
    this.el.disabled = !on;
    this.el.style.cursor = on ? 'pointer' : 'default';
  }
}

class Game {
  constructor(container) {
    this.container = container;
    this.buttons   = [];
    this.expected  = [];
    this.progress  = 0;

    this._onClick = this._onClick.bind(this);

    Object.assign(this.container.style, {
      position: 'relative',
      minHeight: '320px',
      overflow: 'hidden'
    });
  }

  reset() {
    this.container.innerHTML = '';
    this.buttons  = [];
    this.expected = [];
    this.progress = 0;
  }

  async start(n) {
    this.reset();

    for (let i = 1; i <= n; i++) {
      const b = new RandomButton(i, this.container);
      this.buttons.push(b);
      this.expected.push(String(i));
    }

    await sleep(n * 1000);

    this._snapToAbsolute();

    for (let i = 0; i < n; i++) {
      this.buttons.forEach(b => b.randomInside());
      await sleep(2000);
    }

    this.buttons.forEach(b => {
      b.hideNumber(true);
      b.setClickable(true);
      b.el.addEventListener('click', this._onClick);
    });
  }

  _snapToAbsolute() {
    const base = this.container.getBoundingClientRect();
    this.buttons.forEach(b => {
      const r = b.el.getBoundingClientRect();
      const left = r.left - base.left + this.container.scrollLeft;
      const top  = r.top  - base.top  + this.container.scrollTop;
      b.el.style.position = 'absolute';
      b.el.style.margin = '0';
      b.setLocation(top, left);
    });
  }

  _onClick(e) {
    const want = this.expected[this.progress];
    const btn  = e.currentTarget;

    if (btn.dataset.num === want) {
      btn.style.outline = '3px solid #2e7d32';
      btn.style.cursor = 'default';
      btn.removeEventListener('click', this._onClick);
      btn.style.color = '';
      this.progress++;

      if (this.progress === this.expected.length) {
        this._revealAll();
        alert(Message.displayResult(true));
        this._end();
      }
    } else {
      btn.style.outline = '3px solid #b00020';
      this._revealAll();
      alert(Message.displayResult(false));
      this._end();
    }
  }

  _revealAll() {
    this.buttons.forEach(b => { b.hideNumber(false); b.setClickable(false); });
  }

  _end() {
    this.buttons.forEach(b => b.el.removeEventListener('click', this._onClick));
  }
}

const input = document.getElementById('buttonCount');
const startGame = document.getElementById('createButton');
const board = document.getElementById('buttonContainer');
const game = new Game(board);

startGame.addEventListener('click', () => {
  const userInput = parseInt(input.value, 10);
  if (!Number.isInteger(userInput) || userInput < 3 || userInput > 7) {
    alert(Message.displayIncorrectBoxesMessage());
    return;
  }
  game.start(userInput);
});
