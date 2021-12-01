import { customAxios, multiFormDataHeader } from "@src/lib/customAxios";

const groupApi = {
  createGroup: async (payload: any) => {
    const URL = `/api/groups`;
    const formData = new FormData();
    formData.append("groupImage", payload?.groupImage);
    formData.append("groupName", payload.groupName);
    const result = await customAxios.post(URL, formData, multiFormDataHeader);
    return result;
  },

  getAlbumList: async (payload: any) => {
    const URL = `/api/groups/${payload.groupId}/albums`;
    const result = await customAxios.get(URL);
    return result;
  },

  deleteGroup: async (payload: any) => {
    const URL = `/api/groups/${payload.groupId}`;
    const result = await customAxios.delete(URL);
    return result;
  },

  getGroupMemberList: async (payload: any) => {
    const URL = `/api/groups/${payload.groupId}`;
    const result = await customAxios.get(URL);
    return result;
  },

  joinGroup: async (payload: any) => {
    const { code } = payload;
    const URL = `/api/groups/join`;
    const params = { code };
    const result = await customAxios.post(URL, params);
    return result;
  },

  updateGroup: async (payload: any) => {
    const URL = `/api/groups/${payload.groupId}`;
    const formData = new FormData();
    formData.append("groupName", payload.groupName);
    formData.append("groupImage", payload?.groupImage);
    formData.append("clearImage", payload.clearImage);
    const result = await customAxios.put(URL, formData, multiFormDataHeader);
    return result;
  },

  getHashtags: async (payload: any) => {
    const URL = `/api/groups/${payload.groupId}/hashtags`;
    const result = await customAxios.get(URL);
    return result;
  },
};

export default groupApi;
