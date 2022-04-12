import express from "express";

import {
  getNonSensitivePatients,
  addPatient,
  getPatientById,
  addEntry,
} from "../services/patientService";
import { toNewPatientEntry, toNewEntry } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.get("/:id", (req, res) => {
  res.send(getPatientById(req.params.id));
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const updatedPatient = addEntry(req.params.id, newEntry);
    res.send(updatedPatient);
  } catch (error) {
    let message = "Something went wrong.";
    if (error instanceof Error) {
      message = error.message;
    }
    res.status(400).send({ error: message });
  }
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
