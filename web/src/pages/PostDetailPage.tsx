import { useEffect } from "react";
import { Link, useParams } from "react-router";

import PostDetail from "../components/PostDetail";
import type { UsePostsReturn } from "../hooks/usePosts";

type PostDetailPageProps = {
  postsState: UsePostsReturn;
};

const parsePostId = (postIdParam: string | undefined) => {
  if (postIdParam === undefined) {
    return null;
  }

  const postId = Number(postIdParam);

  if (!Number.isInteger(postId) || postId <= 0) {
    return null;
  }

  return postId;
};

const PostDetailPage = ({ postsState }: PostDetailPageProps) => {
  const { postId: postIdParam } = useParams();
  const postId = parsePostId(postIdParam);
  const { selectedPost, isLoadingDetail, fetchPostDetail } = postsState;

  useEffect(() => {
    if (postId === null) {
      return;
    }

    void fetchPostDetail(postId);
  }, [postId, fetchPostDetail]);

  if (postId === null) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-bold">잘못된 게시글 주소입니다.</h2>
        <p className="mt-2 text-sm text-slate-600">
          게시글 ID는 양의 정수여야 합니다.
        </p>
        <Link
          to="/posts"
          className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          게시글 목록으로 이동
        </Link>
      </div>
    );
  }

  return (
    <PostDetail
      selectedPost={selectedPost}
      isLoadingDetail={isLoadingDetail}
    />
  );
};

export default PostDetailPage;