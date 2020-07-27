import { roundHours } from './date';

const HOURS_MULTIPLIER = 60 * 60 * 1000;
const DAYS_MULTIPLIER = 60 * 60 * 24 * 1000;

const stringify = date => {
  const now = new Date();
  const timeDiff = date - now;
  const daysDiff = Math.floor(timeDiff / DAYS_MULTIPLIER);
  const hoursDiff = Math.floor(
    (timeDiff - daysDiff * DAYS_MULTIPLIER) / HOURS_MULTIPLIER
  );
  let dayToken = '';
  let hourToken = '';

  if (daysDiff) {
    dayToken = daysDiff > 0 ? `+${daysDiff}d` : `${daysDiff}d`;
  }

  if (hoursDiff) {
    hourToken = hoursDiff > 0 ? `+${hoursDiff}h` : `${hoursDiff}h`;
  }

  return `now${dayToken}${hourToken}`;
};

export default stringify;
