import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import COLOR from "@styles/Color";
import { flexRowCenterAlign } from "@styles/StyledComponents";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@src/reducer";
import Marker from "@components/Map/Markers";
import MapLayerPostModal from "./Modal";
import dummyPosts from "./dummyPosts";
import SetClustering from "@components/Map/SetClustering";

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

interface PostType {
  postID: number;
  postTitle: string;
  postLatitude: number;
  postLongitude: number;
}

interface IDispatch {
  type: string;
  payload: any;
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

interface ISelectedPost {
  postID: number;
  postTitle: string;
  postContent: string;
  postDate: string;
  userNickname: string;
  postImages: Array<{ file: string; key: string }>;
}

const setMap = (
  INIT_X: number,
  INIT_Y: number,
  ZOOM_SIZE: number,
  setIsRightClick: Dispatch<SetStateAction<Boolean>>,
  setRightPosition: Dispatch<SetStateAction<Point>>,
  setClickInfo: Dispatch<SetStateAction<PointerEvent>>,
  setNaverMap: Dispatch<SetStateAction<naver.maps.Map | undefined>>,
) => {
  const pos = new naver.maps.LatLng(INIT_X, INIT_Y);
  const map = new naver.maps.Map("map", {
    center: pos,
    zoom: ZOOM_SIZE,
    minZoom: 8,
    maxZoom: 17,
  });

  setNaverMap(map);

  naver.maps.Event.addListener(map, "rightclick", (e: PointerEvent) => {
    setClickInfo(e);
    setRightPosition({ x: e.pointerEvent.pageX, y: e.pointerEvent.pageY });
    setIsRightClick(true);
  });
  naver.maps.Event.addListener(map, "zoom_changed", (e: Number) => {
    setIsRightClick(false);
  });
  naver.maps.Event.addListener(map, "mousedown", (e: PointerEvent) => {
    setIsRightClick(false);
  });
};

const Map = () => {
  const dispatch = useDispatch<Dispatch<IDispatch>>();
  const [isRightClick, setIsRightClick] = useState<Boolean>(false);
  const [rightPosition, setRightPosition] = useState<Point>({ x: 0, y: 0 });
  const [clickInfo, setClickInfo] = useState<any>();
  const [naverMap, setNaverMap] = useState<naver.maps.Map>();
  const [currentMarkers, setCurrentMarkers] = useState<Array<naver.maps.Marker>>([]);
  const [currentClustering, setCurrentClustering] = useState<IMarkerClustering | undefined>(undefined);
  const { postsList }: IPostsList = useSelector((state: RootState) => state.groups);
  const { selectedPost }: any = useSelector((state: RootState) => state.modal);

  useEffect(() => {
    const initMap = () => {
      const INIT_X = 37.511337;
      const INIT_Y = 127.012084;
      const ZOOM_SIZE = 13;
      setMap(INIT_X, INIT_Y, ZOOM_SIZE, setIsRightClick, setRightPosition, setClickInfo, setNaverMap);
    };
    initMap();
  }, []);

  useEffect(() => {
    if (!postsList) return;

    const setMarker = () => {
      const handleClickMarker = (clickedPostID: number) => {
        // 아래 로직은 나중에 백엔드 API 요청을 통해 클릭한 게시글의 상세 정보를 가져온다.
        const targetPost = dummyPosts.find((post) => post.postID === clickedPostID);
        dispatch({ type: "SET_SELECTED_POST", payload: targetPost });
        dispatch({ type: "OPEN_MODAL", payload: "PostShowModal" });
      };

      const markers = postsList.map((post: PostType) => {
        const pos = new naver.maps.LatLng(post.postLatitude, post.postLongitude);
        const marker = new naver.maps.Marker(Marker(naverMap as naver.maps.Map, pos, post.postTitle, post.postID));
        naver.maps.Event.addListener(marker, "click", () => handleClickMarker(post.postID));
        return marker;
      });

      const clickHandler = (members: IClustredMember[]) => {
        const clusteredMarker = members.map((member) => {
          return { postId: member.postId, postTitle: member.title };
        });
        dispatch({ type: "SET_CLUSTERED_MARKER", payload: clusteredMarker });
        dispatch({ type: "OPEN_MODAL", payload: "PostListModal" });
      };

      const markerClustering = new MarkerClustering(SetClustering(naverMap as naver.maps.Map, markers, clickHandler));
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
    dispatch({ type: "SET_ADDRESS", payload: "" });
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
