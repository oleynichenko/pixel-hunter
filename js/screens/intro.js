import IntroView from './intro-view';

const intro = new class {
  constructor() {
    this._view = new IntroView();
  }

  init() {
    this._view.showScreen();
  }
}();

export default intro;
