import Game1View from './game-1-view';
import {initialState} from '../data/data';
import game2 from './game-2';


const game1 = new Game1View(initialState);

game1.onNext = function (state) {
  game2.showScreen(state);
};

export default game1;
