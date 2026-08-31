import type {LoaderFunctionArgs} from "react-router";
import {parsePostId} from "./parsePostId.ts";
import {getPost} from "../api/postsApi.ts";

export const postLoader = async ({params}: LoaderFunctionArgs) => {
  const postId = parsePostId(params.postId);

  if (postId === null) {
    throw new Response(
      '게시글 ID는 양의 정수여야 합니다',
      {
        status: 400,
        statusText: 'Bad Request'
      }
    );
  }

  return getPost(postId);
};