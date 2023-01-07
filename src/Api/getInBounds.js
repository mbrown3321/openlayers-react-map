import { toBboxString } from "../utils";
import { get } from "./api";

const url = "http://127.0.0.1:8010/v1/dynamicData/findInBounds";

export const getInBounds = async (bbox) => {
  const data = await get(`${url}?${toBboxString(bbox)}`);
  return data;
};
