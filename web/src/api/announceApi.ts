import type {
  AnnouncementDetailResponse,
  AnnouncementListItemResponse,
  CreateAnnouncementRequest,
} from "../types/announcements.ts";
import {isAnnouncementDetailResponse, isAnnouncementListResponse} from "../guards/announcementGuards.ts";

const API_BASE_URL = 'http://localhost:3000/api';

const assertOk = async (response: Response) => {
  if (response.ok) {
    return;
  }

  throw new Error(`API 요청에 실패했습니다. (${response.status})`);
};

export const getAnnouncements = async (): Promise<AnnouncementListItemResponse[]> => {
  const response = await fetch(`${API_BASE_URL}/announcements`);
  await assertOk(response);

  const data: unknown = await response.json();
  if (!isAnnouncementListResponse(data)) {
    throw new Error('공지사항 목록 응답 형식이 올바르지 않습니다.');
  }

  return data;
};

export const getAnnouncement = async (announcementId: number): Promise<AnnouncementDetailResponse> => {
  const response = await fetch(`${API_BASE_URL}/announcements/${announcementId}`);
  await assertOk(response);

  const data: unknown = await response.json();
  if (!isAnnouncementDetailResponse(data)) {
    throw new Error('공지사항 상세 응답 형식이 올바르지 않습니다.');
  }

  return data;
};

export const createAnnouncement = async (request: CreateAnnouncementRequest): Promise<AnnouncementDetailResponse> => {
  const response = await fetch(`${API_BASE_URL}/announcements`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    }
  );
  await assertOk(response);

  const data: unknown = await response.json();
  if (!isAnnouncementDetailResponse(data)) {
    throw new Error("공지사항 생성 응답 형식이 올바르지 않습니다.",);
  }

  return data;
};