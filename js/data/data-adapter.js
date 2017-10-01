import {Task} from './data';

function receiveImages(arr) {
  return arr.map(function (item) {
    return {
      src: item.image.url,
      type: item.type
    };
  });
}

function receiveTask(string) {
  let task = Task.FIRST;
  switch (string) {
    case `tinder-like`:
      task = Task.SECOND;
      break;
    case `one-of-three`:
      task = Task.THIRD;
      break;
  }
  return task;
}

function receiveLevel(obj) {
  return {
    task: receiveTask(obj.type),
    images: receiveImages(obj.answers)
  };
}

export default new class {

  preprocess(data) {
    const obj = {};

    data.forEach(function (item, index) {
      obj[`level${index + 1}`] = receiveLevel(item);
    });

    return obj;
  }

  toServer(data) {
    return JSON.stringify({
      stats: data.results,
      lives: data.lives
    });
  }
}();
