const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;
  if (bmi < 18.5) return "Underweight";
  if (bmi > 24.9) return "Overweight";

  return "Normal";
};

/* 
  Example script with command line arguments:
  npm run calculateBmi 180 91
*/
const height: number = Number(process.argv[2]);
const weight: number = Number(process.argv[3]);
console.log(calculateBmi(height, weight));
