import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@src/reducer";
import Marker from "@components/Map/Markers";
import MapLayerPostModal from "./Modal";
import SetClustering from "@components/Map/SetClustering";
import ReactDOM from "react-dom";
import PostListModal from "@components/Modal/PostListModal";
import {
  SET_CLUSTERING_WINDOW,
  SET_CLUSTERING_WINDOW_OPENED,
  SET_POST_CREATE_WINDOW,
  SET_POST_CREATE_WINDOW_OPENED,
} from "@src/reducer/MapReducer";
import { AddressAction } from "@src/action";

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
  latlng: naver.maps.LatLng;
}

interface PostType {
  postId: number;
  postTitle: string;
  postLatitude: number;
  postLongitude: number;
}
interface IPodo {
  content: string;
  size: naver.maps.Size;
  origin: naver.maps.Point;
}

interface IMarkerClustering {
  minClusterSize: number;
  maxZoom: number;
  map: naver.maps.Map;
  markers: Array<naver.maps.Marker>;
  disableClickZoom: boolean;
  gridSize: number;
  icons: Array<IPodo>;
  indexGenerator: Array<number>;
  setMap: Function;
}

interface IClustredMember extends naver.maps.MarkerOptions {
  postId: number;
}

interface IPostsList {
  postsList: PostType[];
}

const convertWidth = (width: number) => {
  if (width <= 768) return 4;
  if (width <= 1100) return 6;
  if (width <= 1440) return 8;
  if (width <= 2000) return 10;
  if (width <= 3000) return 12;
  if (width <= 6000) return 24;
  return 30;
};

const setMap = (
  INIT_X: number,
  INIT_Y: number,
  ZOOM_SIZE: number,
  setNaverMap: Dispatch<SetStateAction<naver.maps.Map | undefined>>,
  dispatch: Dispatch<{
    type: string;
    payload:
      | { clusteringWindow: naver.maps.InfoWindow }
      | { isClusteringWindowOpened: boolean }
      | { postCreateWindow: naver.maps.InfoWindow }
      | { isPostCreateWindowOpened: boolean }
      | string
      | { x: number; y: number };
  }>,
) => {
  const pos = new naver.maps.LatLng(INIT_X, INIT_Y);
  const map = new naver.maps.Map("map", {
    center: pos,
    zoom: ZOOM_SIZE,
    minZoom: 8,
    maxZoom: 17,
  });

  setNaverMap(map);
  const newClusteringWindow = new naver.maps.InfoWindow({
    content: "",
    maxWidth: 200,
    borderColor: COLOR.GRAY,
    borderWidth: 2,
    disableAnchor: true,
  });

  const newPostCreateWindow = new naver.maps.InfoWindow({
    content: "",
    maxWidth: 200,
    disableAnchor: true,
    borderColor: "transparent",
    backgroundColor: "transparent",
    pixelOffset: { x: 5 * convertWidth(window.innerWidth), y: 5 * convertWidth(window.innerWidth) },
  });

  dispatch({ type: SET_CLUSTERING_WINDOW, payload: { clusteringWindow: newClusteringWindow } });
  dispatch({ type: SET_POST_CREATE_WINDOW, payload: { postCreateWindow: newPostCreateWindow } });

  naver.maps.Event.addListener(map, "rightclick", (e: PointerEvent) => {
    newPostCreateWindow.setContent(
      ['<div id="createPostWindow" style="border: none; width: 10rem; height: 4rem;">'].join(""),
    );
    newPostCreateWindow.open(map, e.latlng);

    const modalOpen = (x: number, y: number) => {
      dispatch({ type: SET_POST_CREATE_WINDOW_OPENED, payload: { isPostCreateWindowOpened: false } });
      dispatch(AddressAction.setAddressAction(""));
      dispatch(AddressAction.setPositionAction({ x, y }));
      dispatch({ type: "OPEN_MODAL", payload: "UploadAddressModal" });
    };

    ReactDOM.render(
      <React.StrictMode>
        <MapLayerPostModal
          latLng={e.latlng}
          clickInfo={e}
          rightPosition={{ x: e.pointerEvent.pageX, y: e.pointerEvent.pageY }}
          modalOpen={modalOpen}
        />
      </React.StrictMode>,
      document.getElementById("createPostWindow"),
    );

    dispatch({ type: SET_POST_CREATE_WINDOW_OPENED, payload: { isPostCreateWindowOpened: true } });
  });
  naver.maps.Event.addListener(map, "zoom_changed", (e: Number) => {
    dispatch({ type: SET_POST_CREATE_WINDOW_OPENED, payload: { isPostCreateWindowOpened: false } });
    newClusteringWindow.close();
    dispatch({ type: SET_CLUSTERING_WINDOW_OPENED, payload: { isClusteringWindowOpened: false } });
  });
  naver.maps.Event.addListener(map, "mousedown", (e: PointerEvent) => {
    newClusteringWindow.close();
    newPostCreateWindow.close();
    dispatch({ type: SET_POST_CREATE_WINDOW_OPENED, payload: { isPostCreateWindowOpened: false } });
    dispatch({ type: SET_CLUSTERING_WINDOW_OPENED, payload: { isClusteringWindowOpened: false } });
  });
};

const Map = () => {
  const dispatch = useDispatch();
  const {
    clusteringWindow,
    postCreateWindow,
  }: { clusteringWindow: naver.maps.InfoWindow | null; postCreateWindow: naver.maps.InfoWindow | null } = useSelector(
    (state: RootState) => state.map,
  );

  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [currentMarkers, setCurrentMarkers] = useState<Array<naver.maps.Marker>>([]);
  const [currentClustering, setCurrentClustering] = useState<IMarkerClustering | undefined>(undefined);
  const { postsList }: IPostsList = useSelector((state: RootState) => state.groups);
  const { selectedPost }: any = useSelector((state: RootState) => state.modal);
  const { nowTheme }: any = useSelector((state: RootState) => state.theme);

  useEffect(() => {
    const initMap = () => {
      const INIT_X = 37.511337;
      const INIT_Y = 127.012084;
      const ZOOM_SIZE = 13;
      setMap(INIT_X, INIT_Y, ZOOM_SIZE, setNaverMap, dispatch);
    };
    initMap();
  }, []);

  useEffect(() => {
    if (!postsList) return;

    const setMarker = () => {
      const handleClickMarker = (clickedPostID: number) => {
        if (clusteringWindow) clusteringWindow.close();
        if (postCreateWindow) postCreateWindow.close();

        dispatch({ type: SET_POST_CREATE_WINDOW_OPENED, payload: { isPostCreateWindowOpened: false } });
        dispatch({ type: "SELECT_POST_REQUEST", postId: clickedPostID });
      };

      const markers = postsList.map((post: PostType) => {
        const pos = new naver.maps.LatLng(post.postLatitude, post.postLongitude);
        const marker = new naver.maps.Marker(Marker(naverMap as naver.maps.Map, pos, post.postTitle, post.postId));
        naver.maps.Event.addListener(marker, "click", () => handleClickMarker(post.postId));
        return marker;
      });

      const handleClickClustering = (members: IClustredMember[], LatLng: naver.maps.LatLng) => {
        dispatch({ type: SET_POST_CREATE_WINDOW_OPENED, payload: { isPostCreateWindowOpened: false } });
        const clusteredMarker = members.map((member) => {
          return { postId: member.postId, postTitle: member.title };
        });

        if (!clusteringWindow) return;
        clusteringWindow.setContent(['<div id="clustredMarkerList" style="width:20rem;height:10rem;">'].join(""));
        if (!naverMap) return;
        clusteringWindow.open(naverMap, LatLng);
        dispatch({ type: SET_CLUSTERING_WINDOW_OPENED, payload: { isClusteringWindowOpened: true } });

        ReactDOM.render(
          <React.StrictMode>
            <PostListModal
              clusteredMarker={clusteredMarker}
              handleClickMarker={handleClickMarker}
              nowTheme={nowTheme}
            />
          </React.StrictMode>,
          document.getElementById("clustredMarkerList"),
        );
      };

      const markerClustering = new MarkerClustering(
        SetClustering(naverMap as naver.maps.Map, markers, handleClickClustering),
      );
      setCurrentMarkers(markers);
      setCurrentClustering(markerClustering);
    };

    setMarker();
  }, [postsList]);

  useEffect(() => {
    return () => {
      currentMarkers.forEach((marker) => {
        marker.setVisible(false);
        marker.setMap(null);
      });

      if (!currentClustering) return;
      currentClustering.setMap(null);
    };
  }, [currentMarkers]);

  useEffect(() => {
    if (naverMap) {
      const coord = { lat: selectedPost.postLatitude, lng: selectedPost.postLongitude };
      const zoom = 15;
      const transitionOptions = { duration: 1000, easing: "linear" };

      naverMap.morph(coord, zoom, transitionOptions);
    }
  }, [selectedPost]);

  const modalOpen = () => {
    dispatch(AddressAction.setAddressAction(""));
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
  z-index: 1;
  &:focus-visible {
    outline: none;
  }
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
