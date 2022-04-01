import express from "express";

import {
  getNonSensitivePatients,
  addPatient,
} from "../services/patientService";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = addPatient(newPatientEntry);
    res.send(newPatient);
  } catch (error) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;
