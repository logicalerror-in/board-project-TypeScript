import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";

import PostEditForm from "../components/PostEditForm";
import type { UsePostsReturn } from "../hooks/usePosts";

type EditPostPageProps = {
  postsState: UsePostsReturn;
};

const parsePostId = (
  postIdParam: string | undefined,
) => {
  if (postIdParam === undefined) {
    return null;
  }

  const postId = Number(postIdParam);

  if (!Number.isInteger(postId) || postId <= 0) {
    return null;
  }

  return postId;
};

const EditPostPage = ({
                        postsState,
                      }: EditPostPageProps) => {
  const { postId: postIdParam } = useParams();
  const navigate = useNavigate();

  const postId = parsePostId(postIdParam);

  const {
    postDetailState,
    editForm,
    editFormErrors,
    isSubmittingEdit,
    isDeleting,
    changeEditForm,
    fetchPostDetail,
    submitUpdatePost,
    submitDeletePost,
  } = postsState;

  useEffect(() => {
    if (postId === null) {
      return;
    }

    void fetchPostDetail(postId);
  }, [postId, fetchPostDetail]);

  const handleSubmitUpdate = async () => {
    const updatedPost = await submitUpdatePost();

    if (updatedPost !== null) {
      navigate(`/posts/${updatedPost.id}`);
    }
  };

  const handleSubmitDelete = async () => {
    const isDeleted = await submitDeletePost();

    if (isDeleted) {
      navigate("/posts");
    }
  };

  if (postId === null) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-bold">
          잘못된 게시글 주소입니다.
        </h2>

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

  if (postDetailState.status === "loading") {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          게시글 상세를 불러오는 중입니다.
        </p>
      </div>
    );
  }

  if (postDetailState.status === "error") {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-xl font-bold">
          수정할 게시글이 없습니다.
        </h2>

        <p className="mt-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {postDetailState.message}
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

  if (postDetailState.status !== "success") {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <p className="text-sm text-slate-600">
          게시글을 불러오는 중입니다.
        </p>
      </div>
    );
  }

  return (
    <PostEditForm
      form={editForm}
      errors={editFormErrors}
      isSubmittingEdit={isSubmittingEdit}
      isDeleting={isDeleting}
      onChangeForm={changeEditForm}
      onSubmitUpdate={() =>
        void handleSubmitUpdate()
      }
      onSubmitDelete={() =>
        void handleSubmitDelete()
      }
    />
  );
};

export default EditPostPage;