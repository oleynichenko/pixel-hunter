import showScreen from './show-screen';
import introScreen from './screens/intro';

export const makeDom = (string, tag = `section`) => {
  const elem = document.createElement(tag);
  elem.innerHTML = string;
  return elem;
};

export const backToIntro = (parent) => {
  parent.querySelector(`.back`).addEventListener(`click`, () => {
    showScreen(introScreen);
  });
};

