import {useCallback, useState} from "react";
import type {CreatePostRequest, UpdatePostRequest} from "../types/posts.ts";
import {
  hasPostFormErrors,
  type PostFormErrors,
  validateCreatePostForm,
  validateUpdatePostForm
} from "../validation/postsValidation.ts";
import {createPost, deletePost, updatePost} from "../api/postsApi.ts";

export const usePosts = () => {
  const [createForm, setCreateForm] = useState<CreatePostRequest>({title: '', content: ''});
  const [createFormErrors, setCreateFormErrors] = useState<PostFormErrors>({});
  const [editFormErrors, setEditFormErrors] = useState<PostFormErrors>({});
  const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState("");

  const getErrorMessage = useCallback(
    (error: unknown, fallbackMessage: string) => {
      return error instanceof Error
        ? error.message
        : fallbackMessage;
    }, []);

  const changeCreateForm = useCallback(
    (form: CreatePostRequest) => {
      setCreateForm(form);
      setCreateFormErrors({});
    }, []);

  const submitCreatePost = async () => {
    const validationErrors = validateCreatePostForm(createForm);
    setCreateFormErrors(validationErrors);
    if (hasPostFormErrors(validationErrors)) {
      return null;
    }

    const request: CreatePostRequest = {
      title: createForm.title.trim(),
      content: createForm.content.trim(),
    };

    setIsSubmittingCreate(true);
    setMessage('');

    try {
      const createdPost = await createPost(request);
      setCreateForm({
        title: "",
        content: "",
      });

      setCreateFormErrors({});
      setMessage("게시글이 생성되었습니다.");

      return createdPost;
    } catch (error) {
      setMessage(
        getErrorMessage(error, '게시글을 생성하지 못했습니다.')
      );
      return null;
    } finally {
      setIsSubmittingCreate(false);
    }
  };

  const submitUpdatePost = async (postId: number, editForm: UpdatePostRequest) => {
    const validationErrors = validateUpdatePostForm(editForm);

    setEditFormErrors(validationErrors);

    if (hasPostFormErrors(validationErrors)) {
      return null;
    }

    const request: UpdatePostRequest = {
      title: editForm.title?.trim(),
      content: editForm.content?.trim(),
    };

    setIsSubmittingEdit(true);
    setMessage("");

    try {
      const updatedPost = await updatePost(
        postId,
        request,
      );

      setEditFormErrors({});
      setMessage("게시글이 수정되었습니다.");

      return updatedPost;
    } catch (error) {
      setMessage(
        getErrorMessage(
          error,
          "게시글을 수정하지 못했습니다.",
        ),
      );

      return null;
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const submitDeletePost = async (postId: number) => {
    const shouldDelete = window.confirm(
      "정말 이 게시글을 삭제할까요?",
    );

    if (!shouldDelete) {
      return false;
    }

    setIsDeleting(true);
    setMessage("");

    try {
      await deletePost(postId);

      setMessage("게시글이 삭제되었습니다.");

      return true;
    } catch (error) {
      setMessage(
        getErrorMessage(
          error,
          "게시글을 삭제하지 못했습니다.",
        ),
      );

      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    createForm,
    createFormErrors,

    editFormErrors,

    isSubmittingCreate,
    isSubmittingEdit,
    isDeleting,

    message,

    changeCreateForm,

    submitCreatePost,
    submitUpdatePost,
    submitDeletePost,
  };
};

export type UsePostsReturn = ReturnType<typeof usePosts>;