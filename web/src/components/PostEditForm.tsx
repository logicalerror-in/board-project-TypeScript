import type {UpdatePostRequest} from "../types/posts";
import type {PostFormErrors} from "../validation/postsValidation.ts";

type PostEditFormProps = {
  form: UpdatePostRequest;
  errors: PostFormErrors;
  isSubmittingEdit: boolean;
  isDeleting: boolean;
  onChangeForm: (form: UpdatePostRequest) => void;
  onSubmitUpdate: () => void;
  onSubmitDelete: () => void;
};

const PostEditForm = ({
                        form,
                        errors,
                        isSubmittingEdit,
                        isDeleting,
                        onChangeForm,
                        onSubmitUpdate,
                        onSubmitDelete,
                      }: PostEditFormProps) => {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-bold">게시글 수정 / 삭제</h2>
      <p className="mt-1 text-sm text-slate-500">
        API: PATCH /api/posts/:postId, DELETE /api/posts/:postId
      </p>

      <form
        className="mt-5 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmitUpdate();
        }}
      >
        <div>
          <label
            htmlFor="edit-title"
            className="block text-sm font-medium text-slate-700"
          >
            제목
          </label>
          <input
            id="edit-title"
            value={form.title ?? ""}
            onChange={(event) =>
              onChangeForm({
                ...form,
                title: event.target.value,
              })
            }
            aria-invalid={errors.title !== undefined}
            aria-describedby={
              errors.title !== undefined
                ? "edit-title-error"
                : undefined
            }
            className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="수정할 제목을 입력하세요"
          />
          {errors.title !== undefined && (
            <p
              id="edit-title-error"
              className="mt-2 text-sm text-red-600"
            >
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="edit-content"
            className="block text-sm font-medium text-slate-700"
          >
            내용
          </label>
          <textarea
            id="edit-content"
            value={form.content ?? ""}
            onChange={(event) =>
              onChangeForm({
                ...form,
                content: event.target.value,
              })
            }
            aria-invalid={errors.content !== undefined}
            aria-describedby={
              errors.content !== undefined
                ? "edit-content-error"
                : undefined
            }
            className="mt-2 min-h-36 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="수정할 내용을 입력하세요"
          />
          {errors.content !== undefined && (
            <p
              id="edit-content-error"
              className="mt-2 text-sm text-red-600"
            >
              {errors.content}
            </p>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="submit"
            disabled={isSubmittingEdit || isDeleting}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
          >
            {isSubmittingEdit ? "수정 중..." : "게시글 수정"}
          </button>

          <button
            type="button"
            onClick={onSubmitDelete}
            disabled={isSubmittingEdit || isDeleting}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-red-300"
          >
            {isDeleting ? "삭제 중..." : "게시글 삭제"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default PostEditForm;