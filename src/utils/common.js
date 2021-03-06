const generateRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateRandomFloat = (a = 0, b = 1) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);
  let float = lower + Math.random() * (upper - lower + 1);
  if (float > 10) {
    float = Math.floor(float);
  }
  return Math.round(float * 10) / 10;
};

const generateElement = (arr) => {
  return arr[generateRandomInteger(0, arr.length - 1)];
};

const generateElements = (arr) => {
  const elementsAmount = generateRandomInteger(1, 4);
  const elementsArr = [];
  for (let i = 0; i < elementsAmount; i++) {
    const newElement = arr[generateRandomInteger(0, arr.length - 1)];
    if (!elementsArr.includes(newElement)) {
      elementsArr.push(newElement);
    }
  }
  return elementsArr;
};

export {generateRandomInteger, generateRandomFloat, generateElement, generateElements};
