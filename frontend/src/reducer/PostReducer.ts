import { PostAction } from "@src/action";

const initState = {
  posts: [
    { postID: 0, postTitle: "강남역", postLatitude: 37.497912, postLongitude: 127.027616 },
    { postID: 1, postTitle: "이수역", postLatitude: 37.48670440494385, postLongitude: 126.98218497576075 },
    { postID: 2, postTitle: "옥수역", postLatitude: 37.54049696552621, postLongitude: 127.01873018465605 },
  ],
};

const postReducer = (state = initState, action: any) => {
  switch (action.type) {
    case PostAction.SET_POSTS:
      return {
        posts: state.posts.filter((post) => post.postID !== action.payload.postID),
      };

    default:
      return state;
  }
};

export default postReducer;
