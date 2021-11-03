import React, { useEffect } from "react";
import styled from "styled-components";
import color from "@styles/Color";
import { flexRowCenterAlign } from "@styles/StyledComponents";

const load = (url: string, cb: Function, err: Function) => {
  const element = document.createElement("script");
  const parent = "body";
  const attr = "src";

  element.async = true;
  element.onload = () => {
    cb();
  };
  element.onerror = () => {
    err();
  };
  element[attr] = url;
  document[parent].appendChild(element);
};

const Map = () => {
  useEffect(() => {
    const initMap = () => {
      const clientId: string = process.env.REACT_APP_NCP_CLOUD_ID as string;
      const url = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${clientId}`;
      load(
        url,
        () => {
          const map = new naver.maps.Map("map", {
            center: new naver.maps.LatLng(37.511337, 127.012084),
            zoom: 13,
          });
        },
        () => {
          console.error("잘못되었습니다.");
        },
      );
    };
    initMap();
  }, []);

  return (
    <React.Fragment>
      <Maps id="map" />
      <FloatActionBtn>+</FloatActionBtn>
    </React.Fragment>
  );
};

const Maps = styled.div`
  position: absolute;
  width: 100%;
  height: 95vh;
`;

const FloatActionBtn = styled.div`
  background-color: ${color.theme1.secondary};
  position: absolute;
  z-index: 2;
  border-radius: 50%;
  height: 8vh;
  width: 8vh;
  bottom: 8vh;
  right: 8vh;
  ${flexRowCenterAlign}
  color: ${color.white};
  font-size: 7vh;
  box-shadow: 0.2vh 0.2vh 1vh 0.2vh ${color.theme1.primary};
  &:hover {
    cursor: pointer;
    background-color: ${color.theme1.primary};
  }
`;

export default Map;
