import {useEffect, useState} from "react";
import type {CreatePostRequest, PostDetailResponse, PostListItemResponse, UpdatePostRequest} from "./types/posts.ts";
import {createPost, deletePost, getPost, getPosts, updatePost} from "./api/postsApi.ts";
import MessageBox from "./components/MessageBox.tsx";
import PostList from "./components/PostList.tsx";
import PostCreateForm from "./components/PostCreateForm.tsx";
import PostDetail from "./components/PostDetail.tsx";
import PostEditForm from "./components/PostEditForm.tsx";

const App = () => {
  const [posts, setPosts] = useState<PostListItemResponse[]>([]);
  const [selectedPost, setSelectedPost] = useState<PostDetailResponse | null>(null);

  const [createForm, setCreateForm] = useState<CreatePostRequest>({
    title: '',
    content: ''
  })

  const [editForm, setEditFrom] = useState<UpdatePostRequest>({
    title: '',
    content: ''
  })

  const [isLoadingPosts, setIsLoadingPosts] = useState(true);
  const [isLoadingDetail, setIsLoadingDetail] = useState(false);
  const [isSubmittingCreate, setIsSubmittingCreate] = useState(false);
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [message, setMessage] = useState("");

  const clearEditForm = () => {
    setEditFrom({
      title: '',
      content: '',
    });
  };

  const syncEditFormWithPost = (post: PostDetailResponse) => {
    setEditFrom({
      title: post.title,
      content: post.content,
    });
  };

  const loadPosts = async () => {
    setIsLoadingPosts(true);
    setMessage('');

    try {
      const data = await getPosts();
      setPosts(data);

      const refreshSelectedPost =
        selectedPost === null
          ? null
          : data.find((post) => post.id === selectedPost.id) ?? null;

      setSelectedPost(refreshSelectedPost);

      if (refreshSelectedPost === null) {
        clearEditForm();
      } else {
        syncEditFormWithPost(refreshSelectedPost);
      }
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : '게시글 목록을 불러오지 못했습니다.'
      );
    } finally {
      setIsLoadingPosts(false);
    }
  };

  const fetchPostDetail = async (postId: number) => {
    setIsLoadingDetail(true);
    setMessage('');

    try {
      const data = await getPost(postId);
      setSelectedPost(data);
      syncEditFormWithPost(data);
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : '게시글 상세를 불러오지 못했습니다.'
      );
    } finally {
      setIsLoadingDetail(false);
    }
  };

  const submitCreatePost = async () => {
    const title = createForm.title.trim();
    const content = createForm.content.trim();

    if (title.length === 0 || content.length === 0) {
      setMessage('제목과 내용을 모두 입력해주세요.');
      return;
    }

    setIsSubmittingCreate(true);
    setMessage('');

    try {
      const createdPost = await createPost({
        title,
        content,
      });

      setCreateForm({
        title: '',
        content: '',
      });
      syncEditFormWithPost(createdPost);
      setSelectedPost(createdPost);
      setPosts((currentPosts) => [createdPost, ...currentPosts]);
      setMessage('게시글이 생성되었습니다.');
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : '게시글을 생성하지 못했습니다.'
      );
    } finally {
      setIsSubmittingCreate(false);
    }
  };

  const submitUpdatePost = async () => {
    if (selectedPost === null) {
      setMessage('수정할 게시글을 먼저 선택해주세요.');
      return;
    }

    const title = editForm.title?.trim() ?? '';
    const content = editForm.content?.trim() ?? '';

    if (title.length === 0 || content.length === 0) {
      setMessage('수정할 제목 또는 내용을 입력해주세요.');
      return;
    }

    setIsSubmittingEdit(true);
    setMessage('');

    try {
      const updatedPost = await updatePost(selectedPost.id, {
        title,
        content
      })

      setSelectedPost(updatedPost);
      syncEditFormWithPost(updatedPost);

      setPosts((currentPosts) =>
        currentPosts.map((post) =>
          post.id === updatedPost.id ? updatedPost : post
        ),
      );

      setMessage('게시글이 수정되었습니다.');
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : '게시글을 수정하지 못했습니다.'
      );
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const submitDeletePost = async () => {
    if (selectedPost === null) {
      setMessage('삭제할 게시글을 먼저 선택해주세요.');
      return;
    }

    const shouldDelete = window.confirm('정말 이 게시글을 삭제할까요?');

    if (!shouldDelete) {
      return;
    }

    setIsDeleting(true);
    setMessage('');

    try {
      await deletePost(selectedPost.id);

      setPosts((currentPosts) =>
        currentPosts.filter((post) => post.id !== selectedPost.id),
      );
      setSelectedPost(null);
      clearEditForm();
      setMessage('게시글이 삭제되었습니다.');
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : '게시글을 삭제하지 못했습니다.'
      );
    } finally {
      setIsDeleting(false);
    }
  }

  useEffect(() => {
    let ignore = false;

    const loadInitialPosts = async () => {
      try {
        const data = await getPosts();
        if (!ignore) {
          setPosts(data);
        }
      } catch (error) {
        if (!ignore) {
          setMessage(
            error instanceof Error
              ? error.message
              : '게시글 목록을 불러오지 못했습니다.'
          );
        }
      } finally {
        if (!ignore) {
          setIsLoadingPosts(false);
        }
      }
    };

    void loadInitialPosts();

    return () => {
      ignore = true;
    };

  }, []);


  return (
    <>
      <main className={'min-h-screen bg-slate-100 text-slate-900'}>
        <section className={'mx-auto max-w-6xl px-6 py-10'}>
          <header className={'mb-8'}>
            <p className={'text-sm font-semibold text-blue-600'}>
              Board Project
            </p>
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
                  onChangeForm={setEditFrom}
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