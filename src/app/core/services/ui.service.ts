import {TemplatePortal} from '@angular/cdk/portal';
import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';


@Injectable({
	providedIn: 'root'
})
export class UiService {
	private _portal$: BehaviorSubject<TemplatePortal | null> = new BehaviorSubject<TemplatePortal | null>(null);
	private _openSidebar$: BehaviorSubject<boolean> = new BehaviorSubject(false);
	private _closeSidebar$: BehaviorSubject<boolean> = new BehaviorSubject(false);

	public portal$: Observable<TemplatePortal | null> = this._portal$.asObservable();
	public onSidebarOpened$: Observable<boolean> = this._openSidebar$.asObservable();
	public onSidebarClosed$: Observable<boolean> = this._closeSidebar$.asObservable();

	constructor() {
	}

	public openPortal(template: TemplatePortal): void {
		this._portal$.next(template);
	}

	public openSidebar(): void {
		this._openSidebar$.next(true);
	}

	public closeSidebar(): void {
		this._closeSidebar$.next(false);
	}
}
