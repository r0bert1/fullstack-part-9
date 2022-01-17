import {
  parseExerciseArguments as parseArguments,
  calculateExercises,
} from "./exerciseCalculator";

/* 
  Example script with command line arguments:
  npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4
*/

try {
  const { dailyExerciseHours, target } = parseArguments(process.argv.slice(2));
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage = " Error: " + error.message;
  }
  console.log(errorMessage);
}
