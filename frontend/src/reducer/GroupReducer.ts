import { GroupAction } from "@src/action";
import AlbumList from "@src/components/Sidebar/SecondDepth/AlbumList";

interface GroupType {
  groupID: number;
  groupName: string;
  groupImg: string;
}
interface PostType {
  postID: number;
  postTitle: string;
  postLatitude: number;
  postLongitude: number;
}
interface AlbumListItemType {
  albumID: number;
  albumName: string;
  posts: PostType[];
}

const initState: { selectedGroup: GroupType | null; albumList: AlbumListItemType[]; groups: Array<GroupType> } = {
  selectedGroup: null,
  albumList: [{ albumID: 0, albumName: "", posts: [] }],
  groups: [
    {
      groupID: 0,
      groupName: "그룹 A",
      groupImg: "/img/dummy-group1.png",
    },
    {
      groupID: 1,
      groupName: "그룹 B",
      groupImg: "/img/dummy-group2.png",
    },
    {
      groupID: 2,
      groupName: "그룹 C",
      groupImg: "/img/dummy-group3.png",
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
        selectedGroup: action.payload
          ? { groupID: action.payload.groupID, groupName: action.payload.groupName, groupImg: action.payload.groupImg }
          : null,
        albumList: action.payload.albumList,
      };
    case GroupAction.DELETE_GROUP:
      return {
        ...state,
        selectedGroup: state.groups.filter((group) => group.groupID !== action.payload.groupID),
      };
    case GroupAction.MOVE_POST:
      const beforeIdx = action.payload.beforeIdx;
      const afterIdx = action.payload.afterIdx;
      const post = action.payload.post;
      const newAlbumList = state.albumList.map((album: AlbumListItemType, idx) => {
        if (idx != beforeIdx) return album;
        const updateAlbum: AlbumListItemType = {
          albumID: album.albumID,
          albumName: album.albumName,
          posts: [],
        };
        updateAlbum.posts = album.posts.filter((now) => now.postID != post.postID);
        return updateAlbum;
      });
      newAlbumList[afterIdx].posts.push(post);
      return {
        ...state,
        albumList: newAlbumList,
      };
    // case GroupAction.SET_ALL_GROUPS:
    //   return {
    //     ...state,
    //     groups: action.payload,
    //   };

    default:
      return state;
  }
};

export default groupReducer;
