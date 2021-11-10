const Marker = (map: naver.maps.Map, pos: naver.maps.LatLng, count: number = 3) => {
  const markerCountStyle = `
    position: absolute;
    background-color: black;
    border-radius: 1rem;
    z-index: 10;
    top: 0;
    right: 0;
    width: 1rem;
    height: 1rem;
    text-align: center;
    color: white;
  `;

  const markerIcon = `
    <img src="/icons/podo.png" alt="marker">
    <div class="markerCount" style="${markerCountStyle}">${count}</div>
  `;

  return {
    position: pos.destinationPoint(90, 15),
    map: map,
    icon: {
      content: markerIcon,
    },
    size: new naver.maps.Size(22, 22),
    origin: new naver.maps.Point(0, 0),
    draggable: true,
  };
};

export default Marker;
