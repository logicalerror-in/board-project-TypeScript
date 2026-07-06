import type { PostDetailResponse } from "../types/posts";

type PostDetailProps = {
  selectedPost: PostDetailResponse | null;
  isLoadingDetail: boolean;
};

const PostDetail = ({ selectedPost, isLoadingDetail }: PostDetailProps) => {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-bold">게시글 상세</h2>
      <p className="mt-1 text-sm text-slate-500">
        API: GET /api/posts/:postId
      </p>

      {isLoadingDetail && (
        <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          게시글 상세를 불러오는 중입니다.
        </p>
      )}

      {!isLoadingDetail && selectedPost === null && (
        <p className="mt-5 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
          왼쪽 목록에서 게시글을 선택하세요.
        </p>
      )}

      {!isLoadingDetail && selectedPost !== null && (
        <article className="mt-5 rounded-xl border border-slate-200 p-5">
          <p className="text-sm text-slate-500">#{selectedPost.id}</p>
          <h3 className="mt-2 text-2xl font-bold">{selectedPost.title}</h3>
          <p className="mt-4 whitespace-pre-wrap leading-7 text-slate-700">
            {selectedPost.content}
          </p>

          <dl className="mt-6 grid gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500 sm:grid-cols-2">
            <div>
              <dt className="font-medium text-slate-700">생성일</dt>
              <dd>{selectedPost.createdAt}</dd>
            </div>
            <div>
              <dt className="font-medium text-slate-700">수정일</dt>
              <dd>{selectedPost.updatedAt}</dd>
            </div>
          </dl>
        </article>
      )}
    </section>
  );
};

export default PostDetail;