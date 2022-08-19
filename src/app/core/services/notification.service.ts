import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

import {SnackbarComponent} from '@core/components';

import {TranslateService} from '@ngx-translate/core';


@Injectable({
	providedIn: 'root'
})
export class NotificationService {
	constructor(private readonly snackBar: MatSnackBar, private readonly translateService: TranslateService) {
	}

	public success(text: string): void {
		this.showNotification(text, 'snack-bar-success');
	}

	public error(text: string = 'Щось пішло не так. Спробуйте ще раз пізніше або напишіть нам в підтримку'): void {
		this.showNotification(text, 'snack-bar-error');
	}

	private showNotification(text: string, panelClass: string): void {
		this.snackBar.openFromComponent(SnackbarComponent, {
			duration: 10000,
			verticalPosition: 'bottom',
			horizontalPosition: 'center',
			panelClass: [panelClass],
			data: text.includes('Label') ? this.translateService.instant(text) : text
		});
	}
}
