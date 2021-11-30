import axios from "axios";
import { customAxios } from "@src/lib/customAxios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const groupApi = {
  createGroup: async (payload: any) => {
    const formData = new FormData();
    if (payload.groupImage) {
      formData.append("groupImage", payload.groupImage);
    }
    formData.append("groupName", payload.groupName);

    const result = await customAxios.post(`/api/groups`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result;
  },

  getAlbumList: async (payload: any) => {
    const result = await customAxios.get(`/api/groups/${payload.groupId}/albums`);
    return result;
  },

  deleteGroup: async (payload: any) => {
    const result = await customAxios.delete(`/api/groups/${payload.groupId}`);
    return result;
  },

  getGroupMemberList: async (payload: any) => {
    const result = await customAxios.get(`/api/groups/${payload.groupId}`);
    return result;
  },

  joinGroup: async (payload: any) => {
    const { code } = payload;
    const result = await customAxios.post(`/api/groups/join`, { code });
    return result;
  },

  updateGroup: async (payload: any) => {
    const formData = new FormData();
    formData.append("groupName", payload.groupName);
    if (payload.groupImage) formData.append("groupImage", payload.groupImage);
    formData.append("clearImage", payload.clearImage);

    const result = await customAxios.put(`/api/groups/${payload.groupId}`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result;
  },

  getHashtags: async (payload: any) => {
    const result = await customAxios.get(`/api/groups/${payload.groupId}/hashtags`);
    return result;
  },
};

export default groupApi;
