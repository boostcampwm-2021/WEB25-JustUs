import { customAxios, multiFormDataHeader } from "@src/lib/customAxios";

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
    const URL = `/api/user`;
    return customAxios.get(URL);
  },

  getLogOut: () => {
    const URL = `/api/auth/logout`;
    return customAxios.post(URL, {});
  },

  updateUserInfo: async (user: IUser) => {
    const URL = `/api/user`;
    const formData = new FormData();
    const { updateUserNickName, updateUserProfile } = user;
    formData.append("userNickname", updateUserNickName);
    formData.append("clearImage", updateUserProfile === "deleted" ? "1" : "0");
    if (updateUserProfile) formData.append("profileImage", updateUserProfile);
    const result = await customAxios.put(URL, formData, multiFormDataHeader);
    return result;
  },

  getGroupList: async () => {
    const URL = `/api/user/groups`;
    const result = await customAxios.get(URL);
    return result;
  },

  updateGroupOrder: async (payload: any) => {
    const { groupOrder } = payload;
    const URL = `/api/user/grouporder`;
    const params = { groupOrder };
    const result = customAxios.put(URL, params);
    return result;
  },
};

export default userApi;
