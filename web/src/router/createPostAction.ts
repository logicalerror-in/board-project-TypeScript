import {hasPostFormErrors, type PostFormErrors, validateCreatePostForm} from "../validation/postsValidation.ts";
import {type ActionFunctionArgs, redirect} from "react-router";
import type {CreatePostRequest} from "../types/posts.ts";
import {createPost} from "../api/postsApi.ts";

export type CreatePostActionData = {
  errors: PostFormErrors;
  message: string | null;
};

export const createPostAction = async ({request}: ActionFunctionArgs): Promise<CreatePostActionData | Response> => {
  const formData = await request.formData();

  const titleValue = formData.get('title');
  const contentValue = formData.get('content');

  const form: CreatePostRequest = {
    title:
      typeof titleValue === 'string'
        ? titleValue
        : '',
    content:
      typeof contentValue === 'string'
        ? contentValue
        : '',
  };

  const validationErrors = validateCreatePostForm(form);
  if (hasPostFormErrors(validationErrors)) {
    return {
      errors: validationErrors,
      message: null,
    };
  }

  const requestBody: CreatePostRequest = {
    title: form.title.trim(),
    content: form.content.trim(),
  };

  try {
    const createdPost = await createPost(requestBody);

    return redirect(`/posts/${createdPost.id}`);
  } catch (error) {
    return {
      errors: {},
      message:
        error instanceof Error
          ? error.message
          : "게시글을 생성하지 못했습니다.",
    };
  }

};