import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Logger } from '@nestjs/common';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
    private readonly logger = new Logger(ErrorInterceptor.name);

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            catchError((err) => {
                this.logger.error(`Error intercepted: ${err.message}`, err.stack);
                return throwError(() => ({
                    status: err.status || 500,
                    message: err.message || 'Internal server error',
                    error: err.name || 'Error',
                    stack: err.stack,
                }));
            })
        );
    }
}
