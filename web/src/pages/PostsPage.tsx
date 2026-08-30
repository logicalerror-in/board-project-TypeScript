import {useOutletContext} from "react-router";
import type {UsePostsReturn} from "../hooks/usePosts.ts";

import PostList from "../components/PostList.tsx";

const PostsPage = () => {
  const postsState = useOutletContext<UsePostsReturn>();

  return (
    <PostList
      postListState={postsState.postListState}
      selectedPostId={
        postsState.selectedPost?.id ?? null
      }
      onRefresh={() => void postsState.loadPosts()}
    />
  );
};

export default PostsPage;