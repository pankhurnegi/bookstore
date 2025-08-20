import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map((data) => ({
                statuscode: 200,
                data: Array.isArray(data) ? data : [data],
                message: 'Success',
                feildErrors: [],
                error: false,
            }))
        );
    }
}
