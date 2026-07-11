import PostList from "../components/PostList";
import type { UsePostsReturn } from "../hooks/usePosts";

type PostsPageProps = {
  postsState: UsePostsReturn;
};

const PostsPage = ({ postsState }: PostsPageProps) => {
  return (
    <PostList
      posts={postsState.posts}
      selectedPostId={postsState.selectedPost?.id ?? null}
      isLoadingPosts={postsState.isLoadingPosts}
      onRefresh={() => void postsState.loadPosts()}
    />
  );
};

export default PostsPage;