import levels from './data-levels';

export const GAME_RULES = {
  LEVELS_QUANTITY: 10,
  LIVES_QUANTITY: 3,
  PASS_TIME: 30,
  LEVEL_COST: 100
};

export const PASS_OPTIONS = {
  fast: `fast`,
  correct: `correct`,
  slow: `slow`,
  wrong: `wrong`
};

export const GAME_CONDITIONS = {
  [PASS_OPTIONS.fast]: {
    cost: -50,
    duration: 20
  },
  [PASS_OPTIONS.slow]: {
    cost: 50,
    duration: 10
  }
};

export const tasks = Object.freeze({
  task1: {
    title: `Угадайте для каждого изображения фото или рисунок?`,
    class: ``,
    questions: [`question-1`, `question-2`]
  },
  task2: {
    title: `Угадай, фото или рисунок?`,
    class: `game__content--wide`,
    questions: [`question-1`]
  },
  task3: {
    title: `Найдите рисунок среди изображений`,
    class: `game__content--triple`,
    questions: []
  }
});

export const initialState = Object.freeze({
  level: 1,
  lives: 3,
  timer: `2.00`
});

export const getLevel = (num) => levels[`level${num}`];
export const getTask = (level) => tasks[level.task];
export const getTaskHeader = (taskName) => tasks[taskName.header];
export const checkIsQuestion = (task) => task.questions.length > 0;
export const nextState = (state) => Object.assign({}, state, {level: state.level + 1});


export const statList = new Array(GAME_RULES.LEVELS_QUANTITY).fill(`unknown`);
