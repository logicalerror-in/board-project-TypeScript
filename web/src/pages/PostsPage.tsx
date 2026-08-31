import {useLoaderData, useOutletContext, useRevalidator} from "react-router";
import type {postListLoader} from "../router/postListLoader.ts";
import type {UsePostsReturn} from "../hooks/usePosts.ts";
import PostList from "../components/PostList.tsx";

const PostsPage = () => {
  const posts = useLoaderData<typeof postListLoader>();
  const postsState = useOutletContext<UsePostsReturn>();

  const revalidator = useRevalidator();
  const handleRefresh = () => {
    revalidator.revalidate();
  };

  return (
    <PostList
      posts={posts}
      selectedPostId={postsState.selectedPost?.id ?? null}
      isRefreshing={revalidator.state === 'loading'}
      onRefresh={handleRefresh}
    />
  );
};

export default PostsPage;