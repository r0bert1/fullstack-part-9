import calculateBmi from "./calculateBmi";

interface CommandLineArguments {
  height: number;
  weight: number;
}

const parseArguments = (args: Array<string>): CommandLineArguments => {
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
