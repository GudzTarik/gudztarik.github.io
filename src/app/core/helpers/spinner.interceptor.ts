import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';

// Services
import {SpinnerService} from '@core/services/spinner.service';

// rxjs
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class SpinnerInterceptor implements HttpInterceptor {
	constructor(private spinnerService: SpinnerService) {
	}

	intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
		this.spinnerService.onStarted(req);
		return next.handle(req).pipe(finalize(() => this.spinnerService.onFinished(req)));
	}
}
