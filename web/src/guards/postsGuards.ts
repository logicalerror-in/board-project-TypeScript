import type {PostDetailResponse, PostListItemResponse} from "../types/posts.ts";
import {isNumber, isRecord, isString} from "./commonGuards.ts";

export const isPostListItemResponse = (value: unknown): value is PostListItemResponse => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    isNumber(value.id) &&
    isString(value.title) &&
    isString(value.content) &&
    isString(value.createdAt) &&
    isString(value.updatedAt)
  );
};

export const isPostListItemResponseArray = (value: unknown): value is PostListItemResponse[] => {
  return Array.isArray(value) && value.every(isPostListItemResponse);
};

export const isPostDetailResponse = (value: unknown): value is PostDetailResponse => {
  return isPostListItemResponse(value);
};