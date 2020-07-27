import stringify from './stringify';
import { addDays, addHours } from './date';

it('should return the string now', () => {
  expect(stringify(new Date())).toBe('now');
});

it('should return the string now+4d', () => {
  let date = new Date();
  date = addDays(date, 4);

  expect(stringify(date)).toBe('now+4d');
});

it('should return the string now-4d+8h', () => {
  let date = new Date();
  date = addDays(date, -4);
  date = addHours(date, 8);

  expect(stringify(date)).toBe('now-4d+8h');
});
