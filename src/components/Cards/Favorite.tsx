import { useEffect, useState } from "react";
import { useTempUnitContext } from "../../context/tempunit";
import { VscChromeClose } from "react-icons/vsc";
import { useSearchContext } from "../../context/search";
import { getWeatherInfo } from "../../utils/searchResult";
import { getClosetRecord } from "../../utils/getter";
import { tempConversion } from "../../utils/conversion";
import { getIcon } from "../../constants/constants";

export default function Favorite({
  lon,
  lat,
  name,
  id,
  handleDelete,
}: {
  lon: number;
  lat: number;
  name: string;
  id: string;
  handleDelete: (id: string) => void;
}) {
  const { unit } = useTempUnitContext();
  const { setLocation, index, time } = useSearchContext();
  const [info, setInfo] = useState({ temp: 298, id: 800 });
  useEffect(() => {
    getWeatherInfo({ location: { latitude: lat, longitude: lon } }).then(
      (val) => {
        const closestRecord =
          index === undefined
            ? getClosetRecord({
                weatherInfo: val.forecast[0],
              })
            : val.forecast[0][index];
        setInfo({
          temp: closestRecord.temp,
          id:
            closestRecord.forecast.id === 800
              ? 800
              : parseInt((closestRecord.forecast.id / 100).toString()),
        });
      }
    );
  }, [lon, lat, index]);
  return (
    <div
      className={`h-full min-w-64 cursor-pointer rounded-lg bg-slate-100/25 backdrop-blur-md p-2 border-1 border-slate-500 font-semibold text-center text-primary`}
      onClick={() => setLocation({ latitude: lat, longitude: lon })}
    >
      <div className="flex justify-end">
        <VscChromeClose
          className="text-black cursor-pointer"
          onClick={() => handleDelete(id)}
        />
      </div>
      <div className={`flex justify-center w-full mt-3`}>
        <div className="flex flex-row gap-x-6 justify-center">
          {getIcon({ style: "text-4xl", id: info.id, time })?.icon}
          <p className="text-3xl">
            {parseInt(
              tempConversion({
                temp: info.temp,
                convertedUnit: unit,
              }).toString()
            )}{" "}
            {unit === "Celsius" ? "°C" : "°F"}
          </p>
        </div>
      </div>
      <div className="text-xl mt-2">{name}</div>
    </div>
  );
}
