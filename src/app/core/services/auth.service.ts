import {Injectable} from '@angular/core';
import {Router} from '@angular/router';

import {CurrentUserInterface} from '@core/models/user.model';
import {ApiService} from '@services/api.service';

import {BehaviorSubject, Observable} from 'rxjs';
import {share} from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class AuthService {
	private readonly currentUser$: BehaviorSubject<CurrentUserInterface | null> =
		new BehaviorSubject<CurrentUserInterface | null>(null);

	constructor(private readonly router: Router,
							private readonly apiService: ApiService) {
	}

	public currentUser(): Observable<CurrentUserInterface | null> {
		return this.currentUser$.pipe(share());
	}

	public setCurrentUser(user: CurrentUserInterface): void {
		this.currentUser$.next(user);
	}

	public fetchCurrentUser(): void {
		// TODO: implement api call for fetch new data for currentUser$
	}

	public isAuthenticated(): boolean {
		const token = localStorage.getItem('accessToken');

		return token !== null && token !== undefined;
	}

	public logOut(): void {
		localStorage.clear();
		this.router.navigate(['auth/sign-in']).then();
	}
}
