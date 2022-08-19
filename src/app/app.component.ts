import {Component, OnInit} from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';

import {IconRegistry, UiService} from '@core/services';
import {TranslateService} from '@ngx-translate/core';


@Component({
	selector: 'i-load-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(private readonly matIconRegistry: MatIconRegistry,
							private readonly domSanitizer: DomSanitizer,
							private readonly translateService: TranslateService,
							private readonly uiService: UiService) {
	}

	get isAuthPage(): boolean {
		return location.pathname.includes('auth');
	}

	public ngOnInit(): void {
		IconRegistry.register(this.matIconRegistry, this.domSanitizer);
		this.translateService.use('ua');
	}

	public onSidenavClosed(): void {
		this.uiService.closeSidebar();
	}
}
