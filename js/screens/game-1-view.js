import {getLevel, getTaskHeader} from '../data/data';
import header from '../header.js';
import footer from '../footer.js';
// import statsBlock from '../stats-block';
import AbstractView from '../view.js';

export default class Game1View extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
  }

  get template() {
    const level = getLevel(this.state.level);

    const levelOption = (photo, index) => `
      <div class="game__option">
        <img src="${photo}" alt="Option ${index}">
        <label class="game__answer game__answer--photo">
          <input name="question${index}" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer game__answer--paint">
          <input name="question${index}" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>`;

    const levelContent = `
      <p class="game__task">${getTaskHeader(level.task)}</p>
      <form class="game__content">
        ${level.images.map((value, index) => levelOption(value.src, index + 1)).join(``)}
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
        let answer2 = this.element.querySelector(`input[name='question2']:checked`);

        if (answer1 && answer2) {
          this.onNext();
        }
      });
    });
  }
}
