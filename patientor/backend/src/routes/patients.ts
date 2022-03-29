import express from "express";

import { getNonSensitivePatients } from "../services/patientService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(getNonSensitivePatients());
});

export default router;
