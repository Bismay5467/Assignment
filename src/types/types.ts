export type TTempUnit = "Celsius" | "Fahrenheit";
export type TTime = "DAY" | "NIGHT";

export interface IUnitContext {
  unit: TTempUnit;
  setUnit: (unit: TTempUnit) => void;
}

export interface ISearchedCity {
  cityName: string;
  timestamp: number;
}

export interface ILocation {
  longitude: number;
  latitude: number;
}

export interface ISearch {
  location: ILocation;
  searchVal: string;
  setLocation: (val: ILocation) => void;
  setSearchVal: (val: string) => void;
  weatherInfo: IWeatherInfoExtended;
  index: number | undefined;
  time: TTime;
  setIndex: (val: number) => void;
}

export interface ICoordinateResponse {
  lat: number;
  lon: number;
  name: string;
  country: string;
}

export interface IWeatherInfo {
  timestamp: number;
  temp: number;
  humidity: number;
  cloudiness: number;
  wind: { speed: number; deg: number };
  visibility: number;
  forecast: { description: string; short: string; id: number };
}

export interface IWeatherInfoExtended {
  name: string;
  country: string;
  forecast: Array<IWeatherInfo[]>;
}

export interface IFavorite {
  id: string;
  lon: number;
  lat: number;
  name: string;
}
