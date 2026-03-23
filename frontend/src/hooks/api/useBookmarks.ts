import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  bookmarksApi,
  type CreateBookmarkPayload,
  type UpdateBookmarkPayload,
} from '../../api/bookmarks.api';

const BOOKMARKS_KEY = ['bookmarks'] as const;

export function useBookmarks() {
  return useQuery({
    queryKey: BOOKMARKS_KEY,
    queryFn: () => bookmarksApi.list(),
    enabled: !!localStorage.getItem('accessToken'),
  });
}

export function useCreateBookmark() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBookmarkPayload) => bookmarksApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: BOOKMARKS_KEY }),
  });
}

export function useUpdateBookmark() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBookmarkPayload }) =>
      bookmarksApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: BOOKMARKS_KEY }),
  });
}

export function useDeleteBookmark() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bookmarksApi.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: BOOKMARKS_KEY }),
  });
}

export function usePinBookmark() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bookmarksApi.pin(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: BOOKMARKS_KEY }),
  });
}

export function useArchiveBookmark() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bookmarksApi.archive(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: BOOKMARKS_KEY }),
  });
}

export function useTrackVisit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => bookmarksApi.visit(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: BOOKMARKS_KEY }),
  });
}
