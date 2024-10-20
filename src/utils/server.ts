import axios from "axios";
import { IFavorite } from "../types/types";

export const getFavorite = async () => {
  const apiEndPoint = "http://localhost:3000/favourite";
  const res = await axios(apiEndPoint);
  const val = res.data;
  return val as IFavorite[];
};

export const deleteFavorite = async (id: string) => {
  const apiEndPoint = `http://localhost:3000/favourite/${id}`;
  await axios.delete(apiEndPoint);
};
export const add = async (info: IFavorite, favorite: IFavorite[]) => {
  console.log(info);
  const dovalExists = favorite.find(
    (val) => val.lat === info.lat && val.lon === val.lon
  );
  const apiEndPoint = `http://localhost:3000/favourite/`;
  if (dovalExists !== undefined)
    throw new Error("This location already exists in your list");
  await axios.post(apiEndPoint, info);
};
