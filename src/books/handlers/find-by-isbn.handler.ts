import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Book } from '../types/book.type';
import { GetLibraryHandler } from './get-library.handler';

@Injectable()
export class FindByIsbnHandler {
  constructor(private readonly getLibraryHandler: GetLibraryHandler) {}

  async execute(isbn: string): Promise<Book | undefined> {
    try {
      const library = await this.getLibraryHandler.execute();
      const book = library.find((book) => book.ISBN === isbn);
      if (!book) {
        throw new NotFoundException({ error: 'Book not found' });
      }
      return book;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      console.error('Error finding book by ISBN:', {
        isbn,
        error: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : 'Unknown stack',
      });
      throw new InternalServerErrorException(
        'An error occurred while fetching the book',
      );
    }
  }
}
