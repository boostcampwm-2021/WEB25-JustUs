import { GroupAction } from "@src/action";

const initState = {
  selectedGroup: null,
  groups: [
    {
      groupID: 0,
      groupName: "그룹 A",
      img: "",
      albumList: [
        {
          albumID: 0,
          albumName: "일상 데이트",
          posts: [
            { postID: 0, postTitle: "돼지세끼" },
            { postID: 1, postTitle: "미삼집" },
            { postID: 2, postTitle: "남산서울타워" },
          ],
        },
        {
          albumID: 1,
          albumName: "2020 일본 여행",
          posts: [{ postID: 3, postTitle: "후쿠오카" }],
        },
        {
          albumID: 2,
          albumName: "기본 앨범",
          posts: [
            { postID: 4, postTitle: "스타벅스 리저브" },
            { postID: 5, postTitle: "롯데백화점" },
          ],
        },
      ],
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
    case GroupAction.SET_SELECTED_GROUP:
      return {
        ...state,
        selectedGroup: {
          groupID: action.payload.groupID,
          groupName: action.payload.groupName,
          groupImg: action.payload.groupImg,
          albumList: action.payload.albumList,
        },
      };

    default:
      return state;
  }
};

export default groupReducer;
