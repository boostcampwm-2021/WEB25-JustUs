import axios from "axios";

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

interface FileObject {
  imageUrl: File;
  imageId: string;
}
interface IPost {
  postTitle: string;
  postContent: string;
  postDate: string;
  postLocation: string;
  postLatitude: string;
  postLongitude: string;
  groupId: string;
  postImage: FileObject[];
}
interface IUpdatePost {
  postId: number;
  postTitle: string;
  postContent: string;
  postDate: string;
  postLocation: string;
  postLatitude: string;
  postLongitude: string;
  addImages: FileObject[];
  deleteImagesId: string[];
  groupId: string;
}

const groupApi = {
  uploadPost: (newPost: IPost) => {
    const { postTitle, postContent, postDate, postLocation, postLatitude, postLongitude, groupId, postImage } = newPost;
    const formData = new FormData();
    formData.append("postTitle", postTitle);
    formData.append("postContent", postContent);
    formData.append("postDate", postDate);
    formData.append("postLocation", postLocation);
    formData.append("postLatitude", postLatitude);
    formData.append("postLongitude", postLongitude);
    formData.append("groupId", groupId);
    postImage.forEach((image) => formData.append("postImages", image.imageUrl));

    return axios({
      method: "post",
      url: `${SERVER_URL}/api/posts`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
  },

  getPost: (postId: number) => {
    return axios({
      method: "get",
      url: `${SERVER_URL}/api/posts/${postId}`,
      withCredentials: true,
    });
  },

  deletePost: (postId: number) => {
    return axios({
      method: "delete",
      url: `${SERVER_URL}/api/posts/${postId}`,
      withCredentials: true,
    });
  },

  updatePost: (newPost: IUpdatePost) => {
    const {
      postId,
      postTitle,
      postContent,
      postDate,
      postLocation,
      postLatitude,
      postLongitude,
      addImages,
      deleteImagesId,
      groupId,
    } = newPost;

    const formData = new FormData();
    formData.append("postTitle", postTitle);
    formData.append("postContent", postContent);
    formData.append("postDate", postDate);
    formData.append("postLocation", postLocation);
    formData.append("postLatitude", postLatitude);
    formData.append("postLongitude", postLongitude);
    formData.append("groupId", groupId);
    addImages.forEach((image) => formData.append("addImages", image.imageUrl));
    deleteImagesId.forEach((id) => formData.append("deleteImagesId", id));

    return axios({
      method: "put",
      url: `${SERVER_URL}/api/posts/${postId}`,
      data: formData,
      headers: { "Content-Type": "multipart/form-data" },
      withCredentials: true,
    });
  },

  getPostsByHashtag: async (hashtagId: number) => {
    const result = await axios.get(`${SERVER_URL}/api/posts/search?hashtagId=${hashtagId}`, { withCredentials: true });
    return result;
  },
};

export default groupApi;
