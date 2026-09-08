import type {PostDetailResponse, UpdatePostRequest} from "../types/posts.ts";
import {useState} from "react";
import {useActionData, useLoaderData, useNavigation} from "react-router";
import type {postAction} from "../router/postAction.ts";
import PostEditForm from "../components/PostEditForm.tsx";
import type {postLoader} from "../router/postLoader.ts";

type EditPostPageContentProps = {
  post: PostDetailResponse;
};

const EditPostContent = ({post,}: EditPostPageContentProps) => {
  const navigation = useNavigation();
  const actionData = useActionData<typeof postAction>();

  const [editForm, setEditForm] = useState<UpdatePostRequest>(
    () => ({
      title: post.title,
      content: post.content
    })
  );

  const submittingIntent = navigation.formData?.get('intent');
  const isSubmittingEdit =
    (navigation.state === 'submitting') && (submittingIntent === 'update');
  const isDeleting =
    (navigation.state === 'submitting') && (submittingIntent === 'delete');

  return (
    <PostEditForm
      form={editForm}
      errors={actionData?.errors ?? {}}
      message={actionData?.message ?? null}
      isSubmittingEdit={isSubmittingEdit}
      isDeleting={isDeleting}
      onChangeForm={setEditForm}
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
};

export default EditPostPage;