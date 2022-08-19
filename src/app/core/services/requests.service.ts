import {Injectable} from '@angular/core';
import {DonationRequest, DonationRequestType} from '@core/models/donation-request.model';

import {BehaviorSubject, Observable, of} from 'rxjs';
import {tap} from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class RequestsService {
	private _suppliesRequests$: BehaviorSubject<DonationRequest[] | null> = new BehaviorSubject<DonationRequest[] | null>(
		null
	);
	private _donationRequests$: BehaviorSubject<DonationRequest[] | null> = new BehaviorSubject<DonationRequest[] | null>(
		null
	);

	private _suppliesRequests: DonationRequest[] = [];
	private _donationRequests: DonationRequest[] = [];

	public suppliesRequests$: Observable<DonationRequest[] | null> = this._suppliesRequests$.asObservable();
	public donationRequest$: Observable<DonationRequest[] | null> = this._donationRequests$.asObservable();

	constructor() {
	}

	public createRequest(request: DonationRequest): Observable<Partial<DonationRequest>> {
		return of(request).pipe(
			tap(newRequest => {
				if (request.requestType === DonationRequestType.Supplies) {
					this._suppliesRequests.unshift({...request, ...newRequest});
					this._suppliesRequests$.next(this._suppliesRequests);
				} else {
					this._donationRequests.unshift({...request, ...newRequest});
					this._donationRequests$.next(this._donationRequests);
				}
			})
		);
	}
}
