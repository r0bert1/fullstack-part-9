import patientsData from "../../data/patients.json";
import { NonSensitivePatient } from "../types";

const patients: Array<NonSensitivePatient> = patientsData;

export const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};
