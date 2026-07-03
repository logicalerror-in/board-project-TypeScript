import { useEffect, useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

type CreatePostForm = {
  title: string;
  content: string;
};

async function requestPosts(): Promise<Post[]> {
  const response = await fetch("/api/posts");

  if (!response.ok) {
    throw new Error(`게시글 목록 조회 실패: ${response.status}`);
  }

  return (await response.json()) as Post[];
}

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [form, setForm] = useState<CreatePostForm>({
    title: "",
    content: "",
  });
  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function loadPosts() {
    setIsLoadingPosts(true);
    setMessage("");

    try {
      const data = await requestPosts();

      setPosts(data);

      setSelectedPost((currentSelectedPost) => {
        if (currentSelectedPost === null) {
          return null;
        }

        return (
          data.find((post) => post.id === currentSelectedPost.id) ?? null
        );
      });
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "게시글 목록을 불러오지 못했습니다.",
      );
    } finally {
      setIsLoadingPosts(false);
    }
  }

  async function fetchPostDetail(postId: number) {
    setIsLoadingDetail(true);
    setMessage("");

    try {
      const response = await fetch(`/api/posts/${postId}`);

      if (!response.ok) {
        throw new Error(`게시글 상세 조회 실패: ${response.status}`);
      }

      const data = (await response.json()) as Post;

      setSelectedPost(data);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "게시글 상세를 불러오지 못했습니다.",
      );
    } finally {
      setIsLoadingDetail(false);
    }
  }

  async function createPost() {
    const title = form.title.trim();
    const content = form.content.trim();

    if (title.length === 0 || content.length === 0) {
      setMessage("제목과 내용을 모두 입력해주세요.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!response.ok) {
        throw new Error(`게시글 생성 실패: ${response.status}`);
      }

      const createdPost = (await response.json()) as Post;

      setForm({
        title: "",
        content: "",
      });
      setSelectedPost(createdPost);
      setPosts((currentPosts) => [createdPost, ...currentPosts]);
      setMessage("게시글이 생성되었습니다.");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "게시글을 생성하지 못했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    async function loadInitialPosts() {
      try {
        const data = await requestPosts();

        if (!ignore) {
          setPosts(data);
        }
      } catch (error) {
        if (!ignore) {
          setMessage(
            error instanceof Error
              ? error.message
              : "게시글 목록을 불러오지 못했습니다.",
          );
        }
      } finally {
        if (!ignore) {
          setIsLoadingPosts(false);
        }
      }
    }

    void loadInitialPosts();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-8">
          <p className="text-sm font-semibold text-blue-600">Board Project</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight">
            게시글 목록 / 상세 / 생성
          </h1>
          <p className="mt-3 text-base text-slate-600">
            React에서 NestJS Posts API를 호출해 게시글 데이터를 화면에
            표시합니다.
          </p>
        </header>

        {message.length > 0 && (
          <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700 shadow-sm">
            {message}
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold">게시글 목록</h2>
                <p className="mt-1 text-sm text-slate-500">
                  API: GET /api/posts
                </p>
              </div>

              <button
                type="button"
                onClick={() => void loadPosts()}
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
                    onClick={() => void fetchPostDetail(post.id)}
                    className={`block w-full rounded-xl border p-4 text-left transition hover:bg-slate-50 ${
                      selectedPost?.id === post.id
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

          <div className="space-y-6">
            <section className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h2 className="text-xl font-bold">게시글 생성</h2>
              <p className="mt-1 text-sm text-slate-500">
                API: POST /api/posts
              </p>

              <form
                className="mt-5 space-y-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  void createPost();
                }}
              >
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-slate-700"
                  >
                    제목
                  </label>
                  <input
                    id="title"
                    value={form.title}
                    onChange={(event) =>
                      setForm((currentForm) => ({
                        ...currentForm,
                        title: event.target.value,
                      }))
                    }
                    className="mt-2 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="제목을 입력하세요"
                  />
                </div>

                <div>
                  <label
                    htmlFor="content"
                    className="block text-sm font-medium text-slate-700"
                  >
                    내용
                  </label>
                  <textarea
                    id="content"
                    value={form.content}
                    onChange={(event) =>
                      setForm((currentForm) => ({
                        ...currentForm,
                        content: event.target.value,
                      }))
                    }
                    className="mt-2 min-h-36 w-full rounded-lg border border-slate-300 px-3 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    placeholder="내용을 입력하세요"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
                >
                  {isSubmitting ? "생성 중..." : "게시글 생성"}
                </button>
              </form>
            </section>

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
                  <h3 className="mt-2 text-2xl font-bold">
                    {selectedPost.title}
                  </h3>
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
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;