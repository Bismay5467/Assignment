import {
  IoPartlySunnyOutline,
  IoRainyOutline,
  IoSnowOutline,
  IoThunderstormOutline,
} from "react-icons/io5";
import { ILocation, TTempUnit, TTime } from "../types/types";
import { LuCloudDrizzle, LuCloudy } from "react-icons/lu";
import { RiMoonFoggyLine, RiSunFoggyLine } from "react-icons/ri";
import { BsCloudMoon } from "react-icons/bs";

export const TEMP_UNIT_KEY = "temp-unit";
export const INITIAL_TEMP_UNIT: TTempUnit = "Celsius";
export const SEARCH_RESULT_KEY = "search-results";
export const INIT_LOCATION: ILocation = { longitude: 54, latitude: 30 };

export const getIcon = ({
  style,
  id,
  time,
}: {
  style: string;
  id: number;
  time: TTime;
}) => {
  switch (id) {
    case 2:
      return {
        icon: <IoThunderstormOutline className={style} />,
        type: "Thunderstorm",
        bg: "bg-rainy-day",
      };
    case 3:
      return {
        icon: <LuCloudDrizzle className={style} />,
        type: "Drizzle",
        bg: "bg-rainy-day",
      };
    case 5:
      return {
        icon: <IoRainyOutline className={style} />,
        type: "Rain",
        bg: "bg-rainy-day",
      };
    case 6:
      return {
        icon: <IoSnowOutline className={style} />,
        type: "Snow",
        bg: "bg-snowy-day",
      };
    case 7:
      return {
        icon:
          time === "NIGHT" ? (
            <RiMoonFoggyLine className={style} />
          ) : (
            <RiSunFoggyLine className={style} />
          ),
        type: "Fog",
        bg: "bg-foggy-day",
      };
    case 800:
      return {
        icon:
          time === "NIGHT" ? (
            <BsCloudMoon className={style} />
          ) : (
            <IoPartlySunnyOutline className={style} />
          ),
        type: "Clear Sky",
        bg: "bg-sunny-day",
      };
    case 8:
      return {
        icon: <LuCloudy className={style} />,
        type: "Cloudy",
        bg: "bg-cloudy-day",
      };
  }
};
