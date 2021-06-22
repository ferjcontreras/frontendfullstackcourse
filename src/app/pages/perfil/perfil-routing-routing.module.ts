import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { UpdatePerfilComponent } from './update-perfil/update-perfil.component';

const routes: Routes = [
	{
		path: "actualizar-email",
		component: UpdatePerfilComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "cambiar-password",
		component: ChangePasswordComponent,
		canActivate: [AuthGuard]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PerfilRoutingRoutingModule { }
