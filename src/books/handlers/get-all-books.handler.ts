import { Injectable } from '@nestjs/common';
import { Book } from '../types/book.type';
import { GetLibraryHandler } from './get-library.handler';

@Injectable()
export class GetAllBooksHandler {
  constructor(private readonly getLibraryHandler: GetLibraryHandler) {}

  async execute(): Promise<Book[]> {
    return this.getLibraryHandler.execute();
  }
}
