import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import IModalData from 'src/app/interfaces/IModalData';

@Component({
	selector: 'app-modal-info',
	templateUrl: './modal-info.component.html',
	styleUrls: ['./modal-info.component.css']
})
export class ModalInfoComponent implements OnInit {

	constructor(
		private dialogRef: MatDialogRef<ModalInfoComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IModalData) { }

	ngOnInit(): void {
	}

}

