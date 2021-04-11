import {generateRandomInteger, generateRandomFloat, generateElement, generateElements} from './util.js';
import {generateComments} from './comments.js';
import dayjs from 'dayjs';

const titles = [
  'The Man with the Golden Arm',
  'The Great Flamarion',
  'Santa Claus Conquers the Martians',
  'Made for Each Other',
  'Popeye the Sailor Meets Sindbad the Sailor',
  'Sagebrush Trail',
  'The Dance of Life',
];

const posters = [
  'images/posters/made-for-each-other.png',
  'images/posters/popeye-meets-sinbad.png',
  'images/posters/sagebrush-trail.jpg',
  'images/posters/santa-claus-conquers-the-martians.jpg',
  'images/posters/the-dance-of-life.jpg',
  'images/posters/the-great-flamarion.jpg',
  'images/posters/the-man-with-the-golden-arm.jpg',
];

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
];

const directors = [
  'Tom Ford',
  'Anthony Mann',
  'Jim Jarmusch',
  'Christopher Nolan',
  'Steven Spielberg',
  'Stanley Kubrick',
];

const writers = [
  'Anne Wigton',
  'Heinz Herald',
  'Richard Weil',
  'Christopher Nolan',
  'Steven Spielberg',
  'Stanley Kubrick',
  'Steven Moffat',
  'Russel T. Davies',
];

const actors = [
  'Erich von Stroheim',
  'Mary Beth Hughes',
  'Dan Duryea',
  'Johnny Depp',
  'Keira Knightly',
  'David Tennant',
  'Jude Law',
  'Vincent Cassel',
  'Monika Belucci',
];

const countries = [
  'USA',
  'France',
  'Germany',
  'Italy',
  'UK',
  'Russia',
  'Finland',
];

const genres = [
  'Drama',
  'Film-Noir',
  'Mystery',
  'Comedy',
  'Thriller',
  'Musical',
  'Western',
];

const generateDate = () => {
  const MAX_DAYS_GAP = 365;
  const MAX_YEARS_GAP = 30;
  const daysGap = generateRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const yearsGap = generateRandomInteger(-MAX_YEARS_GAP, 0);
  return dayjs().add(daysGap, 'day').add(yearsGap, 'year').toDate();
};

const generateRuntime = () => {
  const hoursAmount = generateRandomInteger(0, 4);
  return `${hoursAmount !== 0 ? hoursAmount.toString().concat('h ') : ''}${generateRandomInteger(0, 59)}m`;
};

const generateMovie = () => {
  const watchedMovie = Boolean(generateRandomInteger(0, 1));
  return {
    title: generateElement(titles),
    alternativeTitle: generateElement(titles),
    poster: generateElement(posters),
    description: generateElement(descriptions),
    director: generateElement(directors),
    writers: generateElements(writers),
    actors: generateElements(actors),
    rating: generateRandomFloat(0, 10),
    ageRating: generateRandomInteger(0, 18),
    releaseDate: generateDate(),
    runtime: generateRuntime(),
    country: generateElement(countries),
    genres: generateElements(genres),
    comments: generateComments(),
    watched: watchedMovie,
    watchlist: watchedMovie ? false : Boolean(generateRandomInteger(0, 1)),
    watchingDate: generateDate(),
    favorite: Boolean(generateRandomInteger(0, 1)),
  };
};

export {generateMovie};
