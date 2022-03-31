/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from "express";

import {
  getNonSensitivePatients,
  addPatient,
} from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getNonSensitivePatients());
});

router.post("/", (req, res) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newPatient = addPatient({
    name,
    dateOfBirth,
    ssn,
    gender,
    occupation,
  });
  res.send(newPatient);
});

export default router;
