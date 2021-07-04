import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GenclaveService } from 'src/app/services/genclave.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import IrespBackend from 'src/app/interfaces/IrespBackend';
import { MatDialog, } from '@angular/material/dialog';
import IModalData from 'src/app/interfaces/IModalData';
import ModalGeneral from 'src/app/services/ModalGeneral';
import { Location } from '@angular/common';


@Component({
	selector: 'app-generarclave',
	templateUrl: './generarclave.component.html',
	styleUrls: ['./generarclave.component.css']
})
export class GenerarclaveComponent implements OnInit {

	dataExito: IModalData = {
		title: 'Éxito',
		message: 'Clave generada correctamente',
		icon: 'check_circle'
	};
	dataError: IModalData = {
		title: 'Error',
		message: 'La clave no se pudo generar',
		icon: 'error'
	};

	constructor(
		public fb: FormBuilder,
		public genservice: GenclaveService,
		private activatedRoute: ActivatedRoute,
		private router: Router,
		private dialog: MatDialog,
		private location: Location
	) {

	}

	formGenerar = this.fb.group({
		password: ["", [Validators.required, Validators.minLength(8)]],
		password_repeat: ["", [Validators.required, Validators.minLength(8)]],
		userHash: [""]
	})

	ngOnInit(): void {
		console.log("hola")
	}

	hide: boolean = true;
	hide_repeat: boolean = true;
	modals = new ModalGeneral(this.dialog, this.location, this.router);


	Generar() {
		// Verificamos q las claves coincidan
		if (this.formGenerar.valid && this.formGenerar.get('password')?.value === this.formGenerar.get('password_repeat')?.value) {
			const hash = this.activatedRoute.snapshot.paramMap.get('hash')
			this.formGenerar.get("userHash")?.setValue(hash)
			this.modals.openLoading();
			this.genservice.generar(this.formGenerar.value).subscribe(respuestaBackend => {
				this.modals.openModalInfo(respuestaBackend.estado == 'success' ? this.dataExito : this.dataError);
			})
		}
	}

	getErrorMessagePassword(nameControl: string) {
		return this.formGenerar.get(nameControl)?.hasError('required') ? 'El campo es obligatorio' :
			this.formGenerar.get(nameControl)?.hasError('minlength') ? 'Debe tener 8 carácteres mínimo' :
				(nameControl == 'password_repeat' && (this.formGenerar.get('password')?.value !== this.formGenerar.get('password_repeat')?.value) ? 'Las contraseñas no coinciden' : '');
	}
}
