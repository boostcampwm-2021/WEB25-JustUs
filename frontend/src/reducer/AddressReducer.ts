const initState: {
  address: string;
} = {
  address: "",
};

const AddressReducer = (state = initState, action: any) => {
  switch (action.type) {
    case "SET_ADDRESS":
      return {
        ...state,
        address: action.payload,
      };

    default:
      return state;
  }
};

export default AddressReducer;
