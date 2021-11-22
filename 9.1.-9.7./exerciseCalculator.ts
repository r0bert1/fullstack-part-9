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
  dailyExerciseHours: Array<number>;
  target: number;
}

const parseArguments = (args: Array<string>): CommandLineArguments => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");
  if (!Array.isArray(JSON.parse(process.argv[2])))
    throw new Error("First argument was not an array");
  if (isNaN(Number(args[3])))
    throw new Error("Second argument was not a number");

  return {
    dailyExerciseHours: Array<number>(JSON.parse(process.argv[2])),
    target: Number(args[3]),
  };
};

const calculateExercises = (
  dailyExerciseHours: Array<number>,
  target: number
): Result => {
  let trainingDays = 0;
  let periodExerciseHours = 0;

  dailyExerciseHours.forEach((hrs) => {
    periodExerciseHours += hrs;
    if (hrs > 0) trainingDays++;
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
  npm run calculateExercises "[1, 0, 2, 4.5, 0, 3, 1, 0, 4]" "2" 
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
