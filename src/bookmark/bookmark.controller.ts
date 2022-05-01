import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JwtGuard } from '../auth/guard';
import { GetUser } from '../auth/decorator';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@UseGuards(JwtGuard)
@Controller('bookmarks')
export class BookmarkController {

    constructor(private bookmark: BookmarkService) {}

    @Get()
    getBookmarks(@GetUser('id') userId: number) {
        return this.bookmark.getBookmarks(
            userId
        );
    }

    @Get(':id')
    getBookmarksById
    (@GetUser('id') userId: number,
     @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
        return this.bookmark.getBookmarkById(
            userId, 
            bookmarkId
        );
    }

    @Post()
    createBookmark(
        @GetUser('id') userId: number,
        @Body() dto: CreateBookmarkDto    
    ) {
        return this.bookmark.createBookmark(
            userId, 
            dto
        );
    }

    @Patch(':id')
    editBookmarksById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
        @Body() dto: EditBookmarkDto,     
    ) {
        return this.bookmark.editBookmarkById(
            userId,
            bookmarkId,
            dto
        );
    }

    @Delete(':id')
    deleteBookmarkById(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) bookmarkId: number,
    ) {
        return this.bookmark.deleteBookmarkById(
            userId, 
            bookmarkId
        );
    }
}
