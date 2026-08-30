import {useNavigate, useOutletContext} from "react-router";
import type {UsePostsReturn} from "../hooks/usePosts.ts";
import PostCreateForm from "../components/PostCreateForm.tsx";

const NewPostPage = () => {
  const postState = useOutletContext<UsePostsReturn>();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const createdPost = await postState.submitCreatePost();
    if (createdPost !== null) {
      navigate(`/posts/${createdPost.id}`);
    }
  }

  return (
    <PostCreateForm
      form={postState.createForm}
      errors={postState.createFormErrors}
      isSubmittingCreate={postState.isSubmittingCreate}
      onChangeForm={postState.changeCreateForm}
      onSubmit={() => void handleSubmit()}
    />
  );
};

export default NewPostPage;