import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GenerarclaveRoutingModule } from './generarclave-routing.module';
import { GenerarclaveComponent } from './generarclave.component';
// material
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ModalInfoModule } from 'src/app/components/modals/modal-info/modal-info.module';


@NgModule({
	declarations: [
		GenerarclaveComponent
	],
	imports: [
		CommonModule,
		GenerarclaveRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatCardModule,
		MatIconModule,
		ModalInfoModule
	]
})
export class GenerarclaveModule { }
