export const Rules = {
  LEVELS_QUANTITY: 0,
  LIVES_QUANTITY: 3
};

export const PassOptions = {
  FAST: {
    class: `fast`,
    name: `Бонус за скорость`,
    cost: 50,
    duration: 20
  },
  CORRECT: {
    class: `correct`,
    cost: 100,
    duration: 30
  },
  SLOW: {
    class: `slow`,
    duration: 10,
    name: `Штраф за медленность`,
    cost: -50,
  },
  WRONG: {
    class: `wrong`
  },
  HEART: {
    class: `heart`,
    name: `Бонус за жизни`,
    cost: 50,
  },
  UNKNOWN: {
    class: `unknown`
  }
};

export const Task = Object.freeze({
  FIRST: `two-of-two`,
  SECOND: `tinder-like`,
  THIRD: `one-of-three`
});

export const taskOption = Object.freeze({
  [Task.FIRST]: {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    class: ``,
    questions: [`question-1`, `question-2`]
  },
  [Task.SECOND]: {
    title: `Угадай, фото или рисунок?`,
    class: `game__content--wide`,
    questions: [`question-1`]
  },
  [Task.THIRD]: {
    title: `Найдите рисунок среди изображений`,
    class: `game__content--triple`,
    questions: []
  }
});

export let initialState = {
  level: 1,
  lives: Rules.LIVES_QUANTITY,
  results: [],
  time: PassOptions.CORRECT.duration
};

export const getLevel = (num, data) => data[`level${num}`];
export const getTask = (level) => taskOption[level.task];
export const getTaskHeader = (taskName) => taskOption[taskName.header];
export const checkIsQuestion = (task) => task.questions.length > 0;

export const countLives = (number, result) => {
  const isAnswerWrong = (result === PassOptions.WRONG.class) ? 1 : 0;
  return number - isAnswerWrong;
};

export const addResult = (index, result, arr) => {
  arr[index] = result;
  return arr;
};

export const getNextState = (state, result) => Object.assign({}, state, {
  level: state.level + 1,
  lives: countLives(state.lives, result),
  results: addResult(state.level - 1, result, state.results),
  time: PassOptions.CORRECT.duration
});

export const getLevelResult = (levelPassed, levelTime) => {
  if (!levelPassed || levelTime <= 0) {
    return PassOptions.WRONG.class;
  } else if (levelPassed && levelTime > PassOptions.FAST.duration) {
    return PassOptions.FAST.class;
  } else if (levelPassed && levelTime < PassOptions.SLOW.duration) {
    return PassOptions.SLOW.class;
  } else if (levelPassed) {
    return PassOptions.CORRECT.class;
  } else {
    return PassOptions.WRONG.class;
  }
};
