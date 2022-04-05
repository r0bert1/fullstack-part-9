import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients.json";
import { NonSensitivePatient, NewPatient } from "../types";

const patients: Array<NonSensitivePatient> =
  patientsData as Array<NonSensitivePatient>;

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const addPatient = (entry: NewPatient): NonSensitivePatient => {
  const newPatient = { id: uuid(), ...entry };
  patients.push(newPatient);
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const { ssn, ...nonSensitivePatient } = newPatient;
  return nonSensitivePatient;
};
