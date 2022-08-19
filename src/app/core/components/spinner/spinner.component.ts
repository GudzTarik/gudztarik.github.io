import {Component} from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';

import {SpinnerService} from '@core/services';

import {merge, Observable} from 'rxjs';
import {map} from 'rxjs/operators';


@Component({
	selector: 'i-load-spinner',
	templateUrl: './spinner.component.html',
	styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
	private isLoadingHttp$: Observable<boolean> = this.loadingIndicatorService.onLoadingChanged$;

	public requestsPending$: Observable<boolean> = merge(
		this.router.events.pipe(map(event => this.navigationInterceptor(event as RouterEvent))),
		this.isLoadingHttp$
	);

	constructor(private loadingIndicatorService: SpinnerService, private router: Router) {
	}

	private navigationInterceptor(event: RouterEvent): boolean {
		if (event instanceof NavigationStart) {
			return true;
		}
		if (event instanceof NavigationEnd) {
			return false;
		}

		// Set loading state to false in both of the below events to hide the spinner in case a request fails
		if (event instanceof NavigationCancel) {
			return false;
		}
		if (event instanceof NavigationError) {
			return false;
		}
		return false;
	}
}
