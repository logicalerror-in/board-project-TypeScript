import { Form } from "react-router";
import type {UpdatePostRequest} from "../types/posts.ts";
import type {PostFormErrors} from "../validation/postsValidation.ts";

type PostEditFormProps = {
  form: UpdatePostRequest;
  errors: PostFormErrors;
  message: string | null;

  isSubmittingEdit: boolean;
  isDeleting: boolean;

  onChangeForm: (form: UpdatePostRequest) => void;
};

const PostEditForm = ({form, errors, message, isSubmittingEdit, isDeleting, onChangeForm}: PostEditFormProps) => {
  const isPending = isSubmittingEdit || isDeleting;

  const handleDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const shouldDelete = window.confirm('정말 이 게시글을 삭제할까요?');
    if (!shouldDelete) {
      event.preventDefault();
    }
  };

  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div>
        <h2 className="text-xl font-bold">
          게시글 수정
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          API: PATCH /api/posts/:postId
        </p>
      </div>

      {message !== null && (
        <p className="mt-5 rounded-xl bg-red-50 p-4 text-sm text-red-700">
          {message}
        </p>
      )}

      <Form
        method="post"
        className="mt-5 space-y-5"
        noValidate
      >
        <div>
          <label
            htmlFor="edit-title"
            className="block text-sm font-semibold"
          >
            제목
          </label>

          <input
            id="edit-title"
            name="title"
            type="text"
            value={form.title ?? ""}
            disabled={isPending}
            onChange={(event) =>
              onChangeForm({
                ...form,
                title:
                event.target.value,
              })
            }
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          />

          {errors.title !== undefined && (
            <p className="mt-2 text-sm text-red-600">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="edit-content"
            className="block text-sm font-semibold"
          >
            내용
          </label>

          <textarea
            id="edit-content"
            name="content"
            value={form.content ?? ""}
            disabled={isPending}
            onChange={(event) =>
              onChangeForm({
                ...form,
                content:
                event.target.value,
              })
            }
            rows={8}
            className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          />

          {errors.content !==
            undefined && (
              <p className="mt-2 text-sm text-red-600">
                {errors.content}
              </p>
            )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            name="intent"
            value="update"
            disabled={isPending}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmittingEdit
              ? "수정 중..."
              : "게시글 수정"}
          </button>

          <button
            type="submit"
            name="intent"
            value="delete"
            disabled={isPending}
            onClick={
              handleDeleteClick
            }
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isDeleting
              ? "삭제 중..."
              : "게시글 삭제"}
          </button>
        </div>
      </Form>
    </section>
  );
};

export default PostEditForm;