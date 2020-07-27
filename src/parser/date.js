export const addDays = (date, value) =>
  new Date(date.getTime() + 24 * 60 * 60 * 1000 * value);
export const addHours = (date, value) =>
  new Date(date.getTime() + 60 * 60 * 1000 * value);

export const roundHours = date => {
  const hours = 60 * 60 * 1000;
  return new Date(Math.round(date.getTime() / hours) * hours);
};

export const noop = date => date;
