import AlbumAPI from "./album";
import GroupAPI from "./group";
import PostAPI from "./post";
import UserAPI from "./user";
import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

export const RefreshAPI = async () => {
  await axios.get(`${SERVER_URL}/api/auth/refresh-token`, { withCredentials: true });
};

export { AlbumAPI, GroupAPI, PostAPI, UserAPI };
