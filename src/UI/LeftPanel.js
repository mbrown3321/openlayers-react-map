import React, { useCallback, useContext } from "react";
import { getInBounds } from "../Api/getInBounds";
import { bbox } from "../App";
import styled from "styled-components";
import { useDebouncedCallback } from "use-debounce";
import { featureCollection, point } from "turf";
import MapContext from "../Map/MapContext";
import { Projection, transform } from "ol/proj";

const Container = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 2;
`;

const isValid = (value) => {
  try {
    const coordinates = value.split(",");
    return (
      !Number.isNaN(coordinates[0].trim()) &&
      !Number.isNaN(coordinates[1].trim())
    );
  } catch (e) {
    return false;
  }
};

export const LeftPanel = ({ setFetched, setPosition, findNearest }) => {
  const { map } = useContext(MapContext);
  const debounced = useDebouncedCallback((value) => {
    const valid = isValid(value);
    if (valid) {
      const coordinates = value.split(",");
      setPosition(coordinates.map((coordinate) => Number(coordinate.trim())));
    }
  }, 200);

  const fetchInBbox = useCallback(async () => {
    const data = await getInBounds(bbox.features[0].geometry.coordinates);
    const features = data?.map((f) => point(f.Pointer, f.Properties));
    if (features) {
      setFetched(featureCollection(features));
    }
  }, []);

  const getCenter = useCallback(async () => {
    const center = map.getView().getCenter();
    setPosition(
      transform(
        center,
        new Projection({ code: "EPSG:3857" }),
        new Projection({ code: "EPSG:4326" })
      )
    );
  }, [map]);

  return (
    <Container>
      <button onClick={fetchInBbox}>Find in BBox</button>
      <div>
        {/* paste e.g. "4.858484377646979,52.683239879606234" */}
        <input
          placeholder="Enter your location"
          onChange={(e) => {
            debounced(e.target.value);
          }}
        />
        <button onClick={findNearest}>Find nearest vehicle</button>
        <button onClick={getCenter}>Get center</button>
      </div>
    </Container>
  );
};
