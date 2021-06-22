import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReciboRoutingModule } from './recibo-routing.module';
import { UploadReciboComponent } from './upload-recibo/upload-recibo.component';
import { ListarRecibosComponent } from './listar-recibos/listar-recibos.component';


@NgModule({
	declarations: [
		UploadReciboComponent,
		ListarRecibosComponent
	],
	imports: [
		CommonModule,
		ReciboRoutingModule
	]
})
export class ReciboModule { }
