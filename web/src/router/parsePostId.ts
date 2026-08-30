export const parsePostId = (postIdParam: string | undefined) => {
  if (postIdParam === undefined) {
    return null;
  }

  const postId = Number(postIdParam);
  if (!Number.isInteger(postId) || postId <= 0) {
    return null;
  }

  return postId;
};