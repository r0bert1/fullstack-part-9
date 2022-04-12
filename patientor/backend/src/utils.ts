import {
  NewPatient,
  Gender,
  NewEntry,
  Discharge,
  NewBaseEntry,
  NewHealthCheckEntry,
  NewHospitalEntry,
  NewOccupationalHealthcareEntry,
  SickLeave,
  HealthCheckRating,
} from "./types";

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const toNewEntry = (object: any): NewEntry => {
  let newBaseEntry: NewBaseEntry = {
    description: parseField(object.description),
    date: parseDate(object.date),
    specialist: parseField(object.specialist),
  };

  if (object.diagnosisCodes) {
    newBaseEntry = {
      ...newBaseEntry,
      diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
    };
  }

  switch (object.type) {
    case "Hospital":
      const newHospitalEntry: NewHospitalEntry = {
        ...newBaseEntry,
        type: "Hospital",
        discharge: parseDischarge(object.discharge),
      };
      return newHospitalEntry;
    case "OccupationalHealthcare":
      let newOccupationalHealthcareEntry: NewOccupationalHealthcareEntry = {
        ...newBaseEntry,
        type: "OccupationalHealthcare",
        employerName: parseField(object.employerName),
      };
      if (object.sickLeave) {
        newOccupationalHealthcareEntry = {
          ...newOccupationalHealthcareEntry,
          sickLeave: parseSickLeave(object.sickLeave),
        };
      }
      return newOccupationalHealthcareEntry;
    case "HealthCheck":
      const newHealthCheckEntry: NewHealthCheckEntry = {
        ...newBaseEntry,
        type: "HealthCheck",
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
      return newHealthCheckEntry;
    default:
      throw new Error("Invalid entry type: " + object.type);
  }
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

const parseDiagnosisCodes = (codes: unknown): string[] => {
  if (!codes || !isArrayOfStrings(codes)) {
    throw new Error("Incorrect diagnosis codes");
  }
  return codes;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isArrayOfStrings = (param: any): param is string[] => {
  if (!Array.isArray(param)) {
    return false;
  }

  if (param.some((p) => !isString(p))) {
    return false;
  }

  return true;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error("Incorrect or missing discharge");
  }

  return discharge;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isDischarge = (param: any): param is Discharge => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { date, criteria } = param;

  if (!date || !isString(date) || !isDate(date)) {
    throw new Error("Incorrect or missing discharge date");
  }

  if (!criteria || !isString(criteria)) {
    throw new Error("Incorrect or missing discharge criteria");
  }

  return true;
};

const parseSickLeave = (sickLeave: unknown): SickLeave => {
  if (!isSickLeave(sickLeave)) {
    throw new Error("Incorrect sick leave");
  }

  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isSickLeave = (param: any): param is SickLeave => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { startDate, endDate } = param;

  if (!startDate || !isString(startDate) || !isDate(startDate)) {
    throw new Error("Incorrect or missing sick leave start date");
  }

  if (!endDate || !isString(endDate) || !isDate(endDate)) {
    throw new Error("Incorrect or missing sick leave end date");
  }

  return true;
};

const parseHealthCheckRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
    throw new Error("Incorrect or missing health check rating");
  }
  return rating;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  return Object.values(HealthCheckRating).includes(param);
};
