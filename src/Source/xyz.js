import * as olSource from "ol/source";

function xyz({ url, attributions, maxZoom }) {
	return new olSource.XYZ({ url, attributions, maxZoom });
}

export default xyz;
