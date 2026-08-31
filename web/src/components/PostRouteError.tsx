import {isRouteErrorResponse, Link, useRouteError} from "react-router";

const PostRouteError = () => {
  const error = useRouteError();

  let title = '게시글을 불러오지 못했습니다.';
  let message = '게시글을 처리하는 중 문제가 발생했습니다.';

  if (isRouteErrorResponse(error)) {
    title = `${error.status} ${error.statusText}`;

    if (typeof error.data === 'string') {
      message = error.data
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-bold">
        {title}
      </h2>

      <p className="mt-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">
        {message}
      </p>

      <Link
        to="/posts"
        className="mt-4 inline-flex rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
      >
        게시글 목록으로 이동
      </Link>
    </div>
  );
};

export default PostRouteError;