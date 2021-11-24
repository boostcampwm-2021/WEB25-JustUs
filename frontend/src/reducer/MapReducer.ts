interface IInitState {
  isRightClickModalOpened: boolean;
  clusteringWindow: naver.maps.InfoWindow | null;
  isClusteringWindowOpened: boolean;
}

const initState: IInitState = {
  isRightClickModalOpened: false,
  clusteringWindow: null,
  isClusteringWindowOpened: false,
};

export const SET_RIGHT_CLICK_MODAL = "SET_RIGHT_CLICK_MODAL";
export const SET_CLUSTERING_WINDOW = "SET_CLUSTERING_WINDOW";
export const CLOSE_CLUSTERING_WINDOW = "CLOSE_CLUSTERING_WINDOW";
export const SET_CLUSTERING_WINDOW_OPENED = "SET_CLUSTERING_WINDOW_OPENED";

const mapReducer = (state = initState, action: any) => {
  switch (action.type) {
    case SET_RIGHT_CLICK_MODAL: {
      return {
        ...state,
        isRightClickModalOpened: action.payload.isRightClickModalOpened,
      };
    }
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
      state.clusteringWindow && state.isClusteringWindowOpened && state.clusteringWindow.close();
      return state;
    }

    default:
      return state;
  }
};

export default mapReducer;
