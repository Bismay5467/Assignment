/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Container from "./components/Container";
import SideInfo from "./components/SideInfo";
import {
  getIcon,
  INIT_LOCATION,
  INITIAL_TEMP_UNIT,
} from "./constants/constants";
import { TempUnitContext } from "./context/tempunit";
import {
  ILocation,
  IWeatherInfoExtended,
  TTempUnit,
  TTime,
} from "./types/types";
import { SearchContext } from "./context/search";
import { getCoordinates, getWeatherInfo } from "./utils/searchResult";
import { getClosetRecord } from "./utils/getter";

export default function App() {
  const [tempUnit, setTempUnit] = useState<TTempUnit>(INITIAL_TEMP_UNIT);
  const [location, setLocation] = useState<ILocation>(INIT_LOCATION);
  const [searchVal, setSearchVal] = useState<string>("");
  const [weatherInfo, setWeatherInfo] = useState<IWeatherInfoExtended | null>(
    null
  );
  const [time, setTime] = useState<TTime>("DAY");
  const [index, setIndex] = useState<number | undefined>(undefined);
  const [bg, setBg] = useState<string>("bg-foggy-day");
  useEffect(() => {
    if (searchVal.trim().length === 0) return;
    getCoordinates({ name: searchVal.trim() }).then((coordinates) => {
      if (Object.keys(coordinates).length === 0) return;
      setLocation({ latitude: coordinates.lat, longitude: coordinates.lon });
    });
  }, [searchVal]);
  useEffect(() => {
    getWeatherInfo({ location }).then((val) => setWeatherInfo(val));
  }, [JSON.stringify(location)]);
  useEffect(() => {
    if (weatherInfo === null) return;
    const closestRecord =
      index === undefined
        ? getClosetRecord({
            weatherInfo: weatherInfo.forecast[0],
          })
        : weatherInfo.forecast[0][index];
    const { id } = closestRecord.forecast;
    const bgVal =
      getIcon({
        style: "",
        id: id === 800 ? id : parseInt((id / 100).toString()),
        time,
      })?.bg ?? "bg-foggy-day";
    setBg(bgVal);
  }, [JSON.stringify(weatherInfo), index]);
  useEffect(() => {
    const time: TTime = new Date().getHours() >= 18 ? "NIGHT" : "DAY";
    setTime(time);
  }, []);
  return (
    <TempUnitContext.Provider
      value={{
        unit: tempUnit,
        setUnit: setTempUnit,
      }}
    >
      <SearchContext.Provider
        value={{
          setLocation,
          setSearchVal,
          searchVal,
          location,
          weatherInfo: weatherInfo as IWeatherInfoExtended,
          index,
          setIndex,
          time,
        }}
      >
        <div className="h-screen w-screen overflow-hidden font-notosans text-primary">
          <div className={`${bg} bg-cover bg-fit w-full h-full`}>
            <div className="flex">
              <Container />
              <SideInfo />
            </div>
          </div>
        </div>
      </SearchContext.Provider>
    </TempUnitContext.Provider>
  );
}
