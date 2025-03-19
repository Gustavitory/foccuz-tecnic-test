import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { GetAllBooksHandler } from './handlers/get-all-books.handler';
import { FindByIsbnHandler } from './handlers/find-by-isbn.handler';
import { FindByAuthorHandler } from './handlers/find-by-author.handler';
import { GetLibraryHandler } from './handlers/get-library.handler';

@Module({
  imports: [
    CacheModule.register({
      ttl: 3600, // 1 hora
      max: 100, // máximo 100 items
    }),
  ],
  controllers: [BooksController],
  providers: [
    BooksService,
    GetAllBooksHandler,
    FindByIsbnHandler,
    FindByAuthorHandler,
    GetLibraryHandler,
  ],
})
export class BooksModule {}
