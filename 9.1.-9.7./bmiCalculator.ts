interface CommandLineArguments {
  height: number;
  weight: number;
}

export const parseBmiArguments = (
  args: Array<string>
): CommandLineArguments => {
  if (args.length < 2) throw new Error("Not enough arguments");
  if (args.length > 2) throw new Error("Too many arguments");

  if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
    return {
      height: Number(args[0]),
      weight: Number(args[1]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

export const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;
  if (bmi < 18.5) return "Underweight";
  if (bmi > 24.9) return "Overweight";
  return "Normal";
};
