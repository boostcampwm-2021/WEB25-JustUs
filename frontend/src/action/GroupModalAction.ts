interface IClickedTarget {
  target: EventTarget | null;
  clientX: number;
  clientY: number;
}

const groupModalAction = {
  SET_CLICKED_TARGET: "SET_CLICKED_TARGET",

  setClickedTargetAction: (payload: IClickedTarget) => {
    return {
      type: groupModalAction.SET_CLICKED_TARGET,
      payload,
    };
  },
};

export default groupModalAction;
