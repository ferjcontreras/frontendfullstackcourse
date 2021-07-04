import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import IModalData from 'src/app/interfaces/IModalData';
import ModalGeneral from 'src/app/services/ModalGeneral';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
	selector: 'app-create-persona',
	templateUrl: './create-persona.component.html',
	styleUrls: ['./create-persona.component.css']
})
export class CreatePersonaComponent implements OnInit {

	dataExito: IModalData = {
		title: 'Éxito',
		message: 'Persona agregada correctamente',
		icon: 'check_circle'
	};
	dataError: IModalData = {
		title: 'Error',
		message: 'La persona no se pudo agregar',
		icon: 'error'
	};

	constructor(
		public fb: FormBuilder,
		public personasService: PersonasService,
		private location: Location,
		private dialog: MatDialog,
	) { }

	maxDate: Date = new Date();
	modals = new ModalGeneral(this.dialog, this.location);


	formRegistroPersona = this.fb.group({
		nombre: ["", [Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
		apellido: ["", [Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
		tipoDoc: ["", Validators.required],
		n_doc: ["", [Validators.required, Validators.maxLength(8), Validators.minLength(6), Validators.pattern(/^([0-9])*$/)]],
		fecha_Nac: ["", Validators.required],
		email: ["", [Validators.required, Validators.email]]
	})

	ngOnInit(): void {
		this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
	}

	handleRegistro() {
		if (this.formRegistroPersona.valid) {
			this.modals.openLoading();
			this.personasService.crearPersona(this.formRegistroPersona.value).subscribe(respuestaBackend => {
				this.modals.openModalInfo(respuestaBackend.estado == 'success' ? this.dataExito : this.dataError);
			})
		}
	}

	getErrorMessageN_doc(nameControl: string) {
		return this.formRegistroPersona.get(nameControl)?.hasError('pattern') ? 'Solo debe contener números' :
			this.formRegistroPersona.get(nameControl)?.hasError('required') ? 'El campo es obligatorio' :
				this.formRegistroPersona.get(nameControl)?.hasError('minlength') ? 'Debe completar al menos 6 caracteres' :
					this.formRegistroPersona.get(nameControl)?.hasError('maxlength') ? 'El campo no puede superar los 8 caracteres' : '';
	}

	backPage(): void {
		this.location.back()
	}

}
