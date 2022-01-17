interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export interface Arguments {
  dailyExerciseHours: Array<string>;
  target: number;
}

export const parseArguments = (args: Array<string>): Arguments => {
  if (args.length < 2) throw new Error("Not enough arguments");

  args.forEach((arg) => {
    if (isNaN(Number(arg))) {
      throw new Error("All arguments should be numbers");
    }
  });

  return {
    dailyExerciseHours: args.slice(1),
    target: Number(args[0]),
  };
};

export const calculateExercises = (
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
