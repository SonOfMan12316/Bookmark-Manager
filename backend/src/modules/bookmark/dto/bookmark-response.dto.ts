export class BookmarkResponseDto {
  id: string;
  title: string;
  url: string;
  favicon: string;
  description: string;
  tags: string[];
  pinned: boolean;
  isArchived: boolean;
  visitCount: number;
  lastVisited: string | null;
  createdAt: string;

  constructor(bookmark: any) {
    this.id = bookmark._id.toString();
    this.title = bookmark.title;
    this.url = bookmark.url;
    this.favicon = bookmark.favicon || '';
    this.description = bookmark.description || '';
    this.tags = bookmark.tags || [];
    this.pinned = bookmark.pinned;
    this.isArchived = bookmark.isArchived;
    this.visitCount = bookmark.visitCount;
    this.lastVisited = bookmark.lastVisited
      ? new Date(bookmark.lastVisited).toISOString()
      : null;
    this.createdAt = new Date(bookmark.createdAt).toISOString();
  }
}
