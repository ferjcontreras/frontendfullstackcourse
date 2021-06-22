import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaRoutingModule } from './persona-routing.module';
import { CreatePersonaComponent } from './create-persona/create-persona.component';
import { UpdatePersonaComponent } from './update-persona/update-persona.component';

// material
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	declarations: [
		CreatePersonaComponent,
		UpdatePersonaComponent
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
		MatCardModule
	]
})
export class PersonaModule { }
