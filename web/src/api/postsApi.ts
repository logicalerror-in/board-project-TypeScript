import {getApiErrorMessage} from "../guards/apiErrorGuards";
import {
  isPostDetailResponse,
  isPostListItemResponseArray,
} from "../guards/postsGuards";
import type {
  CreatePostRequest,
  PostDetailResponse,
  PostListItemResponse,
  UpdatePostRequest,
} from "../types/posts";

type Guard<T> = (value: unknown) => value is T;

const readJson = async (response: Response): Promise<unknown> => {
  return response.json();
};

const readErrorMessage = async (response: Response, fallbackMessage: string,): Promise<string> => {
  try {
    const data = await readJson(response);
    const apiErrorMessage = getApiErrorMessage(data);

    if (apiErrorMessage !== null) {
      return apiErrorMessage;
    }

    return `${fallbackMessage}: ${response.status}`;
  } catch {
    return `${fallbackMessage}: ${response.status}`;
  }
};

const assertOk = async (response: Response, message: string,): Promise<void> => {
  if (!response.ok) {
    const errorMessage = await readErrorMessage(response, message);

    throw new Error(errorMessage);
  }
};

const readJsonWithGuard = async <T>(response: Response, guard: Guard<T>, invalidMessage: string,): Promise<T> => {
  const data = await readJson(response);

  if (!guard(data)) {
    throw new Error(invalidMessage);
  }

  return data;
};

export const getPosts = async (): Promise<PostListItemResponse[]> => {
  const response = await fetch("/api/posts");

  await assertOk(response, "게시글 목록 조회 실패");

  return readJsonWithGuard(
    response,
    isPostListItemResponseArray,
    "게시글 목록 응답 형식이 올바르지 않습니다.",
  );
};

export const getPost = async (postId: number,): Promise<PostDetailResponse> => {
  const response = await fetch(`/api/posts/${postId}`);

  await assertOk(response, "게시글 상세 조회 실패");

  return readJsonWithGuard(
    response,
    isPostDetailResponse,
    "게시글 상세 응답 형식이 올바르지 않습니다.",
  );
};

export const createPost = async (request: CreatePostRequest,): Promise<PostDetailResponse> => {
  const response = await fetch("/api/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  await assertOk(response, "게시글 생성 실패");

  return readJsonWithGuard(
    response,
    isPostDetailResponse,
    "게시글 생성 응답 형식이 올바르지 않습니다.",
  );
};

export const updatePost = async (postId: number, request: UpdatePostRequest,): Promise<PostDetailResponse> => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(request),
  });

  await assertOk(response, "게시글 수정 실패");

  return readJsonWithGuard(
    response,
    isPostDetailResponse,
    "게시글 수정 응답 형식이 올바르지 않습니다.",
  );
};

export const deletePost = async (postId: number): Promise<void> => {
  const response = await fetch(`/api/posts/${postId}`, {
    method: "DELETE",
  });

  await assertOk(response, "게시글 삭제 실패");
};