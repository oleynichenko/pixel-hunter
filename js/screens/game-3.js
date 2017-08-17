import Game3View from './game-3-view';
import {initialState} from '../data/data';
import stats from './stats';

const game3 = new Game3View(initialState);

game3.onNext = function (state) {
  stats.showScreen();
};

export default game3;
