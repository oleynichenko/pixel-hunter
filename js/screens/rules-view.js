import header from '../header.js';
import footer from '../footer.js';
import AbstractView from '../view.js';

export default class RulesView extends AbstractView {

  get template() {
    return `
    ${header()}
    <div class="rules">
      <h1 class="rules__title">Правила</h1>
      <p class="rules__description">Угадай 10 раз для каждого изображения фото <img
        src="img/photo_icon.png" width="16" height="16"> или рисунок <img
        src="img/paint_icon.png" width="16" height="16" alt="">.<br>
        Фотографиями или рисунками могут быть оба изображения.<br>
        На каждую попытку отводится 30 секунд.<br>
        Ошибиться можно не более 3 раз.<br>
        <br>
        Готовы?
      </p>
      <form class="rules__form">
        <input class="rules__input" type="text" placeholder="Ваше Имя">
        <button class="rules__button  continue" type="submit" disabled>Go!</button>
      </form>
    </div>
    ${footer}`;
  }

  bind() {
    const rulesBtn = this.element.querySelector(`.rules__button`);
    const rulesInput = this.element.querySelector(`.rules__input`);

    rulesInput.addEventListener(`input`, () => {
      rulesBtn.disabled = rulesInput.value.length === 0;
    });

    rulesBtn.addEventListener(`click`, () => {
      event.preventDefault();
      this.onNext(rulesInput.value);
    });

    const headerBack = this.element.querySelector(`.header__back`);
    headerBack.addEventListener(`click`, (evt) => {
      event.preventDefault();
      this.onHeaderBack();
    });
  }
}
