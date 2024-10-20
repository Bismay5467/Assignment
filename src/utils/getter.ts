import { getIcon } from "../constants/constants";
import { IWeatherInfo, TTime } from "./../types/types";

export const getClosetRecord = ({
  weatherInfo,
}: {
  weatherInfo: IWeatherInfo[];
}) => {
  const currentTime = Date.now();
  let closestRecord = weatherInfo[0];
  let minDifference = Math.abs(currentTime - closestRecord.timestamp);
  weatherInfo.forEach((record) => {
    const difference = Math.abs(currentTime - record.timestamp);
    if (difference < minDifference) {
      closestRecord = record;
      minDifference = difference;
    }
  });
  return closestRecord;
};

export const get5DaysForecastData = ({
  forecast,
  time,
}: {
  forecast: Array<IWeatherInfo[]>;
  time: TTime;
}) =>
  forecast
    .slice(1)
    .map((val) => getClosetRecord({ weatherInfo: val }))
    .map((info, idx) => {
      const iconId = info.forecast.id;
      return {
        id: idx,
        icon: getIcon({
          style: "text-3xl",
          time,
          id: iconId === 800 ? iconId : parseInt((iconId / 100).toString()),
        })?.icon,
        date: new Date(info.timestamp * 1000).toLocaleDateString("en-US", {
          weekday: "short",
          month: "long",
          day: "numeric",
        }),
        forecast: info.forecast.short,
        mintemp: info.temp,
        maxtemp: info.temp,
      };
    });

export const getHourlyForecastData = ({
  forecast,
  time,
}: {
  forecast: IWeatherInfo[];
  time: TTime;
}) =>
  forecast.map((info, idx) => ({
    id: idx,
    time: new Date(info.timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    }),
    icon: getIcon({
      style: "text-3xl",
      time,
      id:
        info.forecast.id === 800
          ? info.forecast.id
          : parseInt((info.forecast.id / 100).toString()),
    })?.icon,
    temp: info.temp,
  }));

  
