import {useCallback, useEffect, useState} from "react";

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  updatePost,
} from "../api/postsApi";
import type {
  CreatePostRequest,
  PostDetailResponse,
  PostListItemResponse,
  UpdatePostRequest,
} from "../types/posts";
import type {ApiState} from "../api/apiState.ts";
import {
  hasPostFormErrors,
  type PostFormErrors,
  validateCreatePostForm,
  validateUpdatePostForm
} from "../validation/postsValidation.ts";

export const usePosts = () => {
  const [postListState, setPostListState] = useState<
    ApiState<PostListItemResponse[]>
  >({
    status: "loading",
  });

  const [postDetailState, setPostDetailState] = useState<
    ApiState<PostDetailResponse>
  >({
    status: "idle",
  });

  const [createForm, setCreateForm] = useState<CreatePostRequest>({
    title: "",
    content: "",
  });

  const [editForm, setEditForm] = useState<UpdatePostRequest>({
    title: "",
    content: "",
  });

  const [createFormErrors, setCreateFormErrors] =
    useState<PostFormErrors>({});

  const [editFormErrors, setEditFormErrors] =
    useState<PostFormErrors>({});

  const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [message, setMessage] = useState("");

  const posts =
    postListState.status === "success" ? postListState.data : [];

  const selectedPost =
    postDetailState.status === "success"
      ? postDetailState.data
      : null;

  const getErrorMessage = useCallback(
    (error: unknown, fallbackMessage: string) => {
      return error instanceof Error
        ? error.message
        : fallbackMessage;
    },
    [],
  );

  const clearEditForm = useCallback(() => {
    setEditForm({
      title: "",
      content: "",
    });

    setEditFormErrors({});
  }, []);

  const syncEditFormWithPost = useCallback(
    (post: PostDetailResponse) => {
      setEditForm({
        title: post.title,
        content: post.content,
      });

      setEditFormErrors({});
    },
    [],
  );

  const changeCreateForm = useCallback(
    (form: CreatePostRequest) => {
      setCreateForm(form);
      setCreateFormErrors({});
    },
    [],
  );

  const changeEditForm = useCallback(
    (form: UpdatePostRequest) => {
      setEditForm(form);
      setEditFormErrors({});
    },
    [],
  );

  const loadPosts = async () => {
    setPostListState({
      status: "loading",
    });
    setMessage("");

    try {
      const data = await getPosts();

      setPostListState({
        status: "success",
        data,
      });

      if (postDetailState.status !== "success") {
        return;
      }

      const refreshedSelectedPost =
        data.find(
          (post) => post.id === postDetailState.data.id,
        ) ?? null;

      if (refreshedSelectedPost === null) {
        setPostDetailState({
          status: "idle",
        });
        clearEditForm();
        return;
      }

      setPostDetailState({
        status: "success",
        data: refreshedSelectedPost,
      });
      syncEditFormWithPost(refreshedSelectedPost);
    } catch (error) {
      const errorMessage = getErrorMessage(
        error,
        "게시글 목록을 불러오지 못했습니다.",
      );

      setPostListState({
        status: "error",
        message: errorMessage,
      });
      setMessage(errorMessage);
    }
  };

  const fetchPostDetail = useCallback(
    async (postId: number) => {
      setPostDetailState({
        status: "loading",
      });
      setMessage("");

      try {
        const data = await getPost(postId);

        setPostDetailState({
          status: "success",
          data,
        });
        syncEditFormWithPost(data);
      } catch (error) {
        const errorMessage = getErrorMessage(
          error,
          "게시글 상세를 불러오지 못했습니다.",
        );

        setPostDetailState({
          status: "error",
          message: errorMessage,
        });
        clearEditForm();
        setMessage(errorMessage);
      }
    },
    [
      clearEditForm,
      getErrorMessage,
      syncEditFormWithPost,
    ],
  );

  const submitCreatePost = async () => {
    const validationErrors =
      validateCreatePostForm(createForm);

    setCreateFormErrors(validationErrors);

    if (hasPostFormErrors(validationErrors)) {
      return null;
    }

    const request: CreatePostRequest = {
      title: createForm.title.trim(),
      content: createForm.content.trim(),
    };

    setIsSubmittingCreate(true);
    setMessage("");

    try {
      const createdPost = await createPost(request);

      setCreateForm({
        title: "",
        content: "",
      });
      setCreateFormErrors({});

      syncEditFormWithPost(createdPost);

      setPostDetailState({
        status: "success",
        data: createdPost,
      });

      setPostListState((currentState) => {
        if (currentState.status !== "success") {
          return {
            status: "success",
            data: [createdPost],
          };
        }

        return {
          status: "success",
          data: [createdPost, ...currentState.data],
        };
      });

      setMessage("게시글이 생성되었습니다.");

      return createdPost;
    } catch (error) {
      setMessage(
        getErrorMessage(
          error,
          "게시글을 생성하지 못했습니다.",
        ),
      );

      return null;
    } finally {
      setIsSubmittingCreate(false);
    }
  };

  const submitUpdatePost = async () => {
    if (selectedPost === null) {
      setMessage("수정할 게시글을 먼저 선택해주세요.");
      return null;
    }

    const validationErrors =
      validateUpdatePostForm(editForm);

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
        selectedPost.id,
        request,
      );

      setPostDetailState({
        status: "success",
        data: updatedPost,
      });

      syncEditFormWithPost(updatedPost);

      setPostListState((currentState) => {
        if (currentState.status !== "success") {
          return currentState;
        }

        return {
          status: "success",
          data: currentState.data.map((post) =>
            post.id === updatedPost.id
              ? updatedPost
              : post,
          ),
        };
      });

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

  const submitDeletePost = async () => {
    if (selectedPost === null) {
      setMessage("삭제할 게시글을 먼저 선택해주세요.");
      return false;
    }

    const shouldDelete = window.confirm(
      "정말 이 게시글을 삭제할까요?",
    );

    if (!shouldDelete) {
      return false;
    }

    const postIdToDelete = selectedPost.id;

    setIsDeleting(true);
    setMessage("");

    try {
      await deletePost(postIdToDelete);

      setPostListState((currentState) => {
        if (currentState.status !== "success") {
          return currentState;
        }

        return {
          status: "success",
          data: currentState.data.filter(
            (post) => post.id !== postIdToDelete,
          ),
        };
      });

      setPostDetailState({
        status: "idle",
      });

      clearEditForm();
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

  useEffect(() => {
    let ignore = false;

    const loadInitialPosts = async () => {
      setPostListState({
        status: "loading",
      });

      try {
        const data = await getPosts();

        if (!ignore) {
          setPostListState({
            status: "success",
            data,
          });
        }
      } catch (error) {
        if (!ignore) {
          const errorMessage = getErrorMessage(
            error,
            "게시글 목록을 불러오지 못했습니다.",
          );

          setPostListState({
            status: "error",
            message: errorMessage,
          });
          setMessage(errorMessage);
        }
      }
    };

    void loadInitialPosts();

    return () => {
      ignore = true;
    };
  }, [getErrorMessage]);

  return {
    postListState,
    postDetailState,

    posts,
    selectedPost,

    createForm,
    editForm,
    createFormErrors,
    editFormErrors,

    isSubmittingCreate,
    isSubmittingEdit,
    isDeleting,

    message,

    changeCreateForm,
    changeEditForm,

    loadPosts,
    fetchPostDetail,
    submitCreatePost,
    submitUpdatePost,
    submitDeletePost,
  };
};

export type UsePostsReturn = ReturnType<typeof usePosts>;