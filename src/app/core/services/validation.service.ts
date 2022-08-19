import {Injectable} from '@angular/core';
import {AbstractControl, FormControl} from '@angular/forms';

import {TranslateService} from '@ngx-translate/core';


@Injectable({
	providedIn: 'root'
})
export class ValidationService {
	private config = {};

	constructor(private readonly translateService: TranslateService) {
		this.initConfig();

		translateService.onLangChange.subscribe((): void => this.initConfig());
	}

	private initConfig(): void {
		this.translateService.get('validationService').subscribe((result): void => {
			this.config = result;
		});
	}

	public getValidatorErrorMessage(control: AbstractControl, config = this.config): string {
		if (control) {
			for (const propertyName in control.errors) {
				if (control.errors.hasOwnProperty(propertyName)) {
					return config[propertyName];
				}
			}
		}

		return null;
	}

	public emailValidator(control: AbstractControl): unknown {
		const emailRegex = new RegExp(
			'^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
		);

		if (control.value === null || control.value === '') {
			return null;
		}

		if (!emailRegex.test(control.value)) {
			return {emailIncorrect: true};
		}

		return null;
	}

	public newPasswordValidator(control: FormControl) {
		const lengthRegex = new RegExp('^.{8,}$');
		const letterRegex = new RegExp('[a-zA-Z]');
		const numberRegex = new RegExp('[0-9]');
		const symbolRegex = new RegExp('(?=.*?[!@#$%^&*(){}<>\\[\\],.?"\'`:|_+=~/;-])');

		if (control.value === null) {
			return null;
		}
		if (!lengthRegex.test(control.value) || !letterRegex.test(control.value) || !numberRegex.test(control.value) || !symbolRegex.test(control.value)) {
			return {'passwordIncorrect': true};
		}

		return null;
	}

	public passwordsEqualCheck(formGroup: AbstractControl) {
		const password = formGroup.value.password;
		const confirmPassword = formGroup.value.confirmPassword;

		if (!confirmPassword || !password) {
			return;
		}

		if (confirmPassword !== password) {
			return {wrongConfirmPassword: true};
		} else if (confirmPassword === password) {
			return;
		}
	}
}
