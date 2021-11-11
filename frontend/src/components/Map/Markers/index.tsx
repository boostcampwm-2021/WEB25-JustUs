const Marker = (map: naver.maps.Map, pos: naver.maps.LatLng) => {
  const markerIcon = `
    <img src="/icons/podo.png" alt="marker">`;

  return {
    position: pos.destinationPoint(90, 15),
    map: map,
    icon: {
      content: markerIcon,
    },
    size: new naver.maps.Size(22, 22),
    origin: new naver.maps.Point(0, 0),
    draggable: false,
  };
};

export default Marker;
