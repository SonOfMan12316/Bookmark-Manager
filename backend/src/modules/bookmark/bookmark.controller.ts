import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { Request } from 'express';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { BookmarkService } from './bookmark.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth/jwt-auth.guard';
import { JwtPayload } from '../auth/jwt.service';

@ApiTags('Bookmarks')
@Controller('bookmarks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class BookmarkController {
  constructor(private readonly bookmarkService: BookmarkService) {}

  @Get()
  @ApiOperation({ summary: 'List all bookmarks for the current user' })
  @ApiResponse({ status: HttpStatus.OK, description: 'List of bookmarks' })
  findAll(@Req() req: Request & { user: JwtPayload }) {
    return this.bookmarkService.findAll(req.user.sub);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new bookmark' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Bookmark created' })
  create(
    @Req() req: Request & { user: JwtPayload },
    @Body() dto: CreateBookmarkDto,
  ) {
    return this.bookmarkService.create(req.user.sub, dto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a single bookmark' })
  findOne(
    @Req() req: Request & { user: JwtPayload },
    @Param('id') id: string,
  ) {
    return this.bookmarkService.findOne(req.user.sub, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a bookmark' })
  update(
    @Req() req: Request & { user: JwtPayload },
    @Param('id') id: string,
    @Body() dto: UpdateBookmarkDto,
  ) {
    return this.bookmarkService.update(req.user.sub, id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a bookmark' })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  remove(@Req() req: Request & { user: JwtPayload }, @Param('id') id: string) {
    return this.bookmarkService.remove(req.user.sub, id);
  }

  @Patch(':id/pin')
  @ApiOperation({ summary: 'Toggle pin status of a bookmark' })
  togglePin(
    @Req() req: Request & { user: JwtPayload },
    @Param('id') id: string,
  ) {
    return this.bookmarkService.togglePin(req.user.sub, id);
  }

  @Patch(':id/archive')
  @ApiOperation({ summary: 'Toggle archive status of a bookmark' })
  toggleArchive(
    @Req() req: Request & { user: JwtPayload },
    @Param('id') id: string,
  ) {
    return this.bookmarkService.toggleArchive(req.user.sub, id);
  }

  @Patch(':id/visit')
  @ApiOperation({ summary: 'Track a visit to a bookmark' })
  trackVisit(
    @Req() req: Request & { user: JwtPayload },
    @Param('id') id: string,
  ) {
    return this.bookmarkService.trackVisit(req.user.sub, id);
  }
}
