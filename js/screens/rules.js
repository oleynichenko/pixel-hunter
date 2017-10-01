import RulesView from './rules-view';
import app from '../app';
import model from '../model';

class Rules {
  constructor() {
    this._view = new RulesView();
  }

  init() {
    this._view.onNext = function (name) {
      app.level();
      model.userName = name;
    };

    this._view.onHeaderBack = () => {
      app.reload();
    };

    this._view.showScreen();
  }
}

const rules = new Rules();

export default rules;
