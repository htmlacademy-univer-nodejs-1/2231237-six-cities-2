import {IMiddleware} from './iMiddleware';
import {NextFunction, Request, Response} from 'express';
import {HttpError} from '../http-handlers/http.errors';
import {StatusCodes} from 'http-status-codes';
import {DocumentExistsInterface} from '../types/document.exists';

export class DocumentExistsMiddleware implements IMiddleware {
  constructor(
    private readonly service: DocumentExistsInterface,
    private readonly entityName: string,
    private readonly paramName: string,
  ) {}

  public async execute({params}: Request, _res: Response, next: NextFunction): Promise<void> {
    const documentId = params[this.paramName];
    if (!await this.service.exists(documentId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `${this.entityName} with ${documentId} not found.`,
        'DocumentExistsMiddleware'
      );
    }

    next();
  }
}
