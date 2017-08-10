export const MAX_QUESTIONS = 10;
export const state = {
  'lives': 3,
  'timer': `2.00`
};

export const games = [
  {
    'question': `Угадайте для каждого изображения фото или рисунок?`,
    'images': [`http://i.imgur.com/DKR1HtB.jpg`, `http://i.imgur.com/1KegWPz.jpg`],
    'result': `fast`
  },
  {
    'question': `Угадай, фото или рисунок?`,
    'images': `https://k32.kn3.net/5C7060EC5.jpg`
  },
  {
    'question': `Найдите рисунок среди изображений`,
    'images': [`https://k32.kn3.net/5C7060EC5.jpg`, `https://k42.kn3.net/D2F0370D6.jpg`, `http://placehold.it/304x455`]
  }
];

export const statList = new Array(MAX_QUESTIONS).fill(`unknown`);
