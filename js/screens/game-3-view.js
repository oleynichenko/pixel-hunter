import {getLevel, getTaskHeader} from '../data/data';
import header from '../header.js';
import footer from '../footer.js';

import AbstractView from '../view.js';

export default class Game3View extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const level = getLevel(this.state.level);

    const levelOption = (photo) => `
      <div class="game__option">
        <img src="${photo}" alt="Option 1" width="304" height="455">
      </div>`;

    const levelContent = `
      <p class="game__task">${getTaskHeader(level.task)}</p>
      <form class="game__content  game__content--triple">
        ${level.images.map((value) => levelOption(value.src)).join(``)}
      </form>`;

    return `
      ${header(this.state)}
      <div class="game">
        ${levelContent}
      </div>
      ${footer}`;
  }

  bind() {
    const gameContent = this.element.querySelector(`.game__content`);

    gameContent.addEventListener(`click`, (event) => {
      if (event.target.classList.contains(`game__option`)) {
        this.onNext(this.state);
      }
    });
  }
}
