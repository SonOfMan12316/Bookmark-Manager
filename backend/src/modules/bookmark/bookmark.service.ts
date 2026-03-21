import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Bookmark, BookmarkDocument } from './entities/bookmark.entity';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { BookmarkResponseDto } from './dto/bookmark-response.dto';

@Injectable()
export class BookmarkService {
  constructor(
    @InjectModel(Bookmark.name) private bookmarkModel: Model<BookmarkDocument>,
  ) {}

  async create(
    userId: string,
    dto: CreateBookmarkDto,
  ): Promise<BookmarkResponseDto> {
    const bookmark = await this.bookmarkModel.create({
      userId: new Types.ObjectId(userId),
      title: dto.title,
      url: dto.url,
      favicon: dto.favicon || this.getFavicon(dto.url),
      description: dto.description || '',
      tags: dto.tags || [],
    });

    return new BookmarkResponseDto(bookmark);
  }

  async findAll(userId: string): Promise<BookmarkResponseDto[]> {
    const bookmarks = await this.bookmarkModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .exec();

    return bookmarks.map((b) => new BookmarkResponseDto(b));
  }

  async findOne(userId: string, id: string): Promise<BookmarkResponseDto> {
    const bookmark = await this.findAndValidate(userId, id);

    return new BookmarkResponseDto(bookmark);
  }

  async update(
    userId: string,
    id: string,
    dto: UpdateBookmarkDto,
  ): Promise<BookmarkResponseDto> {
    const bookmark = await this.findAndValidate(userId, id);

    if (dto.title !== undefined) bookmark.title = dto.title;
    if (dto.url !== undefined) {
      bookmark.url = dto.url;
      if (!dto.favicon) bookmark.favicon = this.getFavicon(dto.url);
    }
    if (dto.favicon !== undefined) bookmark.favicon = dto.favicon;
    if (dto.description !== undefined) bookmark.description = dto.description;
    if (dto.tags !== undefined) bookmark.tags = dto.tags;

    await bookmark.save();

    return new BookmarkResponseDto(bookmark);
  }

  async remove(userId: string, id: string): Promise<void> {
    await this.findAndValidate(userId, id);

    await this.bookmarkModel.deleteOne({ _id: new Types.ObjectId(id) });
  }

  async togglePin(userId: string, id: string): Promise<BookmarkResponseDto> {
    const bookmark = await this.findAndValidate(userId, id);
    bookmark.pinned = !bookmark.pinned;

    await bookmark.save();
    return new BookmarkResponseDto(bookmark);
  }

  async toggleArchive(
    userId: string,
    id: string,
  ): Promise<BookmarkResponseDto> {
    const bookmark = await this.findAndValidate(userId, id);
    bookmark.isArchived = !bookmark.isArchived;
    if (bookmark.isArchived) bookmark.pinned = false;

    await bookmark.save();
    return new BookmarkResponseDto(bookmark);
  }

  async trackVisit(userId: string, id: string): Promise<BookmarkResponseDto> {
    const bookmark = await this.findAndValidate(userId, id);
    bookmark.visitCount += 1;
    bookmark.lastVisited = new Date();
		
    await bookmark.save();
    return new BookmarkResponseDto(bookmark);
  }

  private async findAndValidate(
    userId: string,
    id: string,
  ): Promise<BookmarkDocument> {
    if (!Types.ObjectId.isValid(id))  throw new NotFoundException('Bookmark not found');

    const bookmark = await this.bookmarkModel.findById(id).exec();
    if (!bookmark) throw new NotFoundException('Bookmark not found');
    if (bookmark.userId.toString() !== userId) {
      throw new ForbiddenException('Access denied');
    }
    return bookmark;
  }

	private getFavicon(url: string): string {
    try {
      const fullUrl = url.startsWith('http') ? url : `https://${url}`;
      const domain = new URL(fullUrl).hostname;
      return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
    } catch {
      return '';
    }
  }
}
