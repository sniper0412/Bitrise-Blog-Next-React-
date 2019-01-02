import isNil from 'lodash/isNil';

const MONTH_NAMES = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
];

export default dateLike => {
  const date = new Date(dateLike);

  if (isNil(dateLike) || isNaN(date)) {
    return null;
  }

  const day = date.getDate();
  const month = MONTH_NAMES[date.getMonth()];
  const year = date.getFullYear();

  return `${month} ${day}, ${year}`;
};
