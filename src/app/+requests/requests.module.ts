import {NgModule} from '@angular/core';

import {SharedModule} from '@shared/shared.module';

import {RequestsRoutingModule} from './requests-routing.module';

import {RequestsComponent} from './requests.component';


@NgModule({
	declarations: [RequestsComponent],
	imports: [RequestsRoutingModule, SharedModule]
})
export class RequestsModule {
}
