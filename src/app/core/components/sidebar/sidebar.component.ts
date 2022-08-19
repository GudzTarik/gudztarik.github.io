import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {NavigationStart, Router} from '@angular/router';

import {AuthService, UiService} from '@core/services';
import {CurrentUserInterface} from '@models/user.model';

import {Subject} from 'rxjs';
import {filter, takeUntil} from 'rxjs/operators';

@Component({
	selector: 'i-load-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
	@Output() openSidenav: EventEmitter<void> = new EventEmitter();
	@Output() closeSidenav: EventEmitter<void> = new EventEmitter();

	private readonly unsubscribe$: Subject<void> = new Subject<void>();

	public currentUser!: CurrentUserInterface;

	constructor(private readonly router: Router,
							public readonly authService: AuthService,
							private readonly uiService: UiService) {
	}

	public ngOnInit(): void {
		this.uiService.onSidebarOpened$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.openSidenav.emit());
		this.uiService.onSidebarClosed$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.closeSidenav.emit());

		this.handleRouterEvents();
		this.getCurrentUser();
	}

	public ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	public getCurrentUser(): void {
		// this.authService.user$
		//   .pipe(takeUntil(this.unsubscribe$))
		//   .subscribe((currentUser): void => {
		//     this.currentUser = currentUser;
		//   });
	}

	private handleRouterEvents(): void {
		this.router.events
			.pipe(
				takeUntil(this.unsubscribe$),
				filter((event): boolean => event instanceof NavigationStart)
			)
			.subscribe((): void => this.uiService.closeSidebar());
	}

	public logout(): void {
		this.authService.logOut();
		this.uiService.closeSidebar();
	}
}
