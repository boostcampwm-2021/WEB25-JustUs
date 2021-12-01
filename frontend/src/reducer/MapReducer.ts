import { MapAction } from "@src/action";

interface IInitState {
  clusteringWindow: naver.maps.InfoWindow | null;
  isClusteringWindowOpened: boolean;
  postCreateWindow: naver.maps.InfoWindow | null;
  isPostCreateWindowOpened: boolean;
}

const initState: IInitState = {
  clusteringWindow: null,
  isClusteringWindowOpened: false,
  postCreateWindow: null,
  isPostCreateWindowOpened: false,
};

const mapReducer = (state = initState, action: any) => {
  switch (action.type) {
    case MapAction.SET_CLUSTERING_WINDOW: {
      return {
        ...state,
        clusteringWindow: action.payload.clusteringWindow,
      };
    }

    case MapAction.SET_CLUSTERING_WINDOW_OPENED: {
      return {
        ...state,
        isClusteringWindowOpened: action.payload.isClusteringWindowOpened,
      };
    }
    case MapAction.CLOSE_CLUSTERING_WINDOW: {
      return {
        ...state,
        isClusteringWindowOpened: false,
      };
    }
    case MapAction.SET_POST_CREATE_WINDOW: {
      return {
        ...state,
        postCreateWindow: action.payload.postCreateWindow,
      };
    }
    case MapAction.SET_POST_CREATE_WINDOW_OPENED: {
      return {
        ...state,
        isPostCreateWindowOpened: action.payload.isPostCreateWindowOpened,
      };
    }
    case MapAction.CLOSE_POST_CREATE_WINDOW: {
      return {
        ...state,
        isPostCreateWindowOpened: false,
      };
    }

    default:
      return state;
  }
};

export default mapReducer;
