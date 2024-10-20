/* eslint-disable @typescript-eslint/no-explicit-any */
import { Divider } from "@nextui-org/react";
import { tempConversion } from "../../utils/conversion";
import { useTempUnitContext } from "../../context/tempunit";

export default function DailyForecast({
  id,
  icon,
  time,
  temp,
  handleClick,
}: {
  id: number;
  icon: any;
  time: string;
  handleClick: (id: number) => void;
  temp: number;
}) {
  const { unit } = useTempUnitContext();
  return (
    <div
      onClick={() => handleClick(id)}
      className="h-full cursor-pointer min-w-28 rounded-lg bg-slate-100/20 backdrop-blur-md p-2 border-1 border-slate-500 font-semibold text-center text-primary"
    >
      <p className="">{time}</p>
      <Divider className="mt-2" />
      <p className="grid justify-items-center content-center my-2">{icon}</p>
      <div className="w-full h-2/4">
        {parseInt(
          tempConversion({
            temp: temp,
            convertedUnit: unit,
          }).toString()
        )}{" "}
        {unit === "Celsius" ? "°C" : "°F"}
      </div>
    </div>
  );
}
