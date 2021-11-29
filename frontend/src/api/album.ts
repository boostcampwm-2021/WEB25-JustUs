import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const albumApi = {
  createAlbum: (albumName: string, groupId: number) => {
    return axios.post(`${SERVER_URL}/api/albums`, { albumName, groupId }, { withCredentials: true });
  },

  updateAlbum: (albumName: string, albumId: number) => {
    return axios.put(`${SERVER_URL}/api/albums/${albumId}`, { albumName }, { withCredentials: true });
  },

  deleteAlbum: (albumId: number) => {
    return axios.delete(`${SERVER_URL}/api/albums/${albumId}`, { withCredentials: true });
  },

  updateAlbumOrder: (groupId: number, albumOrder: string) => {
    return axios.put(`${SERVER_URL}/api/groups/${groupId}/albumorder`, { albumOrder }, { withCredentials: true });
  },

  postShiftAlbum: (postId: number, albumId: number) => {
    return axios.put(`${SERVER_URL}/api/posts/${postId}/shift`, { albumId }, { withCredentials: true });
  },
};

export default albumApi;
