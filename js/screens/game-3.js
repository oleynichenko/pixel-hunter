import * as utils from '../utils.js';

import showScreen from '../show-screen';
import stats from './stats';
import header from '../header.js';
import statsBlock from '../stats-block';
import footer from '../footer.js';

export default (data) => {

  const game3 = data.games[2];

  const game3Option = (photo) => `
    <div class="game__option">
      <img src="${photo}" alt="Option 1" width="304" height="455">
    </div>`;

  const game3Content = `
    <p class="game__task">${game3.question}</p>
    <form class="game__content  game__content--triple">
      ${game3.images.map((value) => game3Option(value)).join(``)}
    </form>`;

  const template = `
    ${header(data.state)}
    <div class="game">
      ${game3Content}
      ${statsBlock(data.statList)}
    </div>
    ${footer}`;

  const element = utils.makeDom(template);
  const gameContent = element.querySelector(`.game__content`);

  utils.backToIntro(element);

  gameContent.addEventListener(`click`, (event) => {
    if (event.target.classList.contains(`game__option`)) {
      showScreen(stats(data));
    }
  });

  return element;
};
