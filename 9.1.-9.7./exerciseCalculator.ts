interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface CommandLineArguments {
  dailyExerciseHours: Array<string>;
  target: number;
}

const parseArguments = (args: Array<string>): CommandLineArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");

  args.slice(3).forEach((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error("All arguments should be numbers");
    }
  });

  return {
    dailyExerciseHours: args.slice(3),
    target: Number(args[2]),
  };
};

const calculateExercises = (
  dailyExerciseHours: Array<string>,
  target: number
): Result => {
  let trainingDays = 0;
  let periodExerciseHours = 0;

  dailyExerciseHours.map(Number).forEach((dailyHours) => {
    periodExerciseHours += dailyHours;
    if (dailyHours > 0) trainingDays++;
  });

  const periodLength: number = dailyExerciseHours.length;
  const average: number = periodExerciseHours / periodLength;
  let rating = 2;
  let ratingDescription = "You almost hit your target!";
  let success = false;

  if (target > average + 1) {
    rating = 1;
    ratingDescription = "You were quite far from your target";
  }

  if (target <= average) {
    rating = 3;
    success = true;
    ratingDescription = "You hit your target!";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

/* 
  Example script with command line arguments:
  npm run calculateExercises 2 1 0 2 4.5 0 3 1 0 4 
*/
try {
  const { dailyExerciseHours, target } = parseArguments(process.argv);
  console.log(calculateExercises(dailyExerciseHours, target));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage = " Error: " + error.message;
  }
  console.log(errorMessage);
}

export {};
