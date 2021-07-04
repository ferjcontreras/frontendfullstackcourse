import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePerfilComponent } from './update-perfil/update-perfil.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { PerfilRoutingRoutingModule } from './perfil-routing-routing.module';
import { ModalInfoModule } from 'src/app/components/modals/modal-info/modal-info.module';

// material
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
	declarations: [
		UpdatePerfilComponent,
		ChangePasswordComponent,
	],
	imports: [
		CommonModule,
		FormsModule,
		PerfilRoutingRoutingModule,
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
export class PerfilModule { }
