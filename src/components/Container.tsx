/* eslint-disable react-hooks/exhaustive-deps */
import { Divider } from "@nextui-org/react";
import DailyForecast from "./Cards/DailyForecast";
import {
  MdFavorite,
  MdFavoriteBorder,
  MdOutlineVisibilityOff,
} from "react-icons/md";
import { LuCloudRainWind, LuCloudSun } from "react-icons/lu";
import { TbUvIndex } from "react-icons/tb";
import Info from "./Cards/Info";
import Favorite from "./Cards/Favorite";
import { useSearchContext } from "../context/search";
import { useEffect, useState } from "react";
import { getClosetRecord, getHourlyForecastData } from "../utils/getter";
import { IFavorite, IWeatherInfo } from "../types/types";
import { add, deleteFavorite, getFavorite } from "../utils/server";
import { toast, Toaster } from "sonner";

export default function Container() {
  const { weatherInfo, index, setIndex, location, time } = useSearchContext();
  const [info, setInfo] = useState<IWeatherInfo | null>(null);
  const [favourite, setFavorite] = useState<IFavorite[]>([]);
  const [doesExist, setDoesExist] = useState<boolean>(false);
  useEffect(() => {
    if (weatherInfo === null) return;
    const closestRecord =
      index === undefined
        ? getClosetRecord({
            weatherInfo: weatherInfo.forecast[0],
          })
        : weatherInfo.forecast[0][index];
    setInfo(closestRecord);
  }, [JSON.stringify(weatherInfo), index]);
  useEffect(() => {
    const key = `${location.latitude}_${location.longitude}`;
    const doesExist =
      favourite.find((info) => info.id === key) === undefined ? false : true;
    setDoesExist(doesExist);
  }, [JSON.stringify(location)]);
  const sanitizeForecastDescription = (val: string) =>
    val
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  useEffect(() => {
    getFavorite()
      .then((val) => {
        setFavorite(val);
        const key = `${location.latitude}_${location.longitude}`;
        const doesExist =
          val.find((info) => info.id === key) === undefined ? false : true;
        setDoesExist(doesExist);
      })
      .catch(() =>
        toast.error(
          '"Something weird happen. We are working on it. Please try after sometime",'
        )
      );
  }, [JSON.stringify(favourite)]);
  const handleDelete = (id: string) => {
    deleteFavorite(id)
      .then(() => {
        const newFav = favourite.filter((info) => info.id !== id);
        setFavorite(newFav);
      })
      .catch(() =>
        toast.error(
          "Something weird happen. We are working on it. Please try after sometime"
        )
      );
  };
  const addToFavourite = () => {
    const key = `${location.latitude}_${location.longitude}`;
    if (doesExist) {
      handleDelete(key);
      return;
    }
    const info: IFavorite = {
      lat: location.latitude,
      lon: location.longitude,
      name: weatherInfo.name,
      id: key,
    };
    add(info, favourite)
      .then(() => {
        setFavorite((prevState) => [...prevState, info]);
      })
      .catch((err) => toast.error(err.message));
  };
  return (
    <div className="w-3/4 p-10 h-screen">
      <Toaster position="bottom-right" richColors />
      <div className="flex justify-between w-full h-56">
        <div className="flex flex-col justify-between">
          <div className="w-full h-10 font-semibold flex gap-x-2 justify-start">
            <p>
              {new Date(Date.now()).toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
            <Divider orientation="vertical" />
            <p>
              {new Date(Date.now()).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
            {doesExist === false ? (
              <MdFavoriteBorder
                className="text-xl ms-10 cursor-pointer"
                onClick={addToFavourite}
              />
            ) : (
              <MdFavorite
                className="text-xl ms-10 cursor-pointer"
                onClick={addToFavourite}
              />
            )}
          </div>
          <div className="w-full h-20 font-semibold text-left">
            <p className="mb-5">Weather Forecast</p>
            <p className="text-4xl">
              {sanitizeForecastDescription(info?.forecast.description ?? "")}
            </p>
          </div>
        </div>
        <div className="h-full flex flex-col justify-between w-64 bg-red-900 rounded-lg bg-slate-100/15 backdrop-blur-md p-2 border-1 border-slate-500 py-6 px-4">
          {[
            {
              icon: <LuCloudSun className="self-center text-xl" />,
              type: "Cloudiness",
              value: `${info?.cloudiness ?? 0}%`,
            },
            {
              icon: <LuCloudRainWind className="self-center text-xl" />,
              type: "Precipitation",
              value: `${info?.humidity ?? 0}%`,
            },
            {
              icon: <TbUvIndex className="self-center text-xl" />,
              type: "UV Index",
              value: "10%",
            },
            {
              icon: <MdOutlineVisibilityOff className="self-center text-xl" />,
              type: "Visibility",
              value: `${info?.visibility ?? 0}%`,
            },
          ].map((data, index) => (
            <Info {...data} key={index} />
          ))}
        </div>
      </div>
      <div className="flex w-full h-[420px] flex-col justify-end">
        <div className="h-32 w-100 overflow-x-auto overflow-y-hidden mb-5 mt-32 flex gap-x-6 no-scrollbar">
          {getHourlyForecastData({
            forecast: (weatherInfo?.forecast ?? [])[0] ?? [],
            time,
          }).map((data) => (
            <DailyForecast {...data} key={data.id} handleClick={setIndex} />
          ))}
        </div>
        {favourite.length > 0 && (
          <div className="h-32 my-5 flex gap-x-9 overflow-x-auto w-100 no-scrollbar">
            {favourite.map((info) => (
              <Favorite {...info} key={info.id} handleDelete={handleDelete} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
