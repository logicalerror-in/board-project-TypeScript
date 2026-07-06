import type {PostListItemResponse} from "../types/posts";

type PostListProps = {
  posts: PostListItemResponse[];
  selectedPostId: number | null;
  isLoadingPosts: boolean;
  onRefresh: () => void;
  onSelectPost: (postId: number) => void;
};

const PostList = ({posts, selectedPostId, isLoadingPosts, onRefresh, onSelectPost}: PostListProps) => {
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
          disabled={isLoadingPosts}
        >
          새로고침
        </button>
      </div>

      <div className="mt-5 space-y-3">
        {isLoadingPosts && (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            게시글 목록을 불러오는 중입니다.
          </p>
        )}

        {!isLoadingPosts && posts.length === 0 && (
          <p className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
            아직 게시글이 없습니다.
          </p>
        )}

        {!isLoadingPosts &&
          posts.map((post) => (
            <button
              key={post.id}
              type="button"
              onClick={() => onSelectPost(post.id)}
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
            </button>
          ))}
      </div>
    </section>
  );
};

export default PostList;