import { Vector as VectorSource } from 'ol/source';

function vector({ features }) {
	return new VectorSource({
		features
	});
}

export default vector;
