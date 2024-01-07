import {Request} from 'express';
import {RequestBody, RequestParams} from '../http-handlers/request';
import LoginUser from '../modules/user/login-user';

export type LoginUserRequest = Request<RequestParams, RequestBody, LoginUser>;
