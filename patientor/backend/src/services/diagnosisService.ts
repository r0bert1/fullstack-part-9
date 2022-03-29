import diagnosisData from "../../data/diagnoses.json";
import { Diagnosis } from "../types";

const diagnoses: Array<Diagnosis> = diagnosisData;

export const getAllDiagnoses = (): Array<Diagnosis> => {
  return diagnoses;
};
