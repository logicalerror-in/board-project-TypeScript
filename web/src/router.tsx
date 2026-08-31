import {createBrowserRouter, Link, Navigate} from "react-router";

import App from "./App.tsx";
import PostsPage from "./pages/PostsPage.tsx";
import NewPostPage from "./pages/NewPostPage.tsx";
import PostDetailPage from "./pages/PostDetailPage.tsx";
import EditPostPage from "./pages/EditPostPage.tsx";
import {postListLoader} from "./router/postListLoader.ts";

const NotFoundPage = () => {
  return (
    <div className={'rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200'}>
      <h2 className={"text-xl font-bold"}>
        페이지를 찾을 수 없습니다.
      </h2>

      <p className={'mt-2 text-sm text-slate-600'}>
        존재하지 않는 경로입니다.
      </p>

      <Link
        to={'/posts'}
        className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        게시글 목록으로 이동
      </Link>
    </div>
  );
};


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        index: true,
        element: <Navigate to="/posts" replace/>,
      },
      {
        path: "posts",
        loader: postListLoader,
        element: <PostsPage/>,
      },
      {
        path: "posts/new",
        element: <NewPostPage/>,
      },
      {
        path: "posts/:postId",
        element: <PostDetailPage/>,
      },
      {
        path: "posts/:postId/edit",
        element: <EditPostPage/>,
      },
      {
        path: "*",
        element: <NotFoundPage/>,
      },
    ],
  },
]);