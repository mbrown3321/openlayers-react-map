import React, { useState } from 'react';
import './App.css';
import Map from "./Map";
import { Layers, TileLayer, VectorLayer } from "./Layers";
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';
import { osm, vector } from "./Source";
import { fromLonLat, get } from 'ol/proj';
import GeoJSON from 'ol/format/GeoJSON';
import { Controls, FullScreenControl } from "./Controls";

let styles = {
	'Point': new Style({
		image: new CircleStyle({
			radius: 10,
			fill: null,
			stroke: new Stroke({
				color: 'magenta',
			}),
		}),
	}),
	'Polygon': new Style({
		stroke: new Stroke({
			color: 'blue',
			lineDash: [4],
			width: 3,
		}),
		fill: new Fill({
			color: 'rgba(0, 0, 255, 0.1)',
		}),
	}),
	'MultiPolygon': new Style({
		stroke: new Stroke({
			color: 'blue',
			width: 1,
		}),
		fill: new Fill({
			color: 'rgba(0, 0, 255, 0.1)',
		}),
	}),
};

const geojsonObject = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"properties": {
				"kind": "county",
				"name": "Wyandotte",
				"state": "KS"
			},
			"geometry": {
				"type": "MultiPolygon",
				"coordinates": [
					[
						[
							[
								-94.8627,
								39.202
							],
							[
								-94.901,
								39.202
							],
							[
								-94.9065,
								38.9884
							],
							[
								-94.8682,
								39.0596
							],
							[
								-94.6053,
								39.0432
							],
							[
								-94.6053,
								39.1144
							],
							[
								-94.5998,
								39.1582
							],
							[
								-94.7422,
								39.1691
							],
							[
								-94.7751,
								39.202
							],
							[
								-94.8627,
								39.202
							]
						]
					]
				]
			}
		}
	]
};
const geojsonObject2 = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"properties": {
				"kind": "county",
				"name": "Johnson",
				"state": "KS"
			},
			"geometry": {
				"type": "MultiPolygon",
				"coordinates": [
					[
						[
							[
								-94.9065,
								38.9884
							],
							[
								-95.0544,
								38.9829
							],
							[
								-95.0544,
								38.7365
							],
							[
								-94.9668,
								38.7365
							],
							[
								-94.6108,
								38.7365
							],
							[
								-94.6108,
								38.846
							],
							[
								-94.6053,
								39.0432
							],
							[
								-94.8682,
								39.0596
							],
							[
								-94.9065,
								38.9884
							]
						]
					]
				]
			}
		}
	]
};

const App = () => {
	const [center, setCenter] = useState([-94.9065, 38.9884]);
	const [zoom, setZoom] = useState(9);
	const [showLayer1, setShowLayer1] = useState(true);
	const [showLayer2, setShowLayer2] = useState(true);

	return (
		<div>
			<Map center={fromLonLat(center)} zoom={zoom}>
				<Layers>
					<TileLayer
						source={osm()}
						zIndex={0}
					/>
					{showLayer1 && (
						<VectorLayer
							source={vector({ features: new GeoJSON().readFeatures(geojsonObject, { featureProjection: get('EPSG:3857') }) })}
							style={styles.MultiPolygon}
						/>
					)}
					{showLayer2 && (
						<VectorLayer
							source={vector({ features: new GeoJSON().readFeatures(geojsonObject2, { featureProjection: get('EPSG:3857') }) })}
							style={styles.MultiPolygon}
						/>
					)}
				</Layers>
				<Controls>
					<FullScreenControl />
				</Controls>
			</Map>
			<div>
				<input
					type="checkbox"
					checked={showLayer1}
					onChange={event => setShowLayer1(event.target.checked)}
				/> Johnson County
			</div>
			<div>
				<input
					type="checkbox"
					checked={showLayer2}
					onChange={event => setShowLayer2(event.target.checked)}
				/> Wyandotte County</div>
		</div>
	);
}

export default App;
