import type {CreatePostRequest} from "../types/posts.ts";
import type {PostFormErrors} from "../validation/postsValidation.ts";
import {Form} from "react-router";

type PostCreateFormProps = {
  form: CreatePostRequest;
  errors: PostFormErrors;
  message: string | null;
  isSubmitting: boolean;
  onChangeForm: (
    form: CreatePostRequest,
  ) => void;
};

const PostCreateForm = ({form, errors, message, isSubmitting, onChangeForm}: PostCreateFormProps) => {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div>
        <h2 className="text-xl font-bold">
          게시글 생성
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          API: POST /api/posts
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
            htmlFor="create-title"
            className="block text-sm font-semibold"
          >
            제목
          </label>

          <input
            id="create-title"
            name="title"
            type="text"
            value={form.title}
            onChange={(event) =>
              onChangeForm({
                ...form,
                title: event.target.value,
              })
            }
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            disabled={isSubmitting}
          />

          {errors.title !== undefined && (
            <p className="mt-2 text-sm text-red-600">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="create-content"
            className="block text-sm font-semibold"
          >
            내용
          </label>

          <textarea
            id="create-content"
            name="content"
            value={form.content}
            onChange={(event) =>
              onChangeForm({
                ...form,
                content: event.target.value,
              })
            }
            rows={8}
            className="mt-2 w-full resize-y rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500"
            disabled={isSubmitting}
          />

          {errors.content !== undefined && (
            <p className="mt-2 text-sm text-red-600">
              {errors.content}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting
            ? "생성 중..."
            : "게시글 생성"}
        </button>
      </Form>
    </section>
  );
};

export default PostCreateForm;