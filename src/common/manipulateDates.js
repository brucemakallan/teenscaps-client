import date from 'date-and-time';

export const LONG_DATE_FORMAT = 'ddd DD MMM YYYY HH:mm:ss Z';
export const NORMAL_DATE = 'ddd DD MMM YYYY';
export const SHORT_DATE_FORMAT = 'YYYY-MM-DD';
export const DATE = 'DD';
export const DAY = 'dddd';
export const MONTH = 'MMM';
export const YEAR = 'YYYY';

export const dateToEpoc = dateValue => String(new Date(dateValue).valueOf());

export const epocToDate = (epocTime, format) => date.format(new Date(Number(epocTime)), format);

export const removeUnsupportedProperties = (passedEntity, unsupportedProperties) => {
  const entity = passedEntity;
  unsupportedProperties.map(property => delete entity[property]);
  return entity;
};
