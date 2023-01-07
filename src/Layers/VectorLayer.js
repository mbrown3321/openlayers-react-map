import { useContext, useEffect, useMemo } from "react";
import MapContext from "../Map/MapContext";
import OLVectorLayer from "ol/layer/Vector";

const VectorLayer = ({ source, style, zIndex = 0 }) => {
  const { map } = useContext(MapContext);
  const layer = useMemo(
    () =>
      new OLVectorLayer({
        source,
        style,
      }),
    [source, style]
  );

  useEffect(() => {
    if (!map) return;

    map.addLayer(layer);
    layer.setZIndex(zIndex);

    return () => {
      if (map) {
        map.removeLayer(layer);
      }
    };
  }, [map, layer]);

  return null;
};

export default VectorLayer;
