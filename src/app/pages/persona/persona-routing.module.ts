import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { CreatePersonaComponent } from './create-persona/create-persona.component';
import { UpdatePersonaComponent } from './update-persona/update-persona.component';

const routes: Routes = [
	{
		path: "crear",
		component: CreatePersonaComponent,
		canActivate: [AuthGuard]
	},
	{
		path: "modificar",
		component: UpdatePersonaComponent,
		canActivate: [AuthGuard]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PersonaRoutingModule { }
