import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {Observable} from 'rxjs';

import {AuthService} from '../services';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor(private readonly authService: AuthService, private readonly router: Router) {
	}

	public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		const excludeRequests = ['assets', 'auth', 'i18n', 'dashboard'];
		const token = localStorage.getItem('accessToken');

		if (excludeRequests.some((urlSegment): boolean => request.url.includes(urlSegment))) {
			return next.handle(request);
		}

		if (!token) {
			this.router.navigate(['auth/sign-up']).then();
		}

		return next.handle(
			request.clone({
				setHeaders: {Authorization: `Bearer ${token}`}
			})
		);
	}
}
