import { Injectable, Injector } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'environments/environment.dev';

/* contents of environment.dev.ts
export const environment = {
    production: false,
    apiHost: `127.0.0.1`,
    apiPort: `8084`,
    apiProtocol: `http:`,
    apiPrefix: ``
};
**/
import { AuthenticationService } from '../authentication/authentication.service';

const PROTOCOL = environment.apiProtocol || 'http:';
const HOST = environment.apiHost || '127.0.0.1';
const PORT = environment.apiPort;
const API_PREFIX = environment.apiPrefix || '';

const AUTH = {
    AUTH_HEADER_KEY: 'Authorization',
    AUTH_PREFIX: 'Bearer',
    TOKEN_NAME: 'token'
};

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    private authService: AuthenticationService;
    constructor(private injector: Injector) {
        // this is must because authentication servivce not available while invoking interceptor
        setTimeout(
            () => (this.authService = this.injector.get(AuthenticationService))
        );
    }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        request = request.clone();
        if (request.headers.has(AUTH.AUTH_HEADER_KEY)) {
            // for login request
        } else {
            if (request.withCredentials) {
                const AUTH_TOKEN = sessionStorage.getItem(AUTH.TOKEN_NAME);
                request = request.clone({
                    setHeaders: {
                        [AUTH.AUTH_HEADER_KEY]: `
                        ${AUTH.AUTH_PREFIX} ${AUTH_TOKEN}`
                    }
                });
            }
            // if custom content type not set
            if (!request.headers.has('Content-type')) {
                request = request.clone({
                    setHeaders: {
                        'Content-type': `application/custom-type.json`
                    }
                });
            } else if (
                request.headers.get('Content-type') === 'multipart/form-data'
            ) {
                request = request.clone({
                    headers: request.headers.delete('Content-type')
                });
            }
        }
        const BASE_URL = `${PROTOCOL}//${HOST}:${PORT}${API_PREFIX}`;
        request = request.clone({
            url: BASE_URL.concat(request.url)
        });

        return next.handle(request);
    }
}

// and call in this way from service file , whichever request required auth token

/**
 getUserDetail() :Observable<any> {
        return this.httpClient
            .get<UserResponse>(`/user/profile`, { withCredentials: true })
            .pipe(map((res) => res.item));
    }

 */
