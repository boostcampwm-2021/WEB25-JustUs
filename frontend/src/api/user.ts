import axios from "axios";
import { customAxios } from "@src/lib/customAxios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

interface IUser {
  userNickName: string;
  userProfile: string;
  userInfoLoading: boolean;
  userInfoSucceed: boolean;
  userInfoError: boolean;
  updateUserNickName: string;
  updateUserProfile: string;
}

const userApi = {
  getUserInfo: () => {
    return customAxios.get(`/api/user`);
  },

  getLogOut: () => {
    return customAxios.post(`/api/auth/logout`, {});
  },

  updateUserInfo: async (user: IUser) => {
    const formData = new FormData();

    formData.append("userNickname", user.updateUserNickName);
    formData.append("clearImage", user.updateUserProfile === "deleted" ? "1" : "0");
    if (user.updateUserProfile) formData.append("profileImage", user.updateUserProfile);

    const result = await customAxios.put(`/api/user`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result;
  },

  getGroupList: async () => {
    const result = await customAxios.get(`/api/user/groups`);
    return result;
  },

  updateGroupOrder: async (payload: any) => {
    const { groupOrder } = payload;
    const result = customAxios.put(`/api/user/grouporder`, { groupOrder });
    return result;
  },
};

export default userApi;
