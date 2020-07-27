import { addDays, addHours, roundHours, noop } from './date';

const DIGITS_REGEX = '[\\-|\\+]\\d+';

// adding a new key to the object below
// will automatically update the regex
const DAYS = {
  now: () => new Date(),
  yesterday: () => addDays(new Date(), -1)
};

// adding a new key to the object below
// will automatically update the regex
const OPERATORS = {
  d: {
    fn: addDays,
    round: noop
  },
  h: {
    fn: addHours,
    round: roundHours
  }
};

const createParserRegex = () => {
  const daysKeys = Object.keys(DAYS).join('|');
  const operatorsKeys = Object.keys(OPERATORS).join('|');

  const daysRegex = `(?<day>(${daysKeys}))`;
  const operatorsRegex = `(?<operators>(${DIGITS_REGEX}[${operatorsKeys}])*)`;
  const roundRegex = `(\\/(?<round>[${operatorsKeys}]))?`;

  const regexString = `^${daysRegex}${operatorsRegex}${roundRegex}$`;

  return new RegExp(regexString);
  // return /^(?<day>(now|yesterday))(?<operators>([\-|\+]\d+[d|h])*)(?<round>\/[w|d|y])?$/;
};

const createDate = day => {
  // safety check just in case
  return DAYS[day] && DAYS[day]();
};

const performOperation = (date, { value, fn }) => {
  return fn(date, value);
};

const parseOperators = operatorsString => {
  const operatorsKeys = Object.keys(OPERATORS).join('|');
  const digitsRegex = `(?<digit>${DIGITS_REGEX})`;
  const functionRegex = `(?<operation>[${operatorsKeys}])`;

  const regex = new RegExp(`${digitsRegex}${functionRegex}`, 'g');

  const operators = operatorsString.matchAll(
    // /(?<digit>[\-|\+]\d+)(?<operation>[d|h])/g
    regex
  );
  const operations = [];

  for (let operator of operators) {
    const { digit, operation } = operator.groups;

    operations.push({
      value: Number(digit),
      fn: OPERATORS[operation].fn
    });
  }

  return operations;
};

const parser = string => {
  const tokens = string.match(createParserRegex());
  if (!tokens) return undefined; // string is not valid

  const { operators, day, round } = tokens.groups;
  // we're avoiding doing the following
  // let date = DAYS[day]();
  let date = createDate(day);

  if (operators) {
    const operations = parseOperators(operators);
    // apply all operations sequentially
    date = operations.reduce(performOperation, date);
  }

  if (round) {
    const roundFn = OPERATORS[round].round;
    date = roundFn(date);
  }

  return date;
};

export default parser;
