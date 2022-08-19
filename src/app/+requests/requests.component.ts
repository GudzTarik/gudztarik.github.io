import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {PageEvent} from '@angular/material/paginator';
import {Sort} from '@angular/material/sort';
import {Router} from '@angular/router';

import {ApiService, UsersService} from '@core/services';

import {DonationRequest} from '@models/donation-request.model';

import {DeleteAccountComponent} from '@shared/dialogs/delete-account/delete-account.component';

import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

import {RequestApiEnum} from './enums/request-api.enum';


@Component({
	templateUrl: './requests.component.html',
	styleUrls: ['./requests.component.scss', './requests-responsive.component.scss']
})
export class RequestsComponent implements OnInit, OnDestroy {
	private readonly unsubscribe$: Subject<void> = new Subject<void>();

	public readonly tableColumns = [
		'name',
		'description',
		'image',
		'status',
		'createdBy',
		'actions'
	];
	public readonly pageSizeOptions: number[] = [10, 50, 100];
	public getRequestsFormGroup!: FormGroup;
	public requests: DonationRequest[] = [];
	public totalCount!: number;
	public pageCount = 0;

	constructor(private readonly formBuilder: FormBuilder,
							private readonly usersService: UsersService,
							private readonly dialog: MatDialog,
							private readonly router: Router,
							private readonly apiService: ApiService) {

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
		this.getRequests();
		//     });
	}

	public changeSearch(event: string): void {
		this.getRequestsFormGroup.patchValue({
			searchTerm: event,
			pageIndex: 0
		});
	}

	private setForms(): void {
		this.getRequestsFormGroup = this.formBuilder.group({
			searchTerm: '',
			sortBy: 0,
			sortByDirection: 0,
			pageSize: 10,
			pageIndex: 0
		});
	}

	private getRequests(): void {
		this.apiService
			.get<DonationRequest[]>(RequestApiEnum.DonationRequest)
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				(result) => {
					this.requests = result;

					this.totalCount = 10;
					this.pageCount = 1;
				}
			);
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

	}

	private updateClients(): void {
		this.getRequestsFormGroup.valueChanges
			.pipe(takeUntil(this.unsubscribe$))
			.subscribe(
				(): void => {
					this.setDefaultFiltersQueryParams();
				}
			);
	}

	private setDefaultFiltersQueryParams(): void {
		this.router.navigate([], {
			queryParams: {
				searchTerm: this.getRequestsFormGroup.value.searchTerm,
				sortBy: this.getRequestsFormGroup.value.sortBy,
				sortByDirection: this.getRequestsFormGroup.value.sortByDirection,
				pageSize: this.getRequestsFormGroup.value.pageSize,
				pageIndex: this.getRequestsFormGroup.value.pageIndex
			}
		}).then();
	}

	public paginatorEvent(event: PageEvent): void {
		this.getRequestsFormGroup.patchValue({
			pageSize: event.pageSize,
			pageIndex: event.pageIndex
		});
	}

	public sortData(event: Sort): void {
		this.getRequestsFormGroup.patchValue({
			sortBy: +event.active,
			sortByDirection: event.direction === 'desc' ? 1 : 0
		});
	}
}
