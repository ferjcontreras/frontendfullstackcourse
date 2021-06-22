import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ListarRecibosComponent } from './listar-recibos/listar-recibos.component';
import { UploadReciboComponent } from './upload-recibo/upload-recibo.component';


const routes: Routes = [
	{
		path: "upload",
		component: UploadReciboComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "listar",
		component: ListarRecibosComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ReciboRoutingModule { }
