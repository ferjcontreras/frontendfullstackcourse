import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReciboRoutingModule } from './recibo-routing.module';
import { UploadReciboComponent } from './upload-recibo/upload-recibo.component';
import { ListarRecibosComponent } from './listar-recibos/listar-recibos.component';

import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator'; 




@NgModule({
	declarations: [
		UploadReciboComponent,
		ListarRecibosComponent
	],
	imports: [
		CommonModule,
		ReciboRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatCardModule,
		MatTableModule,
		MatIconModule,
		MatPaginatorModule
	]
})
export class ReciboModule { }
