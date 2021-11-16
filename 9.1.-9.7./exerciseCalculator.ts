interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

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
const dailyExerciseHours: Array<number> = JSON.parse(process.argv[2]);
const target: number = Number(process.argv[3]);
console.log(calculateExercises(dailyExerciseHours, target));
