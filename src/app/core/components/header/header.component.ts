import {Component, OnDestroy, OnInit} from '@angular/core';

import {AuthService, UiService} from '@core/services';

import {CurrentUserInterface} from '@models/user.model';

import {Subject} from 'rxjs';

@Component({
	selector: 'i-load-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss', './header-responsive.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
	private readonly unsubscribe$: Subject<void> = new Subject<void>();

	public currentUser!: CurrentUserInterface;

	constructor(public readonly authService: AuthService, private readonly uiService: UiService) {
	}

	public ngOnInit(): void {
		this.getCurrentUser();
	}

	public ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	public getCurrentUser(): void {
		// this.authService.user$
		//     .pipe(takeUntil(this.unsubscribe$))
		//     .subscribe((currentUser): void => {
		//       this.currentUser = currentUser;
		//     });
	}

	public logout(): void {
		this.authService.logOut();
		//
		// if (this.sidebarService.isSidebarOpened$.value) {
		//   this.sidebarService.isSidebarOpened$.next(false);
		// }
	}

	public openSidebar(): void {
		this.uiService.openSidebar();
	}
}
