/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "@nextui-org/react";
import { tempConversion } from "../../utils/conversion";
import { useTempUnitContext } from "../../context/tempunit";

export default function WeeklyForecast({
  icon,
  date,
  forecast,
  maxtemp,
  mintemp,
}: {
  id: number;
  icon: any;
  date: string;
  forecast: string;
  maxtemp: number;
  mintemp: number;
}) {
  const { unit } = useTempUnitContext();
  return (
    <div className="flex gap-x-2 w-full h-16 text-left mb-5">
      <div className=" w-1/5 h-full grid justify-items-center content-center">
        {icon}
      </div>
      <div className="w-3/4 h-full">
        <div className="w-full h-2/4">{date}</div>
        <div className="w-full h-2/4">{forecast}</div>
      </div>
      <Divider orientation="vertical" />
      <div className="w-20 h-full">
        <div className="w-full h-2/4">
          {tempConversion({
            temp: mintemp - 5,
            convertedUnit: unit,
          })}
          °
        </div>
        <div className="w-full h-2/4">
          {tempConversion({
            temp: maxtemp,
            convertedUnit: unit,
          })}
          °
        </div>
      </div>
    </div>
  );
}
