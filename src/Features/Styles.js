import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";

export default {
  Point: new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({ color: "red" }),
      stroke: new Stroke({
        color: "magenta",
      }),
    }),
  }),
  NearestPoint: new Style({
    image: new CircleStyle({
      radius: 10,
      fill: new Fill({ color: "green" }),
      stroke: new Stroke({
        color: "magenta",
      }),
    }),
  }),
  PointInBBox: new Style({
    image: new CircleStyle({
      radius: 5,
      fill: new Fill({ color: "blue" }),
      stroke: new Stroke({
        color: "magenta",
      }),
    }),
  }),
  Polygon: new Style({
    stroke: new Stroke({
      color: "blue",
      lineDash: [4],
      width: 3,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
  MultiPolygon: new Style({
    stroke: new Stroke({
      color: "blue",
      width: 1,
    }),
    fill: new Fill({
      color: "rgba(0, 0, 255, 0.1)",
    }),
  }),
};
