import React, { useCallback, useEffect, useState } from "react";
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Style, Icon } from "ol/style";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import { osm, vector } from "./Source";
import { fromLonLat, get } from "ol/proj";
import GeoJSON from "ol/format/GeoJSON";
import { Controls, FullScreenControl } from "./Controls";
import FeatureStyles from "./Features/Styles";

import mapConfig from "./config.json";
import "./App.css";
import { LeftPanel } from "./UI/LeftPanel";
import { findNearestVehicle } from "./Api/findNearest";
import { featureCollection, point } from "turf";

export const bbox = mapConfig.bbox;
const points = mapConfig.points;

function addMarkers(lonLatArray) {
  const iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  const features = lonLatArray.map((item) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

const App = () => {
  const [center, setCenter] = useState(mapConfig.center); //ol uses LonLat format, Google uses LatLon
  const [zoom, setZoom] = useState(9);

  const [fetched, setFetched] = useState();
  const [position, setPosition] = useState();
  const [nearest, setNearest] = useState();

  const findNearest = useCallback(
    async (e) => {
      console.log(e);
      e.preventDefault();
      if (position) {
        const nearestVehicle = await findNearestVehicle(position);
        setNearest(nearestVehicle);
      }
    },
    [position]
  );

  useEffect(() => {
    console.log(center);
  }, [center]);

  return (
    <div>
      <Map center={fromLonLat(center)} zoom={zoom} setCenter={setCenter}>
        <Layers>
          <TileLayer source={osm()} zIndex={0} />
          <VectorLayer
            source={
              new vector({
                features: new GeoJSON().readFeatures(bbox, {
                  featureProjection: get("EPSG:3857"),
                }),
              })
            }
            style={FeatureStyles.MultiPolygon}
          />
          <VectorLayer
            source={vector({
              features: new GeoJSON().readFeatures(points, {
                featureProjection: get("EPSG:3857"),
              }),
            })}
            style={FeatureStyles.Point}
          />
          {fetched && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(fetched, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={FeatureStyles.PointInBBox}
            />
          )}
          {position && (
            <VectorLayer
              source={vector({
                features: addMarkers([position]),
              })}
              style={FeatureStyles.PointInBBox}
            />
          )}
          {nearest && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(
                  featureCollection([point(nearest.Pointer)]),
                  {
                    featureProjection: get("EPSG:3857"),
                  }
                ),
              })}
              style={FeatureStyles.NearestPoint}
            />
          )}
        </Layers>
        <Controls>
          <FullScreenControl />
        </Controls>
        <LeftPanel
          setFetched={setFetched}
          setPosition={setPosition}
          findNearest={findNearest}
        />
      </Map>
    </div>
  );
};

export default App;
