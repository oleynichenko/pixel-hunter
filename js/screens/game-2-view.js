import {getLevel, getTaskHeader} from '../data/data';
import header from '../header.js';
import footer from '../footer.js';

import AbstractView from '../view.js';

export default class Game2View extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const level = getLevel(this.state.level);

    const levelContent = `
      <p class="game__task">${getTaskHeader(level.task)}</p>
      <form class="game__content  game__content--wide">
        <div class="game__option">
          <img src="${level.images[0].src}" alt="Option 1" width="705" height="455">
          <label class="game__answer  game__answer--photo">
            <input name="question1" type="radio" value="photo">
            <span>Фото</span>
          </label>
          <label class="game__answer game__answer--paint">
            <input name="question1" type="radio" value="paint">
            <span>Рисунок</span>
          </label>
        </div>
      </form>`;

    return `
      ${header(this.state)}
      <div class="game">
        ${levelContent}
      </div>
      ${footer}`;
  }

  bind() {
    const radioList = this.element.querySelectorAll(`input[type='radio']`);

    Array.from(radioList).forEach((item) => {
      item.addEventListener(`change`, () => {
        let answer1 = this.element.querySelector(`input[name='question1']:checked`);

        if (answer1) {
          this.onNext(this.state);
        }
      });
    });
  }
}
