import {Form, Link, useActionData, useNavigation} from "react-router";
import type {createAnnounceAction} from "../router/createAnnounceAction.ts";

const NewAnnouncePage = () => {
  const actionData = useActionData<typeof createAnnounceAction>();

  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div>
        <h2 className="text-xl font-bold">
          공지사항 작성
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          API: POST /api/announcements
        </p>
      </div>

      {actionData?.message !==
        undefined &&
        actionData.message !== null && (
          <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
            {actionData.message}
          </p>
        )}

      <Form
        method="post"
        noValidate
        className="mt-5 space-y-5"
      >
        <div>
          <label
            htmlFor="announce-title"
            className="block text-sm font-semibold"
          >
            제목
          </label>

          <input
            id="announce-title"
            name="title"
            type="text"
            disabled={isSubmitting}
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          />

          {actionData?.errors.title !==
            undefined && (
              <p className="mt-2 text-sm text-red-600">
                {
                  actionData.errors
                    .title
                }
              </p>
            )}
        </div>

        <div>
          <label
            htmlFor="announce-content"
            className="block text-sm font-semibold"
          >
            내용
          </label>

          <textarea
            id="announce-content"
            name="content"
            rows={8}
            disabled={isSubmitting}
            className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          />

          {actionData?.errors
            .content !== undefined && (
            <p className="mt-2 text-sm text-red-600">
              {
                actionData.errors
                  .content
              }
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting
              ? "생성 중..."
              : "공지사항 생성"}
          </button>

          <Link
            to="/announcements"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium hover:bg-slate-50"
          >
            취소
          </Link>
        </div>
      </Form>
    </section>
  );
};

export default NewAnnouncePage;