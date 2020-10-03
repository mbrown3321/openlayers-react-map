import * as olSource from "ol/source";

function osm() {
	return new olSource.OSM();
}

export default osm;