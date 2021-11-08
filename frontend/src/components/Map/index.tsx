import React, { useEffect } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import { useDispatch } from "react-redux";
import Marker from "@components/Map/Markers";

const load = (url: string, cb: Function, err: Function) => {
  const element = document.createElement("script");
  const parent = "body";
  const attr = "src";

  element.async = true;
  element.onload = () => {
    const INIT_X = 37.511337;
    const INIT_Y = 127.012084;
    const ZOOM_SIZE = 13;
    cb(INIT_X, INIT_Y, ZOOM_SIZE);
  };
  element.onerror = () => {
    err();
  };
  element[attr] = url;
  document[parent].appendChild(element);
};

const setMap = (INIT_X: number, INIT_Y: number, ZOOM_SIZE: number) => {
  const pos = new naver.maps.LatLng(INIT_X, INIT_Y);
  const map = new naver.maps.Map("map", {
    center: pos,
    zoom: ZOOM_SIZE,
  });

  const marker = new naver.maps.Marker(Marker(map, pos));
};

const setError = () => {
  console.error("잘못되었습니다.");
};

const Map = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initMap = () => {
      const clientId: string = process.env.REACT_APP_NCP_CLOUD_ID as string;
      const url = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
      load(url, setMap, setError);
    };
    initMap();
  }, []);

  const modalOpen = () => {
    dispatch({ type: "OPEN_MODAL", payload: "PostCreateModal" });
  };

  return (
    <React.Fragment>
      <Maps id="map" />
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

const FloatActionBtn = styled.button`
  background-color: ${COLOR.THEME1.SECONDARY};
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
  box-shadow: 0.2vh 0.2vh 1vh 0.2vh ${COLOR.THEME1.PRIMARY};
  &:hover {
    cursor: pointer;
    background-color: ${COLOR.THEME1.PRIMARY};
  }
`;

export default Map;
