import {useLoaderData, useRevalidator} from "react-router";
import type {postListLoader} from "../router/postListLoader.ts";
import PostList from "../components/PostList.tsx";

const PostsPage = () => {
  const posts = useLoaderData<typeof postListLoader>();
  const revalidator = useRevalidator();

  const handleRefresh = () => {
    revalidator.revalidate();
  };

  return (
    <PostList
      posts={posts}
      isRefreshing={revalidator.state === 'loading'}
      onRefresh={handleRefresh}
    />
  );
};

export default PostsPage;