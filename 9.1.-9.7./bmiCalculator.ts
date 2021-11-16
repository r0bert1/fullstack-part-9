interface Arguments {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): Arguments => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

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

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage = " Error: " + error.message;
  }
  console.log(errorMessage);
}
