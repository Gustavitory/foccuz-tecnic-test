import { Injectable } from '@nestjs/common';
import { GetAllBooksHandler } from './handlers/get-all-books.handler';
import { FindByAuthorHandler } from './handlers/find-by-author.handler';
import { FindByIsbnHandler } from './handlers/find-by-isbn.handler';
import { Book } from './types/book.type';

@Injectable()
export class BooksService {
  constructor(
    private readonly getAllBooksHandler: GetAllBooksHandler,
    private readonly findByIsbnHandler: FindByIsbnHandler,
    private readonly findByAuthorHandler: FindByAuthorHandler,
  ) {}

  async findAll(): Promise<Book[]> {
    return this.getAllBooksHandler.execute();
  }

  async findByIsbn(isbn: string): Promise<Book | undefined> {
    return this.findByIsbnHandler.execute(isbn);
  }

  async findByAuthor(author: string): Promise<Book[]> {
    return this.findByAuthorHandler.execute(author);
  }
}
