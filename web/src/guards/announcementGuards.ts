import type {AnnouncementDetailResponse, AnnouncementListItemResponse} from "../types/announcements.ts";
import {isRecord} from "./commonGuards.ts";

export const isAnnouncementListItemResponse = (value: unknown): value is AnnouncementListItemResponse => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === 'number' &&
    typeof value.title === 'string' &&
    typeof value.createdAt === 'string' &&
    typeof value.updatedAt === 'string'
  );
};

export const isAnnouncementListResponse = (value: unknown): value is AnnouncementListItemResponse[] => {
  return (
    Array.isArray(value) && value.every(isAnnouncementListItemResponse)
  );
};

export const isAnnouncementDetailResponse = (value: unknown): value is AnnouncementDetailResponse => {
  if (!isRecord(value)) {
    return false;
  }

  return (
    typeof value.id === 'number' &&
    typeof value.title === 'string' &&
    typeof value.content === 'string' &&
    typeof value.createdAt === 'string' &&
    typeof value.updatedAt === 'string'
  );
};