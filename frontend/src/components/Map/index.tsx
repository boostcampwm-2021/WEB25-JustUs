import React, { useEffect } from "react";
import styled from "styled-components";
import Color from "@styles/Color";
import { flexCenterAlign } from "@styles/StyledComponents";

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
  width: 90%;
  height: 95vh;
`;

const FloatActionBtn = styled.div`
  ${flexCenterAlign}
  background-color: ${Color["theme1-secondary"]};
  position: absolute;
  border-radius: 50%;
  height: 8vh;
  width: 8vh;
  bottom: 8vh;
  right: 8vh;
  color: ${Color.white};
  font-size: 7vh;
  box-shadow: 0.2vh 0.2vh 1vh 0.2vh ${Color["theme1-primary"]};
  &:hover {
    cursor: pointer;
    background-color: ${Color["theme1-primary"]};
  }
`;

export default Map;
