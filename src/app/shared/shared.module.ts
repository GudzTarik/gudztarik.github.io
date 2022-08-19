// modules
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {TranslateModule} from '@ngx-translate/core';
import {DeleteAccountComponent} from '@shared/dialogs/delete-account/delete-account.component';
import {
	ThankYouForYourRequestComponent
} from '@shared/dialogs/thank-you-for-your-request/thank-you-for-your-request.component';
import {CheckRolePipe} from '@shared/pipes/check-role.pipe';
import {MaterialModule} from './modules/material.module';


@NgModule({
	declarations: [
		CheckRolePipe,
		DeleteAccountComponent,
		ThankYouForYourRequestComponent
	],
	imports: [
		MaterialModule,
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		TranslateModule,
		RouterModule
	],
	exports: [
		CommonModule,
		RouterModule,
		FormsModule,
		TranslateModule,
		ReactiveFormsModule,
		MaterialModule,
		CheckRolePipe,
		DeleteAccountComponent,
		ThankYouForYourRequestComponent
	],
	providers: []
})
export class SharedModule {
}
