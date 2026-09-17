import type {CreateAnnouncementRequest} from "../types/announcements.ts";

export type AnnouncementFormErrors = {
  title?: string;
  content?: string;
};

export const validateCreateAnnouncement = (form: CreateAnnouncementRequest): AnnouncementFormErrors => {
  const errors: AnnouncementFormErrors = {};

  const title = form.title.trim();
  const content = form.content.trim();

  if (title.length === 0) {
    errors.title = "공지사항 제목을 입력해주세요.";
  } else if (title.length > 100) {
    errors.title = "공지사항 제목은 100자 이하여야 합니다.";
  }

  if (content.length === 0) {
    errors.content = "공지사항 내용을 입력해주세요.";
  } else if (content.length > 5000) {
    errors.content = "공지사항 내용은 5000자 이하여야 합니다.";
  }

  return errors;
};

export const hasAnnouncementFormErrors = (errors: AnnouncementFormErrors) => {
  return (
    errors.title !== undefined || errors.content !== undefined
  );
};