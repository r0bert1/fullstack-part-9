import express from "express";
import calculateBmi from "./calculateBmi";

const app = express();

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;
  if (!weight || !height || isNaN(Number(weight)) || isNaN(Number(height))) {
    return res.send({ error: "Malformatted parameters" });
  }
  const bmi = calculateBmi(Number(height), Number(weight));
  return res.send({ weight: Number(weight), height: Number(height), bmi });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
