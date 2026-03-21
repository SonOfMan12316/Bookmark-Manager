import client from './client';
import { API_ENDPOINTS } from './endpoints';
import type { Bookmark } from '../types/global';

export interface CreateBookmarkPayload {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
  favicon?: string;
}

export interface UpdateBookmarkPayload {
  title?: string;
  url?: string;
  description?: string;
  tags?: string[];
}

export const bookmarksApi = {
  list(): Promise<Bookmark[]> {
    return client.get<Bookmark[]>(API_ENDPOINTS.BOOKMARKS.LIST).then((r) => r.data);
  },

  create(data: CreateBookmarkPayload): Promise<Bookmark> {
    return client.post<Bookmark>(API_ENDPOINTS.BOOKMARKS.CREATE, data).then((r) => r.data);
  },

  update(id: string, data: UpdateBookmarkPayload): Promise<Bookmark> {
    return client.patch<Bookmark>(API_ENDPOINTS.BOOKMARKS.UPDATE(id), data).then((r) => r.data);
  },

  delete(id: string): Promise<void> {
    return client.delete(API_ENDPOINTS.BOOKMARKS.DELETE(id)).then(() => undefined);
  },

  get(id: string): Promise<Bookmark> {
    return client.get<Bookmark>(API_ENDPOINTS.BOOKMARKS.GET(id)).then((r) => r.data);
  },

  pin(id: string): Promise<Bookmark> {
    return client.patch<Bookmark>(API_ENDPOINTS.BOOKMARKS.PIN(id)).then((r) => r.data);
  },

  archive(id: string): Promise<Bookmark> {
    return client.patch<Bookmark>(API_ENDPOINTS.BOOKMARKS.ARCHIVE(id)).then((r) => r.data);
  },

  visit(id: string): Promise<Bookmark> {
    return client.patch<Bookmark>(API_ENDPOINTS.BOOKMARKS.VISIT(id)).then((r) => r.data);
  },
};
