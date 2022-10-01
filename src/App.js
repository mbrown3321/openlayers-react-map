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
import ListItemWrapper from "./List/ListItemWrapper";
import mapConfig from "./config.json";
import "./App.css";
import * as data from './List/deliveryItems.json';


const geojsonObject = mapConfig.geojsonObject;
const geojsonObject2 = mapConfig.geojsonObject2;
// const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];

function addMarkers(lonLatArray) {
  console.log('lonLatArray ', lonLatArray)
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

  const listItems = data.items;

  const markersLonLat = [mapConfig.kansasCityLonLat, mapConfig.blueSpringsLonLat];
  // const [features, setFeatures] = useState(addMarkers(markersLonLat));
  const [features, setFeatures] = useState();

  useEffect(() => {
    console.log('features ', features)
  }, [features])

  const [aPoint, setApoint] = useState('');
  const [bPoint, setBpoint] = useState('');

  useEffect(() => {
    console.log('aPoint ', aPoint)
  }, [aPoint])

  const onAddCoordinatesOnMap = (a, b) => {
    console.log(a, b)
    const aNumX = a.split(',')[0];
    const aNumY = a.split(',')[1];
    const bNumX = b.split(',')[0];
    const bNumY = b.split(',')[1];
    // console.log('aNum ', Number(aNum))
    setFeatures(addMarkers([[Number(aNumX), Number(aNumY)], [Number(bNumX), Number(bNumY)]]));
  }

  return (
    <div className='deliveryPage'>
      <div className='list'>
        {/* <ListItemWrapper
          onAddCoordinatesOnMap={() => onAddCoordinatesOnMap}
          setApoint={() => setApoint}
          setBpoint={() => setBpoint}
          aPoint={aPoint}
          bPoint={bPoint}
        /> */}
        {
          listItems.map((item) => {
            return (
              <div className="listItemWrapper">
                {/* <ListItem key={item.key} pointA={item.pointA} pointB={item.pointB}
                        setApoint={() => setApoint}
                        setBpoint={() => setBpoint}
                        onAddCoordinatesOnMap={() => onAddCoordinatesOnMap} 
                        /> */}
                <div key={item.key}>
                  <h4>first delivery item</h4>
                  <div className="wrapper">
                    <div>
                      <input
                        placeholder={item.pointA}
                        onChange={(event) => setApoint(event.target.value)}
                      />
                      Ввести координаты точки А
                    </div>
                    <div>
                      <input
                        placeholder={item.pointB}
                        onChange={(event) => setBpoint(event.target.value)}
                      />
                      Ввести координаты точки В
                    </div>
                  </div>
                  <button
                    onClick={() => onAddCoordinatesOnMap(aPoint, bPoint)}
                  >Добавить координаты точек на карту</button>
                </div>
              </div>
            )
          })
        }
      </div>
      <div>
        <Map center={fromLonLat(center)} zoom={zoom}>
          <Layers>
            <TileLayer source={osm()} zIndex={0} />
            {/* {showLayer1 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
          )}
          {showLayer2 && (
            <VectorLayer
              source={vector({
                features: new GeoJSON().readFeatures(geojsonObject2, {
                  featureProjection: get("EPSG:3857"),
                }),
              })}
              style={FeatureStyles.MultiPolygon}
            />
          )} */}
            {showMarker && <VectorLayer source={vector({ features })} />}
          </Layers>
          <Controls>
            <FullScreenControl />
          </Controls>
        </Map>
        {/* <div>
        <input
          type="checkbox"
          checked={showLayer1}
          onChange={(event) => setShowLayer1(event.target.checked)}
        />
        Johnson County
      </div>
      <div>
        <input
          type="checkbox"
          checked={showLayer2}
          onChange={(event) => setShowLayer2(event.target.checked)}
        />
        Wyandotte County
      </div> */}
        <hr />
        <div>
          <input
            type="checkbox"
            checked={showMarker}
            onChange={(event) => setShowMarker(event.target.checked)}
          />
          Show markers
        </div>
        <div>
          <input
            onChange={(event) => setApoint(event.target.value)}
          />
          Ввести координаты точки А
        </div>
        <div>
          <input
            onChange={(event) => setBpoint(event.target.value)}
          />
          Ввести координаты точки В
        </div>
        <button onClick={() => onAddCoordinatesOnMap(aPoint, bPoint)}>Добавить координаты точек на карту</button>
      </div>
    </div>
  );
};

export default App;
