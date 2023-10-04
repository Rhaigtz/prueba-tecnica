/*
https://docs.nestjs.com/providers#services
*/

import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class HttpRequestService {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request,
  ) {}

  getRequest() {
    return this.request;
  }
}
