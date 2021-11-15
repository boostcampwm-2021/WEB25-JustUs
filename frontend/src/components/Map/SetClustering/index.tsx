const Clustering = (map: naver.maps.Map, markers: naver.maps.Marker[], clickHandler: Function) => {
  const SIZE = 40;
  const POINT = 20;
  const MIN_CLUSTER_SIZE = 2;
  const MAX_ZOOM_SIZE = 18;
  const GRID_SIZE = 70;

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
    disableClick: false,
    gridSize: GRID_SIZE,
    icons: [podoThree, podoMany],
    indexGenerator: [4, 6],
    averageCenter: true,
    stylingFunction: function (clusterMarker: any, count: number) {
      const pTag = document.createElement("p");
      pTag.innerHTML = count.toString();
      pTag.style.cssText =
        "display: inline-block;position:absolute;right:-5px;bottom:-5px;height:20px;line-height:20px;width:20px;background-color:purple;color:white;border-radius: 50%;text-align:center";
      clusterMarker.getElement().appendChild(pTag);
    },
    clickHandler: clickHandler,
  };
};

export default Clustering;
