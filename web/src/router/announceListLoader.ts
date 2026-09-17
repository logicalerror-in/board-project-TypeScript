import {getAnnouncements} from "../api/announceApi.ts";

export const announceListLoader = async () => {
  return getAnnouncements();
};