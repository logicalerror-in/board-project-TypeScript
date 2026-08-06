import { Link, Navigate, Route, Routes } from "react-router";

import MessageBox from "./components/MessageBox";
import EditPostPage from "./pages/EditPostPage";
import NewPostPage from "./pages/NewPostPage";
import PostDetailPage from "./pages/PostDetailPage";
import PostsPage from "./pages/PostsPage";
import { usePosts } from "./hooks/usePosts";

const App = () => {
  const postsState = usePosts();

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8">
          <p className="text-sm font-semibold text-blue-600">Board Project</p>
          <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                게시판 라우팅
              </h1>
              <p className="mt-3 text-base text-slate-600">
                React Router로 URL과 게시글 화면을 연결합니다.
              </p>
            </div>

            <nav className="flex flex-wrap gap-2">
              <Link
                to="/posts"
                className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-medium hover:bg-slate-50"
              >
                게시글 목록
              </Link>
              <Link
                to="/posts/new"
                className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                새 게시글
              </Link>
            </nav>
          </div>
        </header>

        <MessageBox message={postsState.message} />

        <Routes>
          <Route
            path="/"
            element={<Navigate to="/posts" replace />}
          />
          <Route
            path="/posts"
            element={<PostsPage postsState={postsState} />}
          />
          <Route
            path="/posts/new"
            element={<NewPostPage postsState={postsState} />}
          />
          <Route
            path="/posts/:postId"
            element={<PostDetailPage postsState={postsState} />}
          />
          <Route
            path="/posts/:postId/edit"
            element={<EditPostPage postsState={postsState} />}
          />
          <Route
            path="*"
            element={
              <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
                <h2 className="text-xl font-bold">페이지를 찾을 수 없습니다.</h2>
                <p className="mt-2 text-sm text-slate-600">
                  존재하지 않는 프론트엔드 경로입니다.
                </p>
                <Link
                  to="/posts"
                  className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  게시글 목록으로 이동
                </Link>
              </div>
            }
          />
        </Routes>
      </section>
    </main>
  );
};

export default App;