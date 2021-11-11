import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import { useDispatch } from "react-redux";
import Marker from "@components/Map/Markers";
import MapLayerPostModal from "./Modal";

declare const MarkerClustering: any;
declare global {
  interface Window {
    kakao: any;
  }
}

type LatLng = any;
type Feature = any;
type Event = any;
type Coord = Point | LatLng;
type DOMEvent = Event;

interface Point {
  x: number;
  y: number;
}

interface PointerEvent {
  coord: Coord;
  point: Point;
  offset: Point;
  pointerEvent: DOMEvent;
  feature: Feature;
}

const setMap = (
  INIT_X: number,
  INIT_Y: number,
  ZOOM_SIZE: number,
  setIsRightClick: Dispatch<SetStateAction<Boolean>>,
  setRightPosition: Dispatch<SetStateAction<Point>>,
  setClickInfo: Dispatch<SetStateAction<PointerEvent>>,
  dispatch: any,
) => {
  const pos = new naver.maps.LatLng(INIT_X, INIT_Y);
  const map = new naver.maps.Map("map", {
    center: pos,
    zoom: ZOOM_SIZE,
  });

  setMarker(map, dispatch);

  naver.maps.Event.addListener(map, "rightclick", (e: PointerEvent) => {
    setClickInfo(e);
    setRightPosition({ x: e.pointerEvent.pageX, y: e.pointerEvent.pageY });
    setIsRightClick(true);
  });
  naver.maps.Event.addListener(map, "zoom_changed", (e: Number) => {
    setIsRightClick(false);
  });
  naver.maps.Event.addListener(map, "click", (e: PointerEvent) => {
    setIsRightClick(false);
  });
};

const setMarker = (map: naver.maps.Map, dispatch: any) => {
  const markerItems = [
    { id: 0, name: "삼겹살", position: [37.3595704, 127.105399] },
    { id: 1, name: "맥도날드", position: [37.3618025, 127.1153248] },
    { id: 2, name: "미삼집", position: [37.3561936, 127.0983706] },
    { id: 3, name: "강남역", position: [37.497912, 127.027616] },
    { id: 4, name: "강남역1", position: [37.497912, 127.027616] },
    { id: 5, name: "강남역2", position: [37.497912, 127.027616] },
    { id: 6, name: "강남역3", position: [37.497912, 127.027616] },
    { id: 7, name: "강남역4", position: [37.497912, 127.027616] },
    { id: 8, name: "강남역5", position: [37.497912, 127.027616] },
    { id: 9, name: "강남역6", position: [37.497912, 127.027616] },
    { id: 10, name: "강남역7", position: [37.497912, 127.027616] },
    { id: 11, name: "강남역8", position: [37.497912, 127.027616] },
  ];

  const handleClickMarker = () => {
    dispatch({ type: "OPEN_MODAL", payload: "PostShowModal" });
  };

  const markers = markerItems.map((marker) => {
    const pos1 = new naver.maps.LatLng(marker.position[0], marker.position[1]);
    const mk = new naver.maps.Marker(Marker(map, pos1, marker.id));
    naver.maps.Event.addListener(mk, "click", () => handleClickMarker());
    return mk;
  });

  const SIZE = 40;
  const POINT = 20;

  const htmlMarker1 = {
    content: `<div>2</div><img src="/icons/podo-three.png" alt="marker">`,
    size: new naver.maps.Size(SIZE, SIZE),
    origin: new naver.maps.Point(POINT, POINT),
  };
  const htmlMarker2 = {
    content: `<div>3</div><img src="/icons/podo-three.png" alt="marker">`,
    size: new naver.maps.Size(SIZE, SIZE),
    origin: new naver.maps.Point(POINT, POINT),
  };
  const htmlMarker3 = {
    content: `<div>4</div><img src="/icons/podo-many.png" alt="marker">`,
    size: new naver.maps.Size(SIZE, SIZE),
    origin: new naver.maps.Point(POINT, POINT),
  };
  const htmlMarker4 = {
    content: `<div>5</div><img src="/icons/podo-many.png" alt="marker">`,
    size: new naver.maps.Size(SIZE, SIZE),
    origin: new naver.maps.Point(POINT, POINT),
  };
  const htmlMarker5 = {
    content: `<div>5</div><img src="/icons/podo-many.png" alt="marker">`,
    size: new naver.maps.Size(SIZE, SIZE),
    origin: new naver.maps.Point(POINT, POINT),
  };

  const markerClustering = new MarkerClustering({
    minClusterSize: 2,
    maxZoom: 13,
    map: map,
    markers: markers,
    disableClickZoom: false,
    gridSize: 120,
    icons: [htmlMarker1, htmlMarker2, htmlMarker3, htmlMarker4, htmlMarker5],
    indexGenerator: [2, 3, 4, 5, 6],
  });
};

const setError = () => {
  console.error("잘못되었습니다.");
};

const Map = () => {
  const dispatch = useDispatch();
  const [isRightClick, setIsRightClick] = useState<Boolean>(false);
  const [rightPosition, setRightPosition] = useState<Point>({ x: 0, y: 0 });
  const [clickInfo, setClickInfo] = useState<any>();

  useEffect(() => {
    const initMap = () => {
      const INIT_X = 37.511337;
      const INIT_Y = 127.012084;
      const ZOOM_SIZE = 13;
      setMap(INIT_X, INIT_Y, ZOOM_SIZE, setIsRightClick, setRightPosition, setClickInfo, dispatch);
    };
    initMap();
  }, []);

  const modalOpen = () => {
    dispatch({ type: "OPEN_MODAL", payload: "PostCreateModal" });
  };

  return (
    <React.Fragment>
      <Maps id="map" />
      {isRightClick && (
        <MapLayerPostModal clickInfo={clickInfo} rightPosition={rightPosition} setIsRightClick={setIsRightClick} />
      )}
      <FloatActionBtn onClick={modalOpen}>+</FloatActionBtn>
    </React.Fragment>
  );
};

const Maps = styled.div`
  position: absolute;
  width: 100%;
  height: 95vh;
  &:focus-visible {
    outline: none;
  }
`;

const PostModal = styled.div`
  background-color: ${COLOR.RED};
  position: absolute;
  z-index: 2;
  height: 30px;
  width: 40px;
`;

const FloatActionBtn = styled.button`
  background-color: ${(props) => props.theme.SECONDARY};
  position: absolute;
  z-index: 2;
  border-radius: 50%;
  border: none;
  height: 8vh;
  width: 8vh;
  bottom: 8vh;
  right: 8vh;
  ${flexRowCenterAlign}
  color: ${COLOR.WHITE};
  font-size: 7vh;
  box-shadow: 0.2vh 0.2vh 1vh 0.2vh ${(props) => props.theme.PRIMARY};
  &:hover {
    cursor: pointer;
    background-color: ${(props) => props.theme.PRIMARY};
  }
`;

export default Map;
