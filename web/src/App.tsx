import MessageBox from "./components/MessageBox.tsx";
import PostList from "./components/PostList.tsx";
import PostCreateForm from "./components/PostCreateForm.tsx";
import PostDetail from "./components/PostDetail.tsx";
import PostEditForm from "./components/PostEditForm.tsx";
import {usePosts} from "./hooks/usePosts.ts";

const App = () => {
  const {
    posts,
    selectedPost,
    createForm,
    editForm,
    isLoadingPosts,
    isLoadingDetail,
    isSubmittingCreate,
    isSubmittingEdit,
    isDeleting,
    message,
    setCreateForm,
    setEditForm,
    loadPosts,
    fetchPostDetail,
    submitCreatePost,
    submitUpdatePost,
    submitDeletePost,
  } = usePosts();

  return (
    <>
      <main className={'min-h-screen bg-slate-100 text-slate-900'}>
        <section className={'mx-auto max-w-6xl px-6 py-10'}>
          <header className={'mb-8'}>
            <p className="text-sm font-semibold text-blue-600">Board Project</p>
            <h1 className={'mt-3 text-base text-slate-600'}>
              React에서 NestJS Posts API를 호출해 게시글 CRUD 흐름을
              확인합니다.
            </h1>
          </header>


          <MessageBox message={message}/>

          <div className={'grid gap-6 lg:grid-cols-[1fr_1.2fr]'}>
            <PostList
              posts={posts}
              selectedPostId={selectedPost?.id ?? null}
              isLoadingPosts={isLoadingPosts}
              onRefresh={() => void loadPosts()}
              onSelectPost={(postId) => void fetchPostDetail(postId)}
            />

            <div className={'space-y-6'}>
              <PostCreateForm
                form={createForm}
                isSubmittingCreate={isSubmittingCreate}
                onChangeForm={setCreateForm}
                onSubmit={() => void submitCreatePost()}
              />

              <PostDetail
                selectedPost={selectedPost}
                isLoadingDetail={isLoadingDetail}
              />

              {selectedPost !== null && (
                <PostEditForm
                  form={editForm}
                  isSubmittingEdit={isSubmittingEdit}
                  isDeleting={isDeleting}
                  onChangeForm={setEditForm}
                  onSubmitUpdate={() => void submitUpdatePost()}
                  onSubmitDelete={() => void submitDeletePost()}
                />
              )}
            </div>

          </div>
        </section>
      </main>
    </>
  );

};

export default App;