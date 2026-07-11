import { useCallback, useEffect, useState } from "react";

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

export const usePosts = () => {
  const [posts, setPosts] = useState<PostListItemResponse[]>([]);
  const [selectedPost, setSelectedPost] =
    useState<PostDetailResponse | null>(null);

  const [createForm, setCreateForm] = useState<CreatePostRequest>({
    title: "",
    content: "",
  });

  const [editForm, setEditForm] = useState<UpdatePostRequest>({
    title: "",
    content: "",
  });

  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [message, setMessage] = useState("");

  const clearEditForm = useCallback(() => {
    setEditForm({
      title: "",
      content: "",
    });
  }, []);

  const syncEditFormWithPost = useCallback((post: PostDetailResponse) => {
    setEditForm({
      title: post.title,
      content: post.content,
    });
  }, []);

  const loadPosts = async () => {
    setIsLoadingPosts(true);
    setMessage("");

    try {
      const data = await getPosts();

      setPosts(data);

      const refreshedSelectedPost =
        selectedPost === null
          ? null
          : data.find((post) => post.id === selectedPost.id) ?? null;

      setSelectedPost(refreshedSelectedPost);

      if (refreshedSelectedPost === null) {
        clearEditForm();
      } else {
        syncEditFormWithPost(refreshedSelectedPost);
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "게시글 목록을 불러오지 못했습니다.",
      );
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const fetchPostDetail = useCallback(
    async (postId: number) => {
      setIsLoadingDetail(true);
      setMessage("");

      try {
        const data = await getPost(postId);

        setSelectedPost(data);
        syncEditFormWithPost(data);
      } catch (error) {
        setSelectedPost(null);
        clearEditForm();
        setMessage(
          error instanceof Error
            ? error.message
            : "게시글 상세를 불러오지 못했습니다.",
        );
      } finally {
        setIsLoadingDetail(false);
      }
    },
    [clearEditForm, syncEditFormWithPost],
  );

  const submitCreatePost = async () => {
    const title = createForm.title.trim();
    const content = createForm.content.trim();

    if (title.length === 0 || content.length === 0) {
      setMessage("제목과 내용을 모두 입력해주세요.");
      return null;
    }

    setIsSubmittingCreate(true);
    setMessage("");

    try {
      const createdPost = await createPost({
        title,
        content,
      });

      setCreateForm({
        title: "",
        content: "",
      });
      syncEditFormWithPost(createdPost);
      setSelectedPost(createdPost);
      setPosts((currentPosts) => [createdPost, ...currentPosts]);
      setMessage("게시글이 생성되었습니다.");

      return createdPost;
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "게시글을 생성하지 못했습니다.",
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

    const title = editForm.title?.trim() ?? "";
    const content = editForm.content?.trim() ?? "";

    if (title.length === 0 && content.length === 0) {
      setMessage("수정할 제목 또는 내용을 입력해주세요.");
      return null;
    }

    setIsSubmittingEdit(true);
    setMessage("");

    try {
      const updatedPost = await updatePost(selectedPost.id, {
        title,
        content,
      });

      setSelectedPost(updatedPost);
      syncEditFormWithPost(updatedPost);

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post,
        ),
      );

      setMessage("게시글이 수정되었습니다.");

      return updatedPost;
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "게시글을 수정하지 못했습니다.",
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

    const shouldDelete = window.confirm("정말 이 게시글을 삭제할까요?");

    if (!shouldDelete) {
      return false;
    }

    setIsDeleting(true);
    setMessage("");

    try {
      await deletePost(selectedPost.id);

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== selectedPost.id),
      );
      setSelectedPost(null);
      clearEditForm();
      setMessage("게시글이 삭제되었습니다.");

      return true;
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "게시글을 삭제하지 못했습니다.",
      );

      return false;
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    let ignore = false;

    const loadInitialPosts = async () => {
      try {
        const data = await getPosts();

        if (!ignore) {
          setPosts(data);
        }
      } catch (error) {
        if (!ignore) {
          setMessage(
            error instanceof Error
              ? error.message
              : "게시글 목록을 불러오지 못했습니다.",
          );
        }
      } finally {
        if (!ignore) {
          setIsLoadingPosts(false);
        }
      }
    };

    void loadInitialPosts();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    posts,
    selectedPost,
    createForm,
    editForm,
    isLoadingPosts,
    isLoadingDetail,
    isSubmittingCreate,
    isSubmittingEdit,
    isDeleting,
    message,
    setCreateForm,
    setEditForm,
    loadPosts,
    fetchPostDetail,
    submitCreatePost,
    submitUpdatePost,
    submitDeletePost,
  };
};

export type UsePostsReturn = ReturnType<typeof usePosts>;