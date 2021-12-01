import { customAxios, multiFormDataHeader } from "@src/lib/customAxios";

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
    const URL = `/api/posts`;
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

    return customAxios.post(URL, formData, multiFormDataHeader);
  },

  getPost: (postId: number) => {
    const URL = `/api/posts/${postId}`;
    return customAxios.get(URL);
  },

  deletePost: (postId: number) => {
    const URL = `/api/posts/${postId}`;
    return customAxios.delete(URL);
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
    const URL = `/api/posts/${postId}`;
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

    return customAxios.put(URL, formData, multiFormDataHeader);
  },

  getPostsByHashtag: async (hashtagId: number) => {
    const URL = `/api/posts/search?hashtagId=${hashtagId}`;
    const result = await customAxios.get(URL);
    return result;
  },
};

export default groupApi;
