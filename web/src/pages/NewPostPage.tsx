import {useState} from "react";
import {useActionData, useNavigation,} from "react-router";

import PostCreateForm from "../components/PostCreateForm";
import {createPostAction} from "../router/createPostAction";
import type {CreatePostRequest} from "../types/posts";

const NewPostPage = () => {
  const [form, setForm] = useState<CreatePostRequest>({
    title: "",
    content: "",
  });

  const actionData = useActionData<typeof createPostAction>();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <PostCreateForm
      form={form}
      errors={actionData?.errors ?? {}}
      message={actionData?.message ?? null}
      isSubmitting={isSubmitting}
      onChangeForm={setForm}
    />
  );
};

export default NewPostPage;