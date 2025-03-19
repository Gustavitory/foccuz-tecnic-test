import { Injectable, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { Book, LibraryAPIResponse } from '../types/book.type';

@Injectable()
export class GetLibraryHandler {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async execute(): Promise<Book[]> {
    const cachedLibrary = await this.cacheManager.get<Book[]>('library');
    if (cachedLibrary) {
      return cachedLibrary;
    }

    const response = await fetch(
      'https://gitlab.com/-/snippets/4789289/raw/main/data.json',
    );
    const library = (await response.json()) as LibraryAPIResponse;

    const formattedLibrary = library.library.map((book) => book.book);

    await this.cacheManager.set('library', formattedLibrary);
    return formattedLibrary;
  }
}
