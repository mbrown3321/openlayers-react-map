export const toBboxString = (bbox) => {
  const allLon = bbox.flat(1).map((point) => point[0]);
  const allLat = bbox.flat(1).map((point) => point[1]);

  return `minLon=${Math.min(...allLon)}&minLat=${Math.min(
    ...allLat
  )}&maxLon=${Math.max(...allLon)}&maxLat=${Math.max(...allLat)}`;
};

export const toPointString = (position) => {
  return `lon=${position[0]}&lat=${position[1]}`;
};
