import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//material dialog
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { ModalInfoComponent } from './modal-info.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';




@NgModule({
	declarations: [
		ModalInfoComponent
	],
	imports: [
		CommonModule,
		MatDialogModule,
		MatButtonModule,
		MatIconModule,
		MatProgressSpinnerModule
	]
})
export class ModalInfoModule { }
