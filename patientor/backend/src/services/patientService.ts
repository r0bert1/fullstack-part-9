import { v1 as uuid } from "uuid";

import patientsData from "../../data/patients";
import { NonSensitivePatient, NewPatient, Patient, NewEntry } from "../types";

let patients: Array<Patient> = patientsData;

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

export const addEntry = (patientId: string, entry: NewEntry): Patient => {
  const patientToUpdate = patients.find((patient) => patient.id === patientId);
  if (!patientToUpdate?.entries) {
    throw new Error(`No patient with id: ${patientId} found`);
  }
  const updatedPatient: Patient = {
    ...patientToUpdate,
    entries: [...patientToUpdate.entries, { ...entry, id: uuid() }],
  };
  patients = patients.map((patient) =>
    patient.id === patientId ? updatedPatient : patient
  );
  return updatedPatient;
};
