const initState: {
  address: string;
  position: { x: number; y: number };
} = {
  address: "",
  position: { x: -1, y: -1 },
};

const AddressReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };
    case "SET_POSITION":
      return {
        ...state,
        position: action.payload,
      };
    default:
      return state;
  }
};

export default AddressReducer;
