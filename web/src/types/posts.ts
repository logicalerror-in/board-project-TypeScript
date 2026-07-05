export type PostListItemResponse = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type PostDetailResponse = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatePostRequest = {
  title: string;
  content: string;
}

export type UpdatePostRequest = {
  title?: string;
  content?: string;
}