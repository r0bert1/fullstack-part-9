import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients";
import { NonSensitivePatient, NewPatient, Patient } from "../types";

const patients: Array<Patient> = patientsData;

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
  return patient;
};

export const addPatient = (entry: NewPatient): Patient => {
  const newPatient = { id: uuid(), entries: [], ...entry };
  patients.push(newPatient);
  return newPatient;
};
