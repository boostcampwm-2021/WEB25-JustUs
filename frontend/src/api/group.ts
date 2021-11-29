import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const groupApi = {
  getGroupInfoApi: (params: any) => {
    const URL = "/api/groups";
    const option = {
      method: "GET",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        groupId: params.groupId,
      }),
    };
    return fetch(URL, option);
  },

  createGroup: async (payload: any) => {
    const formData = new FormData();
    if (payload.groupImage) {
      formData.append("groupImage", payload.groupImage);
    }
    formData.append("groupName", payload.groupName);

    const result = await axios.post(`${SERVER_URL}/api/groups`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result;
  },

  getAlbumList: async (payload: any) => {
    const result = await axios.get(`${SERVER_URL}/api/groups/${payload.groupId}/albums`, { withCredentials: true });
    return result;
  },

  deleteGroup: async (payload: any) => {
    const result = await axios.delete(`${SERVER_URL}/api/groups/${payload.groupId}`, { withCredentials: true });
    return result;
  },

  getGroupMemberList: async (payload: any) => {
    const result = await axios.get(`${SERVER_URL}/api/groups/${payload.groupId}`, { withCredentials: true });
    return result;
  },

  joinGroup: async (payload: any) => {
    const { code } = payload;
    const result = await axios.post(`${SERVER_URL}/api/groups/join`, { code }, { withCredentials: true });
    return result;
  },

  updateGroup: async (payload: any) => {
    const formData = new FormData();
    formData.append("groupName", payload.groupName);
    if (payload.groupImage) formData.append("groupImage", payload.groupImage);
    formData.append("clearImage", payload.clearImage);

    const result = await axios.put(`${SERVER_URL}/api/groups/${payload.groupId}`, formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    });

    return result;
  },

  getHashtags: async (payload: any) => {
    const result = await axios.get(`${SERVER_URL}/api/groups/${payload.groupId}/hashtags`, { withCredentials: true });
    return result;
  },
};

export default groupApi;
