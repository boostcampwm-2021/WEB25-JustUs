const Clustering = (map: naver.maps.Map, markers: naver.maps.Marker[]) => {
  const SIZE = 40;
  const POINT = 20;
  const MIN_CLUSTER_SIZE = 2;
  const MAX_ZOOM_SIZE = 13;
  const GRID_SIZE = 120;

  const podoThree = {
    content: `<img src="/icons/podo-three.png" alt="three grape">`,
    size: new naver.maps.Size(SIZE, SIZE),
    origin: new naver.maps.Point(POINT, POINT),
  };
  const podoMany = {
    content: `<img src="/icons/podo-many.png" alt="many grape">`,
    size: new naver.maps.Size(SIZE, SIZE),
    origin: new naver.maps.Point(POINT, POINT),
  };

  return {
    minClusterSize: MIN_CLUSTER_SIZE,
    maxZoom: MAX_ZOOM_SIZE,
    map,
    markers,
    disableClickZoom: false,
    gridSize: GRID_SIZE,
    icons: [podoThree, podoMany],
    indexGenerator: [4, 6],
  };
};

export default Clustering;
