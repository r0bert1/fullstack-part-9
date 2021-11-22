export default (height: number, weight: number): string => {
  const bmi: number = weight / (height / 100) ** 2;
  if (bmi < 18.5) return "Underweight";
  if (bmi > 24.9) return "Overweight";
  return "Normal";
};
