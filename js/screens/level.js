import LevelView from './level-view';
import model from '../model';
import dataAdapter from '../data/data-adapter';
import {Rules, getNextState, getLevelResult} from '../data/data';
import app from '../app';

export default class GamePresenter {
  constructor(state, data) {
    this.state = state;
    this.data = data;
    this._view = new LevelView(this.state, this.data);
  }

  init() {
    this._view.onNext = (isAnswerRight, time) => {
      const levelResult = getLevelResult(isAnswerRight, time);
      const nextState = getNextState(this.state, levelResult);
      this.state.lives -= 1;

      if (nextState.level <= Rules.LEVELS_QUANTITY && nextState.lives > 0) {
        const nextLevel = new GamePresenter(nextState, this.data);
        nextLevel.init();
      } else {
        model.send(this.state, dataAdapter)
          .then(app.showStats);
      }
    };

    this._view.onHeaderBack = () => {
      app.reload();
    };

    this._view.showScreen();
  }
}
