import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { LoginComponent } from '../login/login.component';
import { PerfilModule } from '../perfil/perfil.module';
import { PersonaModule } from '../persona/persona.module';
import { GenerarclaveModule } from '../generarclave/generarclave.module';

//guard
import { AuthGuard } from 'src/app/guards/auth.guard';
import { ReciboModule } from 'src/app/pages/recibo/recibo.module';

const routes: Routes = [
	{
		path: "login",
		component: LoginComponent
	},
	{
		path: "perfil",
		loadChildren: () => import('src/app/pages/perfil/perfil.module').then(m => PerfilModule),
		canActivate: [AuthGuard]
	},
	{
		path: "persona",
		loadChildren: () => import('src/app/pages/persona/persona.module').then(m => PersonaModule),
		canActivate: [AuthGuard]
	},
	{
		path: "recibo",
		loadChildren: () => import('src/app/pages/recibo/recibo.module').then(m => ReciboModule),
		canActivate: [AuthGuard]
	},
	{
		path: "generarClave/:hash",
		loadChildren: () => import('src/app/pages/generarclave/generarclave-routing.module').then(m => GenerarclaveModule),
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class HomeRoutingModule { }
