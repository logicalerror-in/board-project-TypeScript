import type {LoaderFunctionArgs} from "react-router";
import {getAnnouncement} from "../api/announceApi.ts";

const parseAnnouncementId = (announcementIdParam: string | undefined,) => {
  if (announcementIdParam === undefined) {
    return null;
  }

  const announcementId = Number(announcementIdParam);

  if (!Number.isInteger(announcementId) || announcementId <= 0) {
    return null;
  }

  return announcementId;
};

export const announceLoader = ({params}: LoaderFunctionArgs) => {
  const announcementId = parseAnnouncementId(params.announcementId);

  if (announcementId === null) {
    throw new Response(
      '공지사항ID는 양의 정수여야 합니다.',
      {
        status: 400,
        statusText: 'Bad Request',
      }
    );
  }

  return getAnnouncement(announcementId);
};