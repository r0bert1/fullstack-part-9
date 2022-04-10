import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients.json";
import { NonSensitivePatient, NewPatient, Patient } from "../types";

const patients: Array<Patient> = patientsData as Array<Patient>;

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

export const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find((patient) => patient.id === id);
  if (patient && !patient.entries) patient.entries = [];
  return patient;
};

export const addPatient = (entry: NewPatient): NonSensitivePatient => {
  const newPatient = { id: uuid(), ...entry };
  patients.push(newPatient);
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  const { ssn, ...nonSensitivePatient } = newPatient;
  return nonSensitivePatient;
};
