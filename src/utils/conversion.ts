import { TTempUnit } from "../types/types";
export const tempConversion = ({
  temp,
  convertedUnit,
}: {
  temp: number;
  convertedUnit: TTempUnit;
}) => {
  if (convertedUnit === "Fahrenheit")
    return parseFloat(((temp - 273.15) * 1.8 + 32).toFixed(2));
  return parseFloat((temp - 273.15).toFixed(2));
};

export const getDirection = ({ deg }: { deg: number }) => {
  const directions = [
    "North",
    "North-East",
    "East",
    "South-East",
    "South",
    "South-West",
    "West",
    "North-West",
  ];
  return directions[Math.round(deg / 45) % 8];
};
