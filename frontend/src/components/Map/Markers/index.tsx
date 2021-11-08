const Marker = (map: naver.maps.Map, pos: naver.maps.LatLng) => {
  return {
    position: pos,
    map: map,
    icon: "./icons/podo.png",
  };
};

export default Marker;
