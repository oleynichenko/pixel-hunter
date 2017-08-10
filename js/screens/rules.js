import * as utils from '../utils';
import * as data from '../data.js';

import showScreen from '../show-screen';
import game1Screen from './game-1';
import footer from '../footer.js';
import header from '../header.js';

export default () => {
  const rulesContent = `
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
    </div>`;

  const template = `
    ${header()}
    ${rulesContent}
    ${footer}`;

  const element = utils.makeDom(template);
  const rulesBtn = element.querySelector(`.rules__button`);
  const rulesInput = element.querySelector(`.rules__input`);

  utils.backToIntro(element);

  rulesInput.addEventListener(`input`, () => {
    rulesBtn.disabled = rulesInput.value.length === 0;
  });

  rulesBtn.addEventListener(`click`, () => {
    event.preventDefault();
    showScreen(game1Screen(data));
  });

  return element;
};
