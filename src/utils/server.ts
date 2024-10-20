import axios from "axios";
import { IFavorite } from "../types/types";

export const getFavorite = async () => {
  const apiEndPoint = "http://localhost:3000/favourite";
  let val = undefined;
  try {
    const res = await axios(apiEndPoint);
    val = res.data;
  } catch (err) {
    console.log(
      "Something weird happen. We are working on it. Please try after sometime",
      " ",
      err
    );
  }
  return val as IFavorite[];
};

export const deleteFavorite = async (id: string) => {
  const apiEndPoint = `http://localhost:3000/favourite/${id}`;
  try {
    await axios.delete(apiEndPoint);
  } catch (err) {
    console.log(
      "Something weird happen. We are working on it. Please try after sometime",
      " ",
      err
    );
  }
};
export const add = async (info: IFavorite, favorite: IFavorite[]) => {
  console.log(info);
  const dovalExists = favorite.find(
    (val) => val.lat === info.lat && val.lon === val.lon
  );
  const apiEndPoint = `http://localhost:3000/favourite/`;
  try {
    if (dovalExists !== undefined)
      throw new Error("This location already exists in your list");
    const res = await axios.post(apiEndPoint, info);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};
