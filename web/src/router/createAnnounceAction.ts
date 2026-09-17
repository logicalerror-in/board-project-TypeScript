import {type ActionFunctionArgs, redirect} from "react-router";
import {
  type AnnouncementFormErrors,
  hasAnnouncementFormErrors,
  validateCreateAnnouncement
} from "../validation/announceValidation.ts";
import type {CreateAnnouncementRequest} from "../types/announcements.ts";
import {createAnnouncement} from "../api/announceApi.ts";

export type CreateAnnounceActionData = {
  errors: AnnouncementFormErrors;
  message: string | null;
};

export const createAnnounceAction = async ({request}: ActionFunctionArgs): Promise<CreateAnnounceActionData | Response> => {
  const formData = await request.formData();
  const titleValue = formData.get('title');
  const contentValue = formData.get('content');
  const form: CreateAnnouncementRequest = {
    title:
      typeof titleValue === 'string'
        ? titleValue
        : '',
    content:
      typeof contentValue === 'string'
        ? contentValue
        : ''
  };

  const validationErrors = validateCreateAnnouncement(form);
  if (hasAnnouncementFormErrors(validationErrors)) {
    return {
      errors: validationErrors,
      message: null,
    };
  }

  const requestBody: CreateAnnouncementRequest = {
    title: form.title.trim(),
    content: form.content.trim(),
  };

  try {
    const createdAnnouncement = await createAnnouncement(requestBody);

    return redirect(`/announcements/${createdAnnouncement.id}`);
  } catch (error) {
    return {
      errors: {},
      message:
        error instanceof Error
          ? error.message
          : '공지사항을 생성하지 못했습니다.',

    }
  }

};