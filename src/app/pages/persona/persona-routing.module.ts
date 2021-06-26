import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CreatePersonaComponent } from './create-persona/create-persona.component';
import { ListarPersonasComponent } from './listar-personas/listar-personas.component';
import { UpdatePersonaComponent } from './update-persona/update-persona.component';

const routes: Routes = [
	{
		path: "crear",
		component: CreatePersonaComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "listar",
		component: ListarPersonasComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "modificar/:id",
		component: UpdatePersonaComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PersonaRoutingModule { }
