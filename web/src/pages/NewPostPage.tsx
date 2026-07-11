import { useNavigate } from "react-router";

import PostCreateForm from "../components/PostCreateForm";
import type { UsePostsReturn } from "../hooks/usePosts";

type NewPostPageProps = {
  postsState: UsePostsReturn;
};

const NewPostPage = ({ postsState }: NewPostPageProps) => {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const createdPost = await postsState.submitCreatePost();

    if (createdPost !== null) {
      navigate(`/posts/${createdPost.id}`);
    }
  };

  return (
    <PostCreateForm
      form={postsState.createForm}
      isSubmittingCreate={postsState.isSubmittingCreate}
      onChangeForm={postsState.setCreateForm}
      onSubmit={() => void handleSubmit()}
    />
  );
};

export default NewPostPage;