import { Link } from "react-router";

import type { PostDetailResponse } from "../types/posts";

type PostDetailProps = {
  post: PostDetailResponse;
};

const PostDetail = ({
                      post,
                    }: PostDetailProps) => {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-bold">
        게시글 상세
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        API: GET /api/posts/:postId
      </p>

      <article className="mt-5 rounded-xl border border-slate-200 p-5">
        <p className="text-sm text-slate-500">
          #{post.id}
        </p>

        <h3 className="mt-2 text-2xl font-bold">
          {post.title}
        </h3>

        <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-700">
          {post.content}
        </p>

        <dl className="mt-6 grid gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 sm:grid-cols-2">
          <div>
            <dt className="font-medium text-slate-700">
              생성일
            </dt>
            <dd>{post.createdAt}</dd>
          </div>

          <div>
            <dt className="font-medium text-slate-700">
              수정일
            </dt>
            <dd>{post.updatedAt}</dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={`/posts/${post.id}/edit`}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            수정 / 삭제
          </Link>

          <Link
            to="/posts"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            목록으로
          </Link>
        </div>
      </article>
    </section>
  );
};

export default PostDetail;