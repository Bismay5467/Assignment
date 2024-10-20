/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, AutocompleteItem, Divider } from "@nextui-org/react";
import { TiWeatherWindyCloudy } from "react-icons/ti";
import WeeklyForecast from "./Cards/WeeklyForecast";
import { useTempUnitContext } from "../context/tempunit";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { SEARCH_RESULT_KEY } from "../constants/constants";
import { getProcessedSearchResults } from "../utils/searchResult";
import { useSearchContext } from "../context/search";
import { useEffect, useState } from "react";
import { getDirection, tempConversion } from "../utils/conversion";
import { get5DaysForecastData, getClosetRecord } from "../utils/getter";

export default function SideInfo() {
  const { setUnit, unit } = useTempUnitContext();
  const { setSearchVal, searchVal, weatherInfo, index, time } =
    useSearchContext();
  const [localStorageVal, setLocalStorageVal] = useLocalStorage(
    SEARCH_RESULT_KEY,
    []
  );
  const [searchItem, setSearchItem] = useState<
    Array<{ value: string; label: string }>
  >([]);
  const [info, setInfo] = useState({ temp: 308, wind: { speed: 0, deg: 200 } });
  const handleStorageInLocalStorage = (event: any) => {
    if (event.key !== "Enter" || searchVal.trim().length === 0) return;
    const processedData = getProcessedSearchResults({
      initial: localStorageVal,
      recent: searchVal.trim(),
    });
    setLocalStorageVal(processedData);
  };
  useEffect(() => {
    if (weatherInfo === null) return;
    const closestRecord =
      index === undefined
        ? getClosetRecord({
            weatherInfo: weatherInfo.forecast[0],
          })
        : weatherInfo.forecast[0][index];
    setInfo({ temp: closestRecord.temp, wind: closestRecord.wind });
  }, [JSON.stringify(weatherInfo), index]);
  useEffect(() => {
    const processedResults = localStorageVal.map(
      (val: Record<string, string | number>) => ({
        value: val.cityName,
        label: val.cityName,
      })
    );
    setSearchItem(processedResults);
  }, [JSON.stringify(localStorageVal)]);
  return (
    <div className="h-screen font-semibold w-1/4 bg-slate-100/25 backdrop-blur-md border-e-1 border-slate-400 p-10 text-center text-secondary">
      <div className="h-10 w-full">
        <Autocomplete
          size="sm"
          defaultItems={searchItem}
          label="Search location..."
          className="max-w-xs"
          allowsCustomValue
          onInputChange={(val) => setSearchVal(val)}
          onKeyDown={handleStorageInLocalStorage}
        >
          {(item) => (
            <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
      <div className="h-58 w-full mt-10">
        <div className="text-xl mb-6">
          {weatherInfo?.name}, {weatherInfo?.country}
        </div>
        <div className="text-6xl font-bold flex gap-x-2 justify-center">
          <p>
            {parseInt(
              tempConversion({
                temp: info.temp,
                convertedUnit: unit,
              }).toString()
            )}
          </p>{" "}
          <p
            className={`cursor-pointer border-e-2 border-slate-600 pr-5 ${
              unit === "Fahrenheit" ? "text-tertiary" : ""
            }`}
            onClick={() => {
              setUnit("Celsius");
            }}
          >
            °C
          </p>{" "}
          <p
            className={`${
              unit === "Celsius" ? "text-tertiary" : ""
            } cursor-pointer`}
            onClick={() => {
              setUnit("Fahrenheit");
            }}
          >
            °F
          </p>
        </div>
        <div className="flex flex-row gap-x-2 mt-12 justify-center">
          <TiWeatherWindyCloudy className="self-center text-xl" />{" "}
          <p>
            {getDirection({ deg: info.wind.deg })}, {info.wind.speed} Km/h
          </p>
        </div>
      </div>
      <Divider className="my-4" />
      <div className="h-80 w-full text-primary">
        <p className="text-xl mb-10">The Next Days Forecast</p>
        <div className="overflow-y-auto h-60 no-scrollbar">
          {get5DaysForecastData({
            forecast: weatherInfo?.forecast ?? [],
            time,
          }).map((forecast) => (
            <WeeklyForecast {...forecast} key={forecast.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
