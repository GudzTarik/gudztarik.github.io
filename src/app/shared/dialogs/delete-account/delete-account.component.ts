import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';


@Component({
	templateUrl: './delete-account.component.html'
})
export class DeleteAccountComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public readonly dialogData: string) {
	}
}
