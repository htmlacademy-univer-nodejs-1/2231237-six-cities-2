import {Request} from 'express';
import {RequestBody, RequestParams} from '../http-handlers/request';
import CreateUser from '../modules/user/create-user';

export type CreateUserRequest = Request<RequestParams, RequestBody, CreateUser>;
