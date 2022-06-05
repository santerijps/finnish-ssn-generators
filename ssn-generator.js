const randomNumber = (min, max) => {
  return Math.round(min + Math.random() * (max - min));
};

const newDateZeroTime = (date) => {
  date = date ? new Date(date) : new Date();
  date.setUTCHours(0, 0, 0, 0);
  return date;
};

const newDateDelta = (date, yearDelta = 0, monthDelta = 0, dayDelta = 0) => {
  date = date ? new Date(date) : new Date();
  date.setUTCFullYear(date.getUTCFullYear() + yearDelta);
  date.setUTCMonth(date.getUTCMonth() + monthDelta);
  date.setUTCDate(date.getUTCDate() + dayDelta);
  return date;
};

const randomDate = (minDate, maxDate) => {
  const timestamp = randomNumber(+minDate, +maxDate);
  return newDateZeroTime(new Date(timestamp));
};

const randomDateFromAge = (years) => {
  const
    minDate = newDateDelta(newDateZeroTime(), -(years + 1), 0, +1),
    maxDate = newDateDelta(newDateZeroTime(), -years, 0, 0);
  return randomDate(minDate, maxDate);
};

const randomDateFromAgeRange = (minYears, maxYears) => {
  const years = randomNumber(minYears, maxYears);
  return randomDateFromAge(years);
};

const parseDateShortFormat = (date) => {
  const
    year  = String(date.getUTCFullYear()),
    month = String(date.getUTCMonth() + 1),
    day   = String(date.getUTCDate());
  return (
    day.padStart(2, "0")
    + month.padStart(2, "0")
    + year.substring(year.length - 2)
  );
};

const getDelimiter = (date) => {
  const
    delimiters = {20: "A", 19: "-", 18: "+"},
    year = date.getUTCFullYear(),
    century = Math.floor(year / 100);
  return delimiters[century];
};

const randomIdentityNumber = () => {
  const n = randomNumber(2, 899);
  return String(n).padStart(3, "0");
};

const getCheckSymbol = (nineDigitNumber) => {
  const checkSymbols = "0123456789ABCDEFHJKLMNPRSTUVWXY";
  return checkSymbols[nineDigitNumber % 31];
};

const generateSsnFromDate = (date) => {
  const
    dateOfBirth     = parseDateShortFormat(date),
    delimiter       = getDelimiter(date),
    identityNumber  = randomIdentityNumber(),
    nineDigitNumber = parseInt(dateOfBirth + identityNumber),
    checkSymbol     = getCheckSymbol(nineDigitNumber);
  return (
    dateOfBirth
    + delimiter
    + identityNumber
    + checkSymbol
  );
};

const generateSsnAgeExactly = (years) => {
  const date = newDateDelta(newDateZeroTime(), -years, 0, 0);
  return generateSsnFromDate(date);
};

const generateSsnAgeOneDayShyFrom = (years) => {
  const date = newDateDelta(newDateZeroTime(), -years, 0, +1);
  return generateSsnFromDate(date);
};

const generateSsnAgeOneDayOver = (years) => {
  const date = newDateDelta(newDateZeroTime(), -years, 0, -1);
  return generateSsnFromDate(date);
};

const generateSsnAgeBetween = (minYears, maxYears) => {
  const date = randomDateFromAgeRange(minYears, maxYears);
  return generateSsnFromDate(date);
};

class RandomSSN {

  static exactly(years) {
    return generateSsnAgeExactly(years);
  }

  static almost(years) {
    return generateSsnAgeOneDayShyFrom(years);
  }

  static barely(years) {
    return generateSsnAgeOneDayOver(years);
  }

  static between(minYears, maxYears) {
    return generateSsnAgeBetween(minYears, maxYears)
  }

}
