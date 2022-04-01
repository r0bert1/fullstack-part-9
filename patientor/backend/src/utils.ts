import { NewPatient, Gender } from "./types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewPatientEntry = (object: any): NewPatient => {
  const newEntry: NewPatient = {
    name: parseField(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: parseField(object.ssn),
    gender: parseGender(object.gender),
    occupation: parseField(object.occupation),
  };

  return newEntry;
};

const parseField = (value: unknown): string => {
  if (!value || !isString(value)) {
    throw new Error("Incorrect or missing value: " + value);
  }
  return value;
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing date");
  }
  return date;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender");
  }
  return gender;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(Gender).includes(param);
};
