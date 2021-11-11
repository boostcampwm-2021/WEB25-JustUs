import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import { useDispatch } from "react-redux";
import Marker from "@components/Map/Markers";
import MapLayerPostModal from "./Modal";

declare global {
  interface Window {
    kakao: any;
  }
}

type Point = any;
type LatLng = any;
type Feature = any;
type Event = any;
type Coord = Point | LatLng;
type DOMEvent = Event;

interface PointerEvent {
  coord: Coord;
  point: Point;
  offset: Point;
  pointerEvent: DOMEvent;
  feature: Feature;
}

const load = (
  url: string,
  cb: Function,
  err: Function,
  setIsRightClick: Dispatch<SetStateAction<Boolean>>,
  setRightPosition: Dispatch<SetStateAction<{ x: number; y: number }>>,
  setClickInfo: Dispatch<SetStateAction<any>>,
  dispatch: any,
) => {
  const element = document.createElement("script");
  const parent = "body";
  const attr = "src";

  element.async = true;
  element.onload = () => {
    const INIT_X = 37.511337;
    const INIT_Y = 127.012084;
    const ZOOM_SIZE = 13;
    cb(INIT_X, INIT_Y, ZOOM_SIZE, setIsRightClick, setRightPosition, setClickInfo, dispatch);
  };
  element.onerror = () => {
    err();
  };
  element[attr] = url;
  document[parent].appendChild(element);
};

const setMap = (
  INIT_X: number,
  INIT_Y: number,
  ZOOM_SIZE: number,
  setIsRightClick: Dispatch<SetStateAction<Boolean>>,
  setRightPosition: Dispatch<SetStateAction<{ x: number; y: number }>>,
  setClickInfo: Dispatch<SetStateAction<any>>,
  dispatch: any,
) => {
  const pos = new naver.maps.LatLng(INIT_X, INIT_Y);
  const map = new naver.maps.Map("map", {
    center: pos,
    zoom: ZOOM_SIZE,
  });
  const markerItems = [
    { id: 0, name: "삼겹살", position: [37.3595704, 127.105399] },
    { id: 1, name: "맥도날드", position: [37.3618025, 127.1153248] },
    { id: 2, name: "미삼집", position: [37.3561936, 127.0983706] },
    { id: 3, name: "강남역", position: [37.497912, 127.027616] },
  ];
  const handleClickMarker = () => {
    dispatch({ type: "OPEN_MODAL", payload: "PostShowModal" });
  };

  markerItems.forEach((marker) => {
    const pos1 = new naver.maps.LatLng(marker.position[0], marker.position[1]);
    const mk = new naver.maps.Marker(Marker(map, pos1, marker.id));

    naver.maps.Event.addListener(mk, "click", () => handleClickMarker());
  });

  naver.maps.Event.addListener(map, "rightclick", (e: PointerEvent) => {
    setClickInfo(e);
    setRightPosition({ x: e.pointerEvent.screenX, y: e.pointerEvent.screenY });
    setIsRightClick(true);
  });

  naver.maps.Event.addListener(map, "click", (e: PointerEvent) => {
    setIsRightClick(false);
  });
};

const setError = () => {
  console.error("잘못되었습니다.");
};

const Map = () => {
  const dispatch = useDispatch();
  const [isRightClick, setIsRightClick] = useState<Boolean>(false);
  const [rightPosition, setRightPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [clickInfo, setClickInfo] = useState<any>();

  useEffect(() => {
    const initMap = () => {
      const clientId: string = process.env.REACT_APP_NCP_CLOUD_ID as string;
      const url = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
      load(url, setMap, setError, setIsRightClick, setRightPosition, setClickInfo, dispatch);
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
