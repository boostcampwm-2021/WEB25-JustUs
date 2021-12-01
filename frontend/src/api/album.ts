import { customAxios } from "@src/lib/customAxios";

const albumApi = {
  createAlbum: (albumName: string, groupId: number) => {
    const URL = `/api/albums`;
    const params = { albumName, groupId };
    return customAxios.post(URL, params);
  },

  updateAlbum: (albumName: string, albumId: number) => {
    const URL = `/api/albums/${albumId}`;
    const params = { albumName };
    return customAxios.put(URL, params);
  },

  deleteAlbum: (albumId: number) => {
    const URL = `/api/albums/${albumId}`;
    return customAxios.delete(URL);
  },

  updateAlbumOrder: (groupId: number, albumOrder: string) => {
    const URL = `/api/groups/${groupId}/albumorder`;
    const params = { albumOrder };
    return customAxios.put(URL, params);
  },

  postShiftAlbum: (postId: number, albumId: number) => {
    const URL = `/api/posts/${postId}/shift`;
    const params = { albumId };
    return customAxios.put(URL, params);
  },
};

export default albumApi;
