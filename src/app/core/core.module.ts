// modules
import {CommonModule} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {MAT_DATE_LOCALE} from '@angular/material/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AuthInterceptor} from '@helpers/auth-interceptor';
import {ErrorInterceptor} from '@helpers/error.interceptor';

// utils
import {SpinnerInterceptor} from '@helpers/spinner.interceptor';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {SharedModule} from '@shared/shared.module';

// components
import {
	ForbiddenComponent,
	HeaderComponent,
	NotFoundComponent,
	SidebarComponent,
	SnackbarComponent,
	SpinnerComponent
} from './components';

export function httpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
	declarations: [
		SpinnerComponent,
		HeaderComponent,
		SidebarComponent,
		ForbiddenComponent,
		NotFoundComponent,
		SnackbarComponent
	],
	imports: [
		SharedModule,
		CommonModule,
		HttpClientModule,
		BrowserModule,
		BrowserAnimationsModule,
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: httpLoaderFactory,
				deps: [HttpClient]
			},
			useDefaultLang: false
		})
	],
	exports: [
		CommonModule,
		SpinnerComponent,
		HeaderComponent,
		SidebarComponent,
		ForbiddenComponent,
		NotFoundComponent,
		SnackbarComponent,
		SharedModule
	],
	providers: [
		{
			provide: MAT_DATE_LOCALE,
			useValue: 'uk-UA'
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: SpinnerInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		},
		{
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorInterceptor,
			multi: true
		}
	]
})
export class CoreModule {
}
