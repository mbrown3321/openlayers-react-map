import { toPointString } from "../utils";
import { get } from "./api";

const url = "http://127.0.0.1:8010/v1/dynamicData/findNearest";

export const findNearestVehicle = async (position) => {
  const data = await get(`${url}?${toPointString(position)}`);
  return data;
};
