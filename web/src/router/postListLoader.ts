import {getPosts} from "../api/postsApi.ts";

export const postListLoader = async () => {
  return getPosts();
};