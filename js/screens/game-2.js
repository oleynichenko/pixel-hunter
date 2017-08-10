import * as utils from '../utils';

import showScreen from '../show-screen';
import game3Screen from './game-3';
import footer from '../footer.js';
import header from '../header.js';
import statsBlock from '../stats-block';

export default (data) => {

  const game2 = data.games[1];
  const game2Content = `
    <p class="game__task">${game2.question}</p>
    <form class="game__content  game__content--wide">
      <div class="game__option">
        <img src="${game2.images}" alt="Option 1" width="705" height="455">
        <label class="game__answer  game__answer--photo">
          <input name="question1" type="radio" value="photo">
          <span>Фото</span>
        </label>
        <label class="game__answer  game__answer--wide  game__answer--paint">
          <input name="question1" type="radio" value="paint">
          <span>Рисунок</span>
        </label>
      </div>
    </form>`;

  const template = `
    ${header(data.state)}
    <div class="game">
      ${game2Content}
      ${statsBlock(data.statList)}
    </div>
    ${footer}`;
  const element = utils.makeDom(template);
  const radioList = element.querySelectorAll(`input[type='radio']`);

  utils.backToIntro(element);

  Array.from(radioList).forEach((item) => {
    item.addEventListener(`change`, () => {
      let answer1 = element.querySelector(`input[name='question1']:checked`);

      if (answer1) {
        showScreen(game3Screen(data));
      }
    });
  });

  return element;
};
