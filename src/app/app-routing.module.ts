import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ForbiddenComponent, NotFoundComponent} from '@core/components';
import {AuthGuard} from '@helpers/auth.guard';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'users'
	},
	{
		path: 'users',
		loadChildren: () => import('./+users/users.module').then(({UsersModule}) => UsersModule),
		canActivate: [AuthGuard]
	},
	{
		path: 'requests',
		loadChildren: () => import('./+requests/requests.module').then(({RequestsModule}) => RequestsModule),
		canActivate: [AuthGuard]
	},
	{
		path: '403',
		component: ForbiddenComponent
	},
	{
		path: '404',
		component: NotFoundComponent
	},
	{
		path: '**',
		redirectTo: '404'
	}
];


@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
