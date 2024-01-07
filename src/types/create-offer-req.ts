import {Request} from 'express';
import {RequestBody, RequestParams} from '../http-handlers/request';
import CreateOffer from '../modules/offer/create-offer';

export type CreateOfferRequest = Request<RequestParams, RequestBody, CreateOffer>;
