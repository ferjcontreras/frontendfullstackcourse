import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaRoutingModule } from './persona-routing.module';
import { CreatePersonaComponent } from './create-persona/create-persona.component';
import { UpdatePersonaComponent } from './update-persona/update-persona.component';
import { ListarPersonasComponent } from './listar-personas/listar-personas.component';

// material
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
	declarations: [
		CreatePersonaComponent,
		UpdatePersonaComponent,
		ListarPersonasComponent
	],
	imports: [
		CommonModule,
		PersonaRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatSelectModule,
		MatButtonModule,
		MatCardModule,
		MatTableModule,
		MatIconModule,
	]
})
export class PersonaModule { }
