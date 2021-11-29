const addressAction = {
  SET_ADDRESS: "SET_ADDRESS",
  SET_POSITION: "SET_POSITION",

  setAddressAction: (payload: string) => {
    return {
      type: addressAction.SET_ADDRESS,
      payload,
    };
  },

  setPositionAction: (payload: { x: number; y: number }) => {
    return {
      type: addressAction.SET_POSITION,
      payload,
    };
  },
};

export default addressAction;
