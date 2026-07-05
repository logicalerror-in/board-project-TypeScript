import type {CreatePostRequest, PostDetailResponse, PostListItemResponse, UpdatePostRequest} from "../types/posts.ts";

const readJson =
  async <T>(response: Response): Promise<T> => (await response.json()) as T;

const assertOk =
  async (response: Response, message: string) => {
    if (!response.ok) {
      throw new Error(`${message}: ${response.status}`);
    }
  };

export const getPosts =
  async (): Promise<PostListItemResponse[]> => {
    const response = await fetch('/api/posts');

    await assertOk(response, '게시글 목록 조회 실패');

    return readJson<PostListItemResponse[]>(response);
  };

export const getPost =
  async (postId: number): Promise<PostDetailResponse> => {
    const response = await fetch(`/api/posts/${postId}`);

    await assertOk(response, '게시글 상세 조회 실패');

    return readJson<PostDetailResponse>(response);
  };

export const createPost =
  async (request: CreatePostRequest): Promise<PostDetailResponse> => {
    const response = await fetch("/api/posts", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });

    await assertOk(response, '게시글 생성 실패');

    return readJson<PostDetailResponse>(response);
  };

export const update =
  async (postId: number, request: UpdatePostRequest): Promise<PostDetailResponse> => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    await assertOk(response, '게시글 수정 실패');

    return readJson<PostDetailResponse>(response);
  };

export const deletePost =
  async (postId: number) => {
    const response = await fetch(`/api/posts/${postId}`, {
      method: 'DELETE',
    });

    await assertOk(response, '게시글 삭제 실패');
  };
