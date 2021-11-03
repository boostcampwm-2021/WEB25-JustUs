import { GroupAction } from "@src/action";

const initState = {
  groups: [
    {
      groupID: 0,
      groupName: "그룹 A",
      img: "",
    },
    {
      groupID: 1,
      groupName: "그룹 B",
      img: "",
    },
    {
      groupID: 2,
      groupName: "그룹 C",
      img: "",
    },
  ],
};

const groupReducer = (state = initState, action: any) => {
  switch (action.type) {
    case GroupAction.ADD_GROUP:
      return {
        ...state,
        groups: [...state.groups, action.payload],
      };

    default:
      return state;
  }
};

export default groupReducer;
