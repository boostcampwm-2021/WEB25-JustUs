import axios from "axios";
import { customAxios } from "@src/lib/customAxios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const albumApi = {
  createAlbum: (albumName: string, groupId: number) => {
    // return axios.post(`${SERVER_URL}/api/albums`, { albumName, groupId }, { withCredentials: true });
    return customAxios.post(`/api/albums`, { albumName, groupId });
  },

  updateAlbum: (albumName: string, albumId: number) => {
    // return axios.put(`${SERVER_URL}/api/albums/${albumId}`, { albumName }, { withCredentials: true });
    return customAxios.put(`/api/albums/${albumId}`, { albumName });
  },

  deleteAlbum: (albumId: number) => {
    // return axios.delete(`${SERVER_URL}/api/albums/${albumId}`, { withCredentials: true });
    return customAxios.delete(`/api/albums/${albumId}`);
  },

  updateAlbumOrder: (groupId: number, albumOrder: string) => {
    // return axios.put(`${SERVER_URL}/api/groups/${groupId}/albumorder`, { albumOrder }, { withCredentials: true });
    return customAxios.put(`/api/groups/${groupId}/albumorder`, { albumOrder });
  },

  postShiftAlbum: (postId: number, albumId: number) => {
    // return axios.put(`${SERVER_URL}/api/posts/${postId}/shift`, { albumId }, { withCredentials: true });
    return customAxios.put(`/api/posts/${postId}/shift`, { albumId });
  },
};

export default albumApi;
