/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import {
  ICoordinateResponse,
  ILocation,
  ISearchedCity,
  IWeatherInfoExtended,
} from "./../types/types";

export const getProcessedSearchResults = ({
  initial,
  recent,
}: {
  initial: ISearchedCity[];
  recent: string;
}) =>
  initial
    .concat({ cityName: recent, timestamp: Date.now() })
    .map((info) => ({ ...info, cityName: info.cityName.trim().toLowerCase() }))
    .sort((a, b) => b.timestamp - a.timestamp)
    .reduce((acc, current) => {
      if (acc.some((item) => item.cityName === current.cityName) === false) {
        acc.push(current);
      }
      return acc;
    }, [] as ISearchedCity[])
    .slice(0, Math.min(initial.length + 1, 10));

export const getCoordinates = async ({ name }: { name: string }) => {
  const coordinates = {} as ICoordinateResponse;
  const apiEndPoint = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${
    import.meta.env.VITE_OPEN_WEATHER_APP_API_KEY
  }`;
  const res = await axios(apiEndPoint);
  const [data] = res.data;
  if (data === undefined)
    throw new Error("Seems like this place doesn't exists!");
  Object.assign(coordinates, {
    lat: data.lat,
    lon: data.lon,
    country: data.country ?? "",
    name: data.name ?? name,
  });
  return coordinates;
};

const getProcessedForecast = ({ data, date }: { data: any; date: string }) => {
  const forecast = (data ?? []).filter((forecast: any) =>
    forecast.dt_txt.startsWith(date)
  );
  const processedForecast = forecast
    .map((forecast: any) => ({
      timestamp: forecast.dt,
      temp: forecast.main.temp,
      humidity: forecast.main.humidity,
      cloudiness: forecast.clouds.all,
      wind: { speed: forecast.wind.speed, deg: forecast.wind.deg },
      visibility: (forecast.visibility ?? 0) / 100,
      forecast: {
        description: forecast.weather[0].description,
        short: forecast.weather[0].main,
        id: forecast.weather[0].id,
      },
    }))
    .sort((a: any, b: any) => a.timestamp - b.timestamp);
  return processedForecast;
};

const getDate = (index: number, today: string) =>
  index >= 0 && index <= 5
    ? new Date(new Date(today).setDate(new Date(today).getDate() + index))
        .toISOString()
        .slice(0, 10)
    : today;

export const getWeatherInfo = async ({ location }: { location: ILocation }) => {
  const { latitude, longitude } = location;
  const info = {} as any;
  const apiEndPoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${
    import.meta.env.VITE_OPEN_WEATHER_APP_API_KEY
  }`;
  const { data } = await axios(apiEndPoint);
  const { list } = data;
  const today = new Date().toISOString().slice(0, 10);
  Object.assign(info, {
    name: data?.city?.name,
    country: data?.city?.country,
    forecast: Array.from({ length: 6 }).map((_, idx) =>
      getProcessedForecast({ data: list, date: getDate(idx, today) })
    ),
  });
  return info as IWeatherInfoExtended;
};
