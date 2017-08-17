import {getLevel, getTask, checkIsQuestion} from '../data/data'; // потом перенести сюда?
import AbstractView from '../view.js';
import header from '../header.js';
import footer from '../footer.js';

export default class LevelView extends AbstractView {
  constructor(state) {
    super();
    this.state = state;
    this.level = getLevel(this.state.level);
    this.task = getTask(this.level);
    this.hasQuestion = checkIsQuestion(this.task);
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
            console.log(elem);
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
      console.log(question);
        console.log(arr);
      return this._getCheckedInput(arr).value === this._getImageType(index);
    });
  }

  _isChoosenAnswerRight(num) {
    return this.level.images[num].type === `paint`;
  }

  _templateQuestion(num) {
    return `
      <label class="game__answer game__answer--photo">
        <input name="question-${num}" type="radio" value="photo">
        <span>Фото</span>
      </label>
      <label class="game__answer game__answer--paint">
        <input name="question-${num}" type="radio" value="paint">
        <span>Рисунок</span>
      </label>`;
  }

  _levelOption(photo, index) {
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
          ${this.level.images.map((value, index) => this._levelOption(value.src, index + 1)).join(``)}
        </form>
      </div>
      ${footer}`;
  }

  bind() {
    const gameContent = this.element.querySelector(`.game__content`);
    const gameOptions = this.element.querySelectorAll(`.game__option`);

    Array.from(gameOptions).forEach((option, optionIndex) => {
      option.addEventListener(`click`, (evt) => {
        if (this.hasQuestion && this._isAnswered(gameContent)) {
          this.onNext(this._isQuestionsAnswerRight(gameContent));
        }
        if (!this.hasQuestion) {
          this.onNext(this._isChoosenAnswerRight(optionIndex));
        }
      });
    });
  }
}
