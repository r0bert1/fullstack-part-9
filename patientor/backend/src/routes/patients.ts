import express from "express";

import {
  getNonSensitivePatients,
  addPatient,
  getPatientById,
} from "../services/patientService";
import { toNewPatientEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  res.send(getPatientById(req.params.id));
});

router.post("/", (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const newPatient = addPatient(newPatientEntry);
    res.send(newPatient);
  } catch (error) {
    let message = "Something went wrong.";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).send({ error: message });
  }
});

export default router;
