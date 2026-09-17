export type AnnouncementListItemResponse = {
  id: number;
  title: string;
  createdAt: string;
  updatedAt: string;
};

export type AnnouncementDetailResponse = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
};

export type CreateAnnouncementRequest = {
  title: string;
  content: string;
};