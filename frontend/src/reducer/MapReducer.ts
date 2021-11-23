interface IInitState {
  isRightClickModalOpened: boolean;
  infoWindow: naver.maps.InfoWindow | null;
  isInfoWindowOpened: boolean;
}

const initState: IInitState = {
  isRightClickModalOpened: false,
  infoWindow: null,
  isInfoWindowOpened: false,
};

export const SET_RIGHT_CLICK_MODAL = "SET_RIGHT_CLICK_MODAL";
export const SET_INFO_WINDOW = "SET_INFO_WINDOW";
export const CLOSE_INFO_WINDOW = "CLOSE_INFO_WINDOW";
export const SET_INFO_WINDOW_OPENED = "SET_INFO_WINDOW_OPENED";

const mapReducer = (state = initState, action: any) => {
  switch (action.type) {
    case SET_RIGHT_CLICK_MODAL: {
      return {
        ...state,
        isRightClickModalOpened: action.payload,
      };
    }
    case SET_INFO_WINDOW: {
      return {
        ...state,
        infoWindow: action.payload,
      };
    }

    case SET_INFO_WINDOW_OPENED: {
      return {
        ...state,
        isInfoWindowOpened: action.payload,
      };
    }
    case CLOSE_INFO_WINDOW: {
      state.infoWindow && state.isInfoWindowOpened && state.infoWindow.close();
      return state;
    }

    default:
      return state;
  }
};

export default mapReducer;
