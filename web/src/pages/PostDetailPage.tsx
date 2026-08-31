import {useLoaderData} from "react-router";
import type {postLoader} from "../router/postLoader.ts";
import PostDetail from "../components/PostDetail.tsx";

const PostDetailPage = () => {
  const post = useLoaderData<typeof postLoader>();

  return <PostDetail post={post}/>;
};

export default PostDetailPage;