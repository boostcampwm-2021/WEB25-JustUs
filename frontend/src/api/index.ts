import AlbumAPI from "./album";
import GroupAPI from "./group";
import PostAPI from "./post";
import UserAPI from "./user";
import { customAxios } from "@src/lib/customAxios";

export const RefreshAPI = async () => {
  const URL = `/api/auth/refresh-token`;
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) throw new Error();
  await customAxios.get(URL, {
    headers: {
      refreshToken: refreshToken as string,
    },
  });
};

export { AlbumAPI, GroupAPI, PostAPI, UserAPI };
