import AlbumAPI from "./album";
import GroupAPI from "./group";
import PostAPI from "./post";
import UserAPI from "./user";
import { customAxios } from "@src/lib/customAxios";

export const RefreshAPI = async () => {
  const URL = `/api/auth/refresh-token`;
  await customAxios.get(URL);
};

export { AlbumAPI, GroupAPI, PostAPI, UserAPI };
