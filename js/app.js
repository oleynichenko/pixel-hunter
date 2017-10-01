import model from './model';
import {initialState, PassOptions, Rules} from './data/data';
import dataAdapter from './data/data-adapter';
import intro from './screens/intro';
import greeting from './screens/greeting';
import rules from './screens/rules';
import GamePresenter from './screens/level';
import Stats from './screens/stats';


const ControllerID = {
  GREETING: ``,
  RULES: `rules`,
  GAME: `game`,
  STATS: `stats`
};

class App {
  constructor() {
    model.load(dataAdapter)
      .then((data) => this.setup(data))
      .then(setTimeout(() => this._changeController(this._getHash()), 2000));
  }

  setup(data) {
    Rules.LEVELS_QUANTITY = Object.keys(data).length;
    initialState.results = new Array(Rules.LEVELS_QUANTITY).fill(PassOptions.UNKNOWN.class);

    this.routes = {
      [ControllerID.GREETING]: greeting,
      [ControllerID.RULES]: rules,
      [ControllerID.GAME]: new GamePresenter(initialState, data),
      [ControllerID.STATS]: new Stats()
    };

    window.addEventListener(`hashchange`, (evt) => {
      this._changeController(this._getHash());
    });
  }

  _getHash() {
    return location.hash.replace(`#`, ``);
  }

  _changeController(route) {
    const controller = this.routes[route];

    if (!controller) {
      this.showGreeting();
    } else {
      controller.init();
    }
  }

  showIntro() {
    location.hash = ControllerID.INTRO;
  }

  showGreeting() {
    location.hash = ControllerID.GREETING;
  }

  showRules() {
    location.hash = ControllerID.RULES;
  }

  level() {
    location.hash = ControllerID.GAME;
  }

  showStats(state) {
    location.hash = ControllerID.STATS;
  }

  init() {
    intro.init();
  }

  reload() {
    location.href = location.origin;
  }
}

const app = new App();

export default app;
