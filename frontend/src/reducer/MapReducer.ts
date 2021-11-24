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

export const SET_CLUSTERING_WINDOW = "SET_CLUSTERING_WINDOW";
export const SET_CLUSTERING_WINDOW_OPENED = "SET_CLUSTERING_WINDOW_OPENED";
export const CLOSE_CLUSTERING_WINDOW = "CLOSE_CLUSTERING_WINDOW";
export const SET_POST_CREATE_WINDOW = "SET_POST_CREATE_WINDOW";
export const SET_POST_CREATE_WINDOW_OPENED = "SET_POST_CREATE_WINDOW_OPENED";
export const CLOSE_POST_CREATE_WINDOW = "CLOSE_POST_CREATE_WINDOW";

const mapReducer = (state = initState, action: any) => {
  switch (action.type) {
    case SET_CLUSTERING_WINDOW: {
      return {
        ...state,
        clusteringWindow: action.payload.clusteringWindow,
      };
    }

    case SET_CLUSTERING_WINDOW_OPENED: {
      return {
        ...state,
        isClusteringWindowOpened: action.payload.isClusteringWindowOpened,
      };
    }
    case CLOSE_CLUSTERING_WINDOW: {
      state.clusteringWindow && state.clusteringWindow.close();
      return state;
    }
    case SET_POST_CREATE_WINDOW: {
      return {
        ...state,
        postCreateWindow: action.payload.postCreateWindow,
      };
    }

    case SET_POST_CREATE_WINDOW_OPENED: {
      return {
        ...state,
        isPostCreateWindowOpened: action.payload.isPostCreateWindowOpened,
      };
    }
    case CLOSE_POST_CREATE_WINDOW: {
      state.postCreateWindow && state.postCreateWindow.close();
      return state;
    }

    default:
      return state;
  }
};

export default mapReducer;
