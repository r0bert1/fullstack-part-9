import {
  parseBmiArguments as parseArguments,
  calculateBmi,
} from "./bmiCalculator";

/*
  Example script with command line arguments:
  npm run calculateBmi 180 91
*/

try {
  const { height, weight }: { height: number; weight: number } = parseArguments(
    process.argv.slice(2)
  );
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage = " Error: " + error.message;
  }
  console.log(errorMessage);
}
