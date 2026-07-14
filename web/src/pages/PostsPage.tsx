import PostList from "../components/PostList";
import type { UsePostsReturn } from "../hooks/usePosts";

type PostsPageProps = {
  postsState: UsePostsReturn;
};

const PostsPage = ({ postsState }: PostsPageProps) => {
  return (
    <PostList
      postListState={postsState.postListState}
      selectedPostId={postsState.selectedPost?.id ?? null}
      onRefresh={() => void postsState.loadPosts()}
    />
  );
};

export default PostsPage;