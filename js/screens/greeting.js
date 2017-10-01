import GreetingView from './greeting-view';
import app from '../app';

class Greeting {
  constructor() {
    this._view = new GreetingView();
  }

  init() {
    this._view.onNext = function () {
      app.showRules();
    };

    this._view.showScreen();
  }
}

const greeting = new Greeting();

export default greeting;
