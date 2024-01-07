import {NextFunction, Request, Response} from 'express';
import {HttpError} from './http.errors';

export interface ExceptionFilter {
  catch(error: Error | HttpError, req: Request, res: Response, next: NextFunction): void;
}
