import {generateRandomInteger, generateElement} from '../utils/common.js';
import dayjs from 'dayjs';

const names = ['Tim Macoveev', 'John Doe', 'Anna Thompson', 'Erich Krause'];
const emojis = ['smile', 'sleeping', 'puke', 'angry'];
const commentTexts = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
];

const generateCommentDate = () => {
  const MAX_DAYS_GAP = 100;
  const daysGap = generateRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  return dayjs().add(daysGap, 'day').toDate();
};

const generateComments = () => {
  const comments = [];
  const commentCount = generateRandomInteger(0, 10);
  for (let i = 0; i <= commentCount; i++) {
    comments.push(
      {
        id: i,
        author: generateElement(names),
        text: generateElement(commentTexts),
        date: generateCommentDate(),
        emoji: generateElement(emojis),
      });
  }
  return comments;
};

export {generateComments};
