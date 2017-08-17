import LevelView from './level-view';
import {initialState, nextState} from '../data/data';

const changeLevel = (state) => {
  const levelScreen = new LevelView(state);

  levelScreen.onNext = () => {
    // изменить массив с результатами
    // сделать нвое состояние
    // вызвать создание нового уровня
    const newLevel = changeLevel(nextState(state));
    newLevel.showScreen();
  };

  return levelScreen;
};

export default () => changeLevel(initialState);
