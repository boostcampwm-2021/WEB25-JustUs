const mapAction = {
  SET_CLUSTERING_WINDOW: "SET_CLUSTERING_WINDOW",
  SET_CLUSTERING_WINDOW_OPENED: "SET_CLUSTERING_WINDOW_OPENED",
  CLOSE_CLUSTERING_WINDOW: "CLOSE_CLUSTERING_WINDOW",
  SET_POST_CREATE_WINDOW: "SET_POST_CREATE_WINDOW",
  SET_POST_CREATE_WINDOW_OPENED: "SET_POST_CREATE_WINDOW_OPENED",
  CLOSE_POST_CREATE_WINDOW: "CLOSE_POST_CREATE_WINDOW",

  setClusteringWindowAction: (payload: { clusteringWindow: naver.maps.InfoWindow }) => {
    return { type: mapAction.SET_CLUSTERING_WINDOW, payload };
  },

  setClusteringWindowOpenedAction: (payload: { isClusteringWindowOpened: boolean }) => {
    return { type: mapAction.SET_CLUSTERING_WINDOW_OPENED, payload };
  },

  closeClusteringWindowAction: () => {
    return { type: mapAction.CLOSE_CLUSTERING_WINDOW };
  },

  setPostCreateWindowAction: (payload: { postCreateWindow: naver.maps.InfoWindow }) => {
    return { type: mapAction.SET_POST_CREATE_WINDOW, payload };
  },

  setPostCreateWindowOpenedAction: (payload: { isPostCreateWindowOpened: boolean }) => {
    return { type: mapAction.SET_POST_CREATE_WINDOW_OPENED, payload };
  },

  closePostCreateWindowAction: () => {
    return { type: mapAction.CLOSE_POST_CREATE_WINDOW };
  },
};

export default mapAction;
