import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {ActivatedRoute, Router} from '@angular/router';

import {UsersService} from '@core/services';

import {UserModel} from '@models/user.model';

import {DeleteAccountComponent} from '@shared/dialogs/delete-account/delete-account.component';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
	templateUrl: './users.component.html',
	styleUrls: ['./users.component.scss', 'users-responsive.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
	private readonly unsubscribe$: Subject<void> = new Subject<void>();

	public readonly tableColumns = [
		'role',
		'firstName',
		'lastName',
		'email',
		'phone',
		'imageUrl',
		'status',
		'requestsAmount',
		'actions'
	];
	public readonly pageSizeOptions: number[] = [10, 50, 100];
	public getUsersFormGroup!: FormGroup;
	public users: UserModel[] = [];
	public totalCount!: number;
	public pageCount = 0;

	constructor(private readonly formBuilder: FormBuilder,
							private readonly usersService: UsersService,
							private readonly dialog: MatDialog,
							private readonly router: Router,
							private readonly activatedRoute: ActivatedRoute) {
	}

	public ngOnInit(): void {
		this.setForms();
		this.updateClients();
		this.listenForQueryParametersChange();
	}

	public ngOnDestroy(): void {
		this.unsubscribe$.next();
		this.unsubscribe$.complete();
	}

	private listenForQueryParametersChange(): void {
		// this.activatedRoute.queryParams
		//     .pipe(takeUntil(this.unsubscribe$))
		//     .subscribe((params): void => {
		//       if (!!params?.pageSize) {
		//         this.getClientsFormGroup.patchValue({
		//           searchTerm: params.searchTerm || null,
		//           sortBy: +params.sortBy || 0,
		//           sortByDirection: +params.sortByDirection || 0,
		//           pageSize: +params.pageSize || 10,
		//           pageIndex: +params.pageIndex || 0
		//         });
		//       }
		this.getUsers();
		//     });
	}

	public changeSearch(event: string): void {
		this.getUsersFormGroup.patchValue({
			searchTerm: event,
			pageIndex: 0
		});
	}

	private setForms(): void {
		this.getUsersFormGroup = this.formBuilder.group({
			searchTerm: '',
			sortBy: 0,
			sortByDirection: 0,
			pageSize: 10,
			pageIndex: 0
		});
	}

	private getUsers(): void {
		this.users = [
			{
				id: '5a27f1f4-d91f-447f-9f84-0b095fb0e188',
				firstName: 'Bohdan',
				lastName: 'Kukharskyy',
				email: 'bohdan_kukharskyy@yahoo.de',
				phone: '+380637109015',
				imageUrl: 'someimageurl.com',
				status: 'Active',
				requestsAmount: 8,
				requests: 'asdasdasdasd',
				role: 'Admin'
			},
			{
				id: 'a9a45428-6ac7-4289-883f-15eddf13845d',
				firstName: 'Regression',
				lastName: 'Test',
				email: 'jet.lviv+22@gmail.com',
				phone: '+380637109015',
				imageUrl: 'someimageurl.com',
				status: 'Active',
				requestsAmount: 8,
				requests: 'asdasdasdasd',
				role: 'Admin'
			},
			{
				id: 'ed406d3e-b3a0-4a3b-a04a-3cd69bdad134',
				firstName: 'Master Chief',
				lastName: 'Halo',
				email: 'jet.lviv+2@gmail.com',
				phone: '+380637109015',
				imageUrl: 'someimageurl.com',
				status: 'Active',
				requestsAmount: 8,
				requests: 'asdasdasdasd',
				role: 'User'
			},
			{
				id: 'ff906ddc-c955-493b-a45d-40865b3fbf34',
				firstName: 'Leon',
				lastName: 'Kenedy',
				email: 'jet.lviv+90@gmail.com',
				phone: '+380637109015',
				imageUrl: 'someimageurl.com',
				status: 'Active',
				requestsAmount: 8,
				requests: 'asdasdasdasd',
				role: 'User'
			},
			{
				id: '406eb120-2e31-4a36-a66b-4f11ce2f7cb1',
				firstName: 'Alex',
				lastName: 'Petrovsky',
				email: 'met4inf@gmail.com',
				phone: '+380637109015',
				imageUrl: 'someimageurl.com',
				status: 'Active',
				requestsAmount: 8,
				requests: 'asdasdasdasd',
				role: 'Admin'
			},
			{
				id: '0f208f28-316b-4dfd-85a9-53cebcd99960',
				firstName: 'Obi-Wan Kenobi',
				lastName: 'The Jedi Master',
				email: 'jet.lviv+5@gmail.com',
				phone: '+380637109015',
				imageUrl: 'someimageurl.com',
				status: 'Active',
				requestsAmount: 8,
				requests: 'asdasdasdasd',
				role: 'Admin'
			},
			{
				id: 'd4d81db7-da7e-4188-9391-6ea890ad9bf1',
				firstName: 'asd',
				lastName: 'asd',
				email: 'limajo4090@lankew.com',
				phone: '+380637109015',
				imageUrl: 'someimageurl.com',
				status: 'Active',
				requestsAmount: 8,
				requests: 'asdasdasdasd',
				role: 'Admin'
			},
			{
				id: 'df17d1a8-df16-492a-86df-75f4027936b0',
				firstName: 'asdfasd',
				lastName: 'asdfsdf',
				email: 'jet.lviv+25@gmail.com',
				phone: '+380637109015',
				imageUrl: 'someimageurl.com',
				status: 'Active',
				requestsAmount: 8,
				requests: 'asdasdasdasd',
				role: 'Admin'
			},
			{
				id: 'efe5e648-2aac-4a18-9e01-859c46dd00d0',
				firstName: 'Tony',
				lastName: 'Montana',
				email: 'jet.lviv+1@gmail.com',
				phone: '+380637109015',
				imageUrl: 'someimageurl.com',
				status: 'Active',
				requestsAmount: 8,
				requests: 'asdasdasdasd',
				role: 'Admin'
			},
			{
				id: '64504b44-7e4e-4580-868a-a6ba31567112',
				firstName: 'AFSAFASFA',
				lastName: 'DFAFSSF',
				email: 'jet.lviv+33@gmail.com',
				phone: '+380637109015',
				imageUrl: 'someimageurl.com',
				status: 'Active',
				requestsAmount: 8,
				requests: 'asdasdasdasd',
				role: 'Admin'
			}
		];

		this.totalCount = 33;
		this.pageCount = 1;
		// this.usersService.getUsers(this.getUsersFormGroup.value)
		//     .pipe(takeUntil(this.unsubscribe$))
		//     .subscribe((clients: any): void => {
		//         this.users = clients.data;
		//         this.totalCount = clients.totalCount;
		//         this.pageCount = Math.ceil(clients.totalCount / this.getUsersFormGroup.controls.pageSize.value);
		//       },
		//       (error: HttpErrorResponse): void => {
		//         const errorMessage = this.notificationService.getErrorMessage(error);
		//
		//         this.notificationService.showNotification(errorMessage, 'snack-bar-error');
		//       });
	}

	public openDeleteAccountDialog(id: string): void {
		const dialogRef = this.dialog.open(DeleteAccountComponent, {
			width: '440px'
		});

		dialogRef.afterClosed();
		// .pipe(
		//   filter((result): boolean => !!result),
		//   switchMap((): Observable<boolean> => this.usersService.checkUserDeleteAvailable(id)),
		//   takeUntil(this.unsubscribe$))
		// .subscribe(
		//   (deleteAvailable): void => {
		//     if (deleteAvailable) {
		//       this.deleteAccount(id);
		//     } else {
		//       this.notificationService.showNotification('notification.userCanNotBeDeletedLabel');
		//     }
		//   }
		// );
	}

	private deleteAccount(id: string): void {
		// this.usersService.deleteUser(id)
		//     .pipe(takeUntil(this.unsubscribe$))
		//     .subscribe((): void => {
		//         this.getUsers();
		//         this.notificationService.showNotification('notification.thanksRequestWasSuccessLabel');
		//       },
		//       (error: HttpErrorResponse): void => {
		//         const errorMessage = this.notificationService.getErrorMessage(error);
		//
		//         this.notificationService.showNotification(errorMessage, 'snack-bar-error');
		//       });
	}

	private updateClients(): void {
		this.getUsersFormGroup.valueChanges.pipe(takeUntil(this.unsubscribe$)).subscribe((): void => {
			this.setDefaultFiltersQueryParams();
		});
	}

	private setDefaultFiltersQueryParams(): void {
		this.router.navigate([], {
			queryParams: {
				searchTerm: this.getUsersFormGroup.value.searchTerm,
				sortBy: this.getUsersFormGroup.value.sortBy,
				sortByDirection: this.getUsersFormGroup.value.sortByDirection,
				pageSize: this.getUsersFormGroup.value.pageSize,
				pageIndex: this.getUsersFormGroup.value.pageIndex
			}
		});
	}

	public paginatorEvent(event: PageEvent): void {
		this.getUsersFormGroup.patchValue({
			pageSize: event.pageSize,
			pageIndex: event.pageIndex
		});
	}

	public sortData(event: Sort): void {
		this.getUsersFormGroup.patchValue({
			sortBy: +event.active,
			sortByDirection: event.direction === 'desc' ? 1 : 0
		});
	}
}
