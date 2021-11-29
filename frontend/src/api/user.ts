import axios from "axios";

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
    return axios.get(`${SERVER_URL}/api/user`, { withCredentials: true });
  },

  getLogOut: () => {
    return axios.post(`${SERVER_URL}/api/auth/logout`, {}, { withCredentials: true });
  },

  updateUserInfo: async (user: IUser) => {
    const formData = new FormData();

    formData.append("userNickname", user.updateUserNickName);
    formData.append("clearImage", user.updateUserProfile === "deleted" ? "1" : "0");
    if (user.updateUserProfile) formData.append("profileImage", user.updateUserProfile);

    const result = await axios.put(`${SERVER_URL}/api/user`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result;
  },

  getGroupList: async () => {
    const result = await axios.get(`${SERVER_URL}/api/user/groups`, { withCredentials: true });
    return result;
  },

  updateGroupOrder: async (payload: any) => {
    const { groupOrder } = payload;
    const result = axios.put(`${SERVER_URL}/api/user/grouporder`, { groupOrder }, { withCredentials: true });
    return result;
  },
};

export default userApi;
