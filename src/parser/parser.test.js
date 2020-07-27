import parser, { OPERATORS } from './parser';
import { addDays, addHours, roundHours } from './date';

it('should add 5 days', () => {
  const date = addDays(new Date(2020, 0, 1), 5);
  expect(date).toEqual(new Date(2020, 0, 6));
});

it('should return undefined', () => {
  expect(parser('nothing')).toBe(undefined);
});

it('should return today', () => {
  const now = new Date();
  expect(parser('yesterday+1d')).toEqual(now);
});

it('should return today', () => {
  const now = new Date();
  expect(parser('now')).toEqual(now);
});

it('should return today -1 day', () => {
  const date = addDays(new Date(), -1);
  expect(parser('now-1d')).toEqual(date);
});

it('should return today -10 day', () => {
  const date = addDays(new Date(), -10);
  expect(parser('now-5d-5d')).toEqual(date);
});

it('should return today +10 day', () => {
  const date = addDays(new Date(), +10);
  expect(parser('now+5d+5d')).toEqual(date);
});

it('should return now', () => {
  const date = addDays(new Date(), 0);
  expect(parser('now+5d-5d')).toEqual(date);
});

it('should return today +2 day', () => {
  const date = addDays(new Date(), 2);
  expect(parser('now+2d')).toEqual(date);
});

it('should return today +2 day -4hours', () => {
  let date = addDays(new Date(), 2);
  date = addHours(date, -4);
  expect(parser('now+2d-4h')).toEqual(date);
});

it('should round to nearest hour', () => {
  let date = addDays(new Date(), 2);
  date = addHours(date, -4);
  date = roundHours(date);
  expect(parser('now+2d-4h/h')).toEqual(date);
});
