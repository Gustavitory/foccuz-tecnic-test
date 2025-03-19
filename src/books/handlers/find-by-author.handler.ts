import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Book } from '../types/book.type';
import { GetLibraryHandler } from './get-library.handler';

@Injectable()
export class FindByAuthorHandler {
  constructor(private readonly getLibraryHandler: GetLibraryHandler) {}

  async execute(author: string): Promise<Book[]> {
    try {
      const library = await this.getLibraryHandler.execute();
      const books = library.filter((book) =>
        book.author.name.toLowerCase().includes(author.toLowerCase()),
      );
      if (books.length === 0) {
        throw new NotFoundException({
          error: 'Books not found',
        });
      }
      return books;
    } catch (err) {
      if (err instanceof NotFoundException) {
        throw err;
      }
      console.error('Error finding books by author:', {
        author,
        error: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : 'Unknown stack',
      });
      throw new InternalServerErrorException(
        'An error occurred while fetching the books',
      );
    }
  }
}
