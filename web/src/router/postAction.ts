import {hasPostFormErrors, type PostFormErrors, validateUpdatePostForm} from "../validation/postsValidation.ts";
import {type ActionFunctionArgs, redirect} from "react-router";
import {parsePostId} from "./parsePostId.ts";
import {deletePost, updatePost} from "../api/postsApi.ts";
import type {UpdatePostRequest} from "../types/posts.ts";

type PostActionIntent =
  | 'update'
  | 'delete';

export type PostActionData = {
  errors: PostFormErrors;
  message: string | null;
};

const isPostActionIntent = (value: FormDataEntryValue | null): value is PostActionIntent => {
  return (
    value === 'update' || value === 'delete'
  );
};

export const postAction = async ({params, request}: ActionFunctionArgs): Promise<PostActionData | Response> => {
  const postId = parsePostId(params.postId);
  if (postId === null) {
    throw new Response(
      '게시글 ID는 양의 정수여야 합니다.',
      {
        status: 400,
        statusText: 'Bad Request'
      }
    );
  }

  const formData = await request.formData();
  const intentValue = formData.get('intent');

  if (!isPostActionIntent(intentValue)) {
    throw new Response(
      '지원하지 않는 게시글 작업입니다.',
      {
        status: 400,
        statusText: "Bad Request",
      }
    );
  }

  if (intentValue === 'delete') {
    try {
      await deletePost(postId);
      return redirect('/posts');
    } catch (error) {
      return {
        errors: {},
        message:
          error instanceof Error
            ? error.message
            : '게시글을 삭제하지 못했습니다.',

      }
    }
  }

  const titleValue = formData.get('title');
  const contentValue = formData.get('content');

  const form: UpdatePostRequest = {
    title:
      typeof titleValue === 'string'
        ? titleValue
        : '',
    content:
      typeof contentValue === 'string'
        ? contentValue
        : '',
  };

  const validationErrors = validateUpdatePostForm(form);
  if (hasPostFormErrors(validationErrors)) {
    return {
      errors: validationErrors,
      message: null,
    };
  }

  const requestBody: UpdatePostRequest = {
    title: form.title?.trim(),
    content: form.content?.trim(),
  };

  try {
    const updatedPost = await updatePost(postId, requestBody);

    return redirect(`/posts/${updatedPost.id}`);
  } catch (error) {
    return {
      errors: {},
      message:
        error instanceof Error
          ? error.message
          : '게시글을 수정하지 못했습니다.',
    };
  }
};