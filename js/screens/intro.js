import IntroView from './intro-view';
import greeting from './greeting';


const intro = new IntroView();

intro.onNext = function () {
  greeting.showScreen();
};

export default intro;
