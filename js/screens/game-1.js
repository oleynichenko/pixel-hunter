import * as utils from '../utils.js';

import showScreen from '../show-screen';
import game2Screen from './game-2';
import footer from '../footer';
import header from '../header';
import statsBlock from '../stats-block';

export default (data) => {

  const game1 = data.games[0];

  const gameOption = (photo, index) => `
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

  const game1Content = `
    <p class="game__task">${game1.question}</p>
    <form class="game__content">
      ${game1.images.map((value, index) => gameOption(value, index + 1)).join(``)}
    </form>`;

  const template = `
    ${header(data.state)}
    <div class="game">
      ${game1Content}
      ${statsBlock(data.statList)}
    </div>
    ${footer}`;

  const section = utils.makeDom(template);
  const radioList = section.querySelectorAll(`input[type='radio']`);

  utils.backToIntro(section);

  Array.from(radioList).forEach((item) => {
    item.addEventListener(`change`, () => {
      let answer1 = section.querySelector(`input[name='question1']:checked`);
      let answer2 = section.querySelector(`input[name='question2']:checked`);

      if (answer1 && answer2) {
        showScreen(game2Screen(data));
      }
    });
  });

  return section;
};
