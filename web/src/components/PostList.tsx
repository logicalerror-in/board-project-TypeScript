import {Link} from "react-router";

import type {PostListItemResponse} from "../types/posts";
import type {ApiState} from "../api/apiState.ts";

type PostListProps = {
  postListState: ApiState<PostListItemResponse[]>;
  selectedPostId: number | null;
  onRefresh: () => void;
};

const PostList = ({
                    postListState,
                    selectedPostId,
                    onRefresh,
                  }: PostListProps) => {
  const isLoading = postListState.status === "loading";
  const posts =
    postListState.status === "success" ? postListState.data : [];

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold">게시글 목록</h2>
          <p className="mt-1 text-sm text-slate-500">API: GET /api/posts</p>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm font-medium hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={isLoading}
        >
          새로고침
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {postListState.status === "idle" && (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            아직 게시글 목록을 불러오지 않았습니다.
          </p>
        )}

        {postListState.status === "loading" && (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            게시글 목록을 불러오는 중입니다.
          </p>
        )}

        {postListState.status === "error" && (
          <p className="rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {postListState.message}
          </p>
        )}

        {postListState.status === "success" && posts.length === 0 && (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            아직 게시글이 없습니다.
          </p>
        )}

        {postListState.status === "success" &&
          posts.map((post) => (
            <Link
              key={post.id}
              to={`/posts/${post.id}`}
              className={`block w-full rounded-xl border p-4 text-left transition hover:bg-slate-50 ${
                selectedPostId === post.id
                  ? "border-blue-300 bg-blue-50"
                  : "border-slate-200 bg-white"
              }`}
            >
              <p className="text-sm text-slate-500">#{post.id}</p>
              <h3 className="mt-1 font-semibold">{post.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                {post.content}
              </p>
            </Link>
          ))}
      </div>
    </section>
  );
};

export default PostList;