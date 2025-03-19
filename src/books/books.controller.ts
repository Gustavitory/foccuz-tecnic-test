import { Controller, Get, Param, Query } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get('author/')
  findByAuthor(@Query('author') author: string): Promise<any> {
    return this.booksService.findByAuthor(author);
  }

  @Get(':isbn')
  findOne(@Param('isbn') isbn: string): Promise<any> {
    return this.booksService.findByIsbn(isbn);
  }

  @Get()
  findAll(): Promise<any> {
    return this.booksService.findAll();
  }
}
