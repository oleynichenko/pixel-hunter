import {getLevel, getTask, checkIsQuestion} from '../data/data'; // потом перенести сюда?
import AbstractView from '../view.js';
import header from '../header.js';
import footer from '../footer.js';

export default class LevelView extends AbstractView {
  constructor(state, data) {
    super();
    this.state = state;
    this.level = getLevel(this.state.level, data);
    this.task = getTask(this.level);
    this.hasQuestion = checkIsQuestion(this.task);
    this.time = this.state.time;
  }

  _getImageType(num) {
    return this.level.images[num].type;
  }

  // возвращает input с именем name с формы form
  _getInputElements(form, name) {
    return Array.from(form.elements[name]);
  }

  // возвращает выбранный input
  _getCheckedInput(arr) {
    const elem = arr.find((input) => input.checked);
    return elem;
  }

  _isAnswered(form) {
    return this.task.questions.every((question) => {
      return this._getInputElements(form, question).some((input) => input.checked);
    });
  }

  _isQuestionsAnswerRight(form) {
    return this.task.questions.every((question, index) => {
      const arr = this._getInputElements(form, question);
      return this._getCheckedInput(arr).value === this._getImageType(index);
    });
  }

  _isChoosenAnswerRight(num) {
    return this.level.images[num].type === `painting`;
  }

  _templateQuestion(num) {
    return `
      <label class="game__answer game__answer--photo">
        <input name="question-${num}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question-${num}" type="radio" value="painting">
        <span>Рисунок</span>
      </label>`;
  }

  _templateGameOption(photo, index) {
    return `
      <div class="game__option">
        <img src="${photo}" alt="Option ${index}">
        ${(this.hasQuestion) ? this._templateQuestion(index) : ``}
      </div>`;
  }

  get template() {
    return `
      ${header(this.state)}
      <div class="game">
        <p class="game__task">${this.task.title}</p>
        <form class="game__content ${this.task.class}">
          ${this.level.images.map((value, index) => this._templateGameOption(value.src, index + 1)).join(``)}
        </form>
      </div>
      <div class="stats">
        <ul class="stats">
          ${this.state.results.map((item) => `<li class="stats__result stats__result--${item}"></li>`).join(``)}
        </ul>
      </div>
      ${footer}`;
  }

  bind() {

    // установка таймера времени
    const gameTimer = this.element.querySelector(`.game__timer`);

    const timer = setInterval(() => {
      this.time--;
      gameTimer.innerHTML = `${this.time}`;
      if (this.time === 0) {
        clearInterval(timer);
        this.onNext(false, this.time);
      }
    }, 1000);

    const gameContent = this.element.querySelector(`.game__content`);
    const gameOptions = this.element.querySelectorAll(`.game__option`);

    Array.from(gameOptions).forEach((option, optionIndex) => {
      option.addEventListener(`click`, (event) => {
        if (this.hasQuestion && this._isAnswered(gameContent)) {
          clearInterval(timer);
          this.onNext(this._isQuestionsAnswerRight(gameContent), this.time);
        }
        if (!this.hasQuestion) {
          clearInterval(timer);
          this.onNext(this._isChoosenAnswerRight(optionIndex), this.time);
        }
      });
    });

    // обработка возврата на начальный экрн
    const headerBack = this.element.querySelector(`.header__back`);

    headerBack.addEventListener(`click`, (event) => {
      event.preventDefault(event);
      this.onHeaderBack();
    });

  }
}
