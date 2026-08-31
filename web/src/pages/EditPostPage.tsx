import {useLoaderData, useNavigate, useOutletContext} from "react-router";
import {useState} from "react";

import PostEditForm from "../components/PostEditForm.tsx";
import type {postLoader} from "../router/postLoader.ts";
import type {PostDetailResponse, UpdatePostRequest} from "../types/posts.ts";
import type { UsePostsReturn } from "../hooks/usePosts";

type EditPostContentProps = {
  post: PostDetailResponse;
};

const EditPostContent = ({post}: EditPostContentProps) => {
  const navigate = useNavigate();

  const [editForm, setEditForm] = useState<UpdatePostRequest>(
    () => ({
      title: post.title,
      content: post.content,
    })
  );

  const postsState = useOutletContext<UsePostsReturn>();
  const {
    editFormErrors,
    isSubmittingEdit,
    isDeleting,
    submitUpdatePost,
    submitDeletePost,
  } = postsState;

  const handleSubmitUpdate = async () => {
    const updatedPost = await submitUpdatePost(post.id, editForm);
    if (updatedPost !== null) {
      navigate(`/posts/${updatedPost.id}`);
    }
  };

  const handleSubmitDelete = async () => {
    const isDeleted = await submitDeletePost(post.id);
    if (isDeleted) {
      navigate('/posts');
    }
  };

  return (
    <PostEditForm
      form={editForm}
      errors={editFormErrors}
      isSubmittingEdit={isSubmittingEdit}
      isDeleting={isDeleting}
      onChangeForm={setEditForm}
      onSubmitUpdate={() => void handleSubmitUpdate()}
      onSubmitDelete={() => void handleSubmitDelete()}
    />
  );
};

const EditPostPage = () => {
  const post = useLoaderData<typeof postLoader>();

  return (
    <EditPostContent
      key={post.id}
      post={post}
    />
  );
}

export default EditPostPage;