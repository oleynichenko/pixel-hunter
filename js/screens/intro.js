import * as utils from '../utils';

import showScreen from '../show-screen';
import greetingScreen from './greeting';
import footer from '../footer.js';

export default () => {
  const introContent = `
    <div id="main" class="central__content">
      <div id="intro" class="intro">
        <h1 class="intro__asterisk">*</h1>
        <p class="intro__motto"><sup>*</sup> Это не фото. Это рисунок маслом нидерландского художника-фотореалиста Tjalf Sparnaay.</p>
      </div>
    </div>`;

  const template = `
    ${introContent}
    ${footer}`;

  const element = utils.makeDom(template);
  const introAsterix = element.querySelector(`.intro__asterisk`);

  introAsterix.addEventListener(`click`, () => {
    showScreen(greetingScreen());
  });

  return element;
};
