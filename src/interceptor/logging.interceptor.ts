import {
  CallHandler,
  ExecutionContext,
  Injectable,
  Logger,
  NestInterceptor,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';
import * as lodash from 'lodash';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    const { body, headers, httpVersion, method, socket, url } = request;
    const filteredHeaders = lodash.omit(headers, 'authorization'); // hide backend token

    const { remoteAddress, remoteFamily } = socket;
    const startTimestamp = +moment();
    const correlationId = request['correlationId'];

    const incomingRequestTo = `Incoming request to [${
      context.getClass().name
    } -> ${request['route']['path']}]`;

    const time = new Date().toISOString();
    const fromIP = request.headers['x-forwarded-for'];
    const originalUrl = request.originalUrl;
    const referer = request.headers.referer || '';
    const userAgent = request.headers['user-agent'];
    const { password, ...filterRequestBody } = body; // hide password

    const requestJson = {
      timestamp: startTimestamp,
      time,
      correlationId,
      incomingRequestTo,
      method,
      originalUrl,
      url,
      headers: filteredHeaders,
      httpVersion,
      remoteAddress,
      remoteFamily,
      fromIP,
      referer,
      userAgent,
      requestBody: filterRequestBody,
    };

    this.logger.log(JSON.stringify(requestJson));

    return next.handle().pipe(
      tap(() => {
        const { httpVersion, method, socket, url } = request;
        const { remoteAddress, remoteFamily } = socket;
        const { statusCode, statusMessage } = response;

        const correlationId = request['correlationId'];
        const timestamp = +moment();
        const time = new Date().toISOString();
        const processingTime = moment
          .unix(timestamp - startTimestamp)
          .format('SSS');

        const outgoingResponseFrom = `Outgoing response from [${
          context.getClass().name
        } -> ${request['route']['path']}]`;

        const fromIP = request.headers['x-forwarded-for'];
        const originalUrl = request.originalUrl;
        const referer = request.headers.referer || '';
        const userAgent = request.headers['user-agent'];
        const headers = response.getHeaders();

        const responseJson = {
          timestamp,
          time,
          processingTime,
          correlationId,
          outgoingResponseFrom,
          statusCode,
          method,
          originalUrl,
          url,
          headers: filteredHeaders,
          httpVersion,
          remoteAddress,
          remoteFamily,
          fromIP,
          referer,
          userAgent,
          requestBody: filterRequestBody,
          responseData: {
            statusMessage,
            headers,
          },
        };

        this.logger.log(JSON.stringify(responseJson));
      }),
    );
  }
}
