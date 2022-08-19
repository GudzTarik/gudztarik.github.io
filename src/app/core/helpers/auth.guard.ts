import {Injectable} from '@angular/core';
import {CanActivate} from '@angular/router';

import {AuthService} from '../services';


@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	constructor(private authService: AuthService) {
	}

	public canActivate(): boolean {
		const isAuthorized = this.authService.isAuthenticated();

		if (!isAuthorized) {
			this.authService.logOut();
		}

		return isAuthorized;
	}
}
