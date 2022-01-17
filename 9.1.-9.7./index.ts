import express from "express";
import bodyParser from "body-parser";
import {
  parseArguments as parseBmiArguments,
  calculateBmi,
  Arguments as BmiArguments,
} from "./bmiCalculator";
import {
  parseArguments as parseExerciseArguments,
  calculateExercises,
  Arguments as ExerciseArguments,
} from "./exerciseCalculator";

const app = express();

app.use(bodyParser.json());

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { weight, height } = req.query;

  let parsedArguments: BmiArguments;

  try {
    parsedArguments = parseBmiArguments([String(height), String(weight)]);
  } catch (error) {
    return res.send({ error: "Malformatted parameters" });
  }

  const bmi = calculateBmi(parsedArguments.height, parsedArguments.weight);

  return res.send({ weight: Number(weight), height: Number(height), bmi });
});

app.post("/exercises", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  const {
    daily_exercises: dailyExerciseHours,
    target,
  }: { daily_exercises: any; target: any } = req.body;

  if (!target || !dailyExerciseHours) {
    return res.send({ error: "Parameters missing" });
  }

  let parsedArguments: ExerciseArguments;

  try {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment
    parsedArguments = parseExerciseArguments([target, ...dailyExerciseHours]);
  } catch (error) {
    return res.send({ error: "Malformatted parameters" });
  }

  const exerciseFeedback = calculateExercises(
    parsedArguments.dailyExerciseHours,
    parsedArguments.target
  );

  return res.send(exerciseFeedback);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
