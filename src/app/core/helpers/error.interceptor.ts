import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {AuthService} from '@core/services';
import {NotificationService} from '@services/notification.service';

import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
	constructor(private readonly authService: AuthService, private readonly notificationService: NotificationService, private readonly router: Router) {
	}

	intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		return next.handle(request)
			.pipe(
				catchError(
					(error) => {
						this.notificationService.error();

						if (error.status === 401) {
							this.authService.logOut();
						} else if (error.status === 403) {
							this.router.navigate(['403']).then();
						} else if (error.status === 404) {
							this.router.navigate(['404']).then();
						} else if (error.status === 423) {
							this.router.navigate(['423']).then();
						}

						return throwError(error);
					}
				)
			);
	}
}
