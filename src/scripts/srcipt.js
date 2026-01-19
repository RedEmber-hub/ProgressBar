class Progress {
  constructor(root) {
    this.$root = root;

    this.state = {
      value: 0,
      animated: false,
      hidden: false,
    };

    this.radius = 40;
    this.circumference = 2 * Math.PI * this.radius;

    this.#render();
    this.#update();
  }

  #render() {
    this.$progress = document.createElement('div');
    this.$progress.className = 'progress';

    this.$progress.innerHTML = `
      <svg viewBox="0 0 100 100">
        <circle class="progress__track" cx="50" cy="50" stroke-width="10" r="${this.radius}" fill="none"></circle>
        <circle class="progress__indicator" cx="50" cy="50" stroke-width="10" r="${this.radius}" transform="rotate(-90)" fill="none"></circle>
      </svg>
    `;

    this.$indicator = this.$progress.querySelector('.progress__indicator');
    this.$indicator.style.strokeDasharray = this.circumference;

    this.$root.append(this.$progress);
  }

  #update() {
    const offset = this.circumference * (1 - this.state.value / 100);

    this.$indicator.style.strokeDashoffset = offset;

    this.$progress.classList.toggle('animated', this.state.animated);
    this.$progress.classList.toggle('hidden', this.state.hidden);
  }

  setValue(value) {
    this.state.value = Math.max(0, Math.min(100, value));

    this.#update();
  }

  setAnimated(value) {
    this.state.animated = !!value;

    this.#update();
  }

  setHidden(value) {
    this.state.hidden = !!value;

    this.#update();
  }
}

const root = document.getElementById('progress-bar');
const controls = document.querySelector('.controls');
const valueInput = document.getElementById('value');

const progress = new Progress(root);
const input = document.querySelector('input');

progress.setValue(valueInput.value);

controls.addEventListener('change', (event) => {
  const type = event.target.dataset.type;

  switch (type) {
    case 'value':
      progress.setValue(event.target.value);
      break;
    case 'animate':
      progress.setAnimated(event.target.checked);
      break;
    case 'hide':
      progress.setHidden(event.target.checked);
      break;
  }
});

input.addEventListener('input', ({ target }) => {
  if (target.value > 100) {
    target.value = 100;
  } else if (target.value < 0) {
    target.value = 0;
  }
});
