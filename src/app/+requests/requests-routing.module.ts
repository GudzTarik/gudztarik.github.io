import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RequestsComponent} from './requests.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		component: RequestsComponent
	}
];


@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class RequestsRoutingModule {
}
