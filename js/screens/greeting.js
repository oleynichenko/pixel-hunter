import GreetingView from './greeting-view';
import rules from './rules';

const greeting = new GreetingView();

greeting.onNext = function () {
  rules.showScreen();
};

export default greeting;
