import RulesView from './rules-view';
import changeLevel from './level';

const rules = new RulesView();

rules.onNext = function () {
  changeLevel().showScreen();
};

export default rules;
