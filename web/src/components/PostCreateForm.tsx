import type {CreatePostRequest} from "../types/posts.ts";

type PostCreateFormProps = {
  form: CreatePostRequest;
  isSubmittingCreate: boolean;
  onChangeForm: (form: CreatePostRequest) => void;
  onSubmit: () => void;
};

const PostCreateForm = ({form, isSubmittingCreate, onChangeForm, onSubmit,}: PostCreateFormProps) => {
  return (
    <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <h2 className="text-xl font-bold">게시글 생성</h2>
      <p className="mt-1 text-sm text-slate-500">API: POST /api/posts</p>

      <form
        className="mt-5 space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit();
        }}
      >
        <div>
          <label
            htmlFor="create-title"
            className="block text-sm font-medium text-slate-700"
          >
            제목
          </label>
          <input
            id="create-title"
            value={form.title}
            onChange={(event) =>
              onChangeForm({
                ...form,
                title: event.target.value,
              })
            }
            className={'mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-slate-500 focus:ring-2 focus:ring-blue-100'}
            placeholder={'제목을 입력하세요'}
          />
        </div>

        <div>
          <label
            htmlFor={'crate-content'}
            className={'block text-sm font-medium text-slate-700'}
          >
            내용
          </label>
          <textarea
            id={'create-content'}
            value={form.content}
            onChange={(event) =>
              onChangeForm({
                ...form,
                content: event.target.value,
              })
            }
            className="mt-2 min-h-36 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            placeholder="내용을 입력하세요"
          >
          </textarea>
        </div>

        <button
          type={'submit'}
          disabled={isSubmittingCreate}
          className={'rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300'}
        >
          {isSubmittingCreate ? '생성 중...' : '게시글 생성'}
        </button>
      </form>
    </section>
  );
};

export default PostCreateForm;