import Game2View from './game-2-view';
import {initialState} from '../data/data';
import game3 from './game-3';

const game2 = new Game2View(initialState);

game2.onNext = function (state) {
  game3.showScreen(state);
};

export default game2;
