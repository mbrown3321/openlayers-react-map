import React, { useEffect, useState } from "react";
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
// import ListItemWrapper from "./List/ListItemWrapper";
import mapConfig from "./config.json";
import "./App.css";
import * as data from './List/deliveryItems.json';


const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
// const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

function addMarkers(lonLatArray) {
  var iconStyle = new Style({
    image: new Icon({
      anchorXUnits: "fraction",
      anchorYUnits: "pixels",
      src: mapConfig.markerImage32,
    }),
  });
  let features = lonLatArray.map((item) => {
    let feature = new Feature({
      geometry: new Point(fromLonLat(item)),
    });
    feature.setStyle(iconStyle);
    return feature;
  });
  return features;
}

//  [-94.9065, 38.9884],  [-94.6108, 38.846]

const App = () => {
  const [center, setCenter] = useState(mapConfig.center);
  const [zoom, setZoom] = useState(9);

  const [showLayer1, setShowLayer1] = useState(false);
  const [showLayer2, setShowLayer2] = useState(false);
  const [showMarker, setShowMarker] = useState(false);
  const [isShown, showPoints] = useState(true);

  const listItems = data.items;
  const [deliveryItems, setDeliveryItems] = useState(listItems);

  const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];
  const [features, setFeatures] = useState();


  const onAddCoordinatesOnMap = (a, b) => {
    const aNumX = a?.split(',')[0];
    const aNumY = a?.split(',')[1];
    const bNumX = b?.split(',')[0];
    const bNumY = b?.split(',')[1];
    setFeatures(addMarkers([[Number(aNumX), Number(aNumY)], [Number(bNumX), Number(bNumY)]]));
  }

  const EachItem = ({ pointA, pointB, key }) => {
    const [aPoint, setApoint] = useState(pointA);
    const [bPoint, setBpoint] = useState(pointB);
    return (
      <div className="listItemWrapper">
        <div >
          <h4>{`Delivery item ${key}`}</h4>
          <div className="wrapper">
            <div>
              <input
                placeholder={pointA}
                value={pointA}
                onChange={(event) => setApoint(event.target.value)}
              />
              Ввести координаты точки А
            </div>
            <div>
              <input
                placeholder={pointB}
                value={pointB}
                onChange={(event) => setBpoint(event.target.value)}
              />
              Ввести координаты точки В
            </div>
          </div>
          <button onClick={() => onAddCoordinatesOnMap(aPoint, bPoint)}>Добавить координаты точек на карту</button>
        </div>
      </div>
    )
  }

  return (
    <div className='deliveryPage'>
      <div className='list'>
        {
          listItems.map((item) => <EachItem key={item.key} pointA={item.pointA} pointB={item.pointB} />)
        }
      </div>
      <div>
        <Map center={fromLonLat(center)} zoom={zoom}>
          <Layers>
            <TileLayer source={osm()} zIndex={0} />
            {showMarker && <VectorLayer source={vector({ features })} />}
          </Layers>
          <Controls>
            <FullScreenControl />
          </Controls>
        </Map>
        <hr />
        <div>
          <input
            type="checkbox"
            checked={showMarker}
            onChange={(event) => setShowMarker(event.target.checked)}
          />
          Показать добавленные точки на карте
        </div>
      </div>
    </div>
  );
};

export default App;
