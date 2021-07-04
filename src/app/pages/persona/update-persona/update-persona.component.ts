import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import IModalData from 'src/app/interfaces/IModalData';
import IPersona from 'src/app/interfaces/IPersona';
import ModalGeneral from 'src/app/services/ModalGeneral';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
	selector: 'app-update-persona',
	templateUrl: './update-persona.component.html',
	styleUrls: ['./update-persona.component.css']
})
export class UpdatePersonaComponent implements OnInit {

	dataExito: IModalData = {
		title: 'Éxito',
		message: 'Persona actualizada correctamente',
		icon: 'check_circle',
	};
	dataError: IModalData = {
		title: 'Error',
		message: 'La persona no se pudo actualizar',
		icon: 'error'
	};

	constructor(
		private activatedRoute: ActivatedRoute,
		public fb: FormBuilder,
		public personasService: PersonasService,
		private location: Location,
		private dialog: MatDialog
	) { }

	maxDate: Date = new Date();
	modals = new ModalGeneral(this.dialog, this.location);

	formUpdatePersona = this.fb.group({
		id: ['', [Validators.required]],
		nombre: ["", [Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
		apellido: ["", [Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
		tipoDoc: ["", Validators.required],
		n_doc: ["", [Validators.required, Validators.maxLength(8), Validators.minLength(6), Validators.pattern(/^([0-9])*$/)]],
		fecha_Nac: ["", [Validators.required]],
		email: ["", [Validators.required, Validators.email]]
	})

	ngOnInit(): void {
		this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
		this.personasService.getPersona({ n_doc: this.activatedRoute.snapshot.paramMap.get('id') }).subscribe(respuestaBackend => {
			if (respuestaBackend.estado === 'success') {
				const data: IPersona = respuestaBackend.data[0];
				const fecha_nac = new Date(data.fecha_nacimiento).toISOString().slice(0, 10);
				this.formUpdatePersona.get('id')?.setValue(data.id)
				this.formUpdatePersona.get('nombre')?.setValue(data.nombre)
				this.formUpdatePersona.get('apellido')?.setValue(data.apellido)
				this.formUpdatePersona.get('tipoDoc')?.setValue(data.tipoDoc)
				this.formUpdatePersona.get('fecha_Nac')?.setValue(fecha_nac)
				this.formUpdatePersona.get('n_doc')?.setValue(data.n_doc)
				this.formUpdatePersona.get('email')?.setValue(data.email)
			}
		})
	}

	handleUpdate() {
		if (this.formUpdatePersona.valid) {
			this.modals.openLoading();
			this.personasService.updatePersona(this.formUpdatePersona.value).subscribe(respuestaBackend => {
				this.modals.openModalInfo(respuestaBackend.estado == 'success' ? this.dataExito : this.dataError);
			})
		}
	}

	getErrorMessageN_doc(nameControl: string) {
		return this.formUpdatePersona.get(nameControl)?.hasError('pattern') ? 'Solo debe contener números' :
			this.formUpdatePersona.get(nameControl)?.hasError('required') ? 'El campo es obligatorio' :
				this.formUpdatePersona.get(nameControl)?.hasError('minlength') ? 'Debe completar al menos 6 caracteres' :
					this.formUpdatePersona.get(nameControl)?.hasError('maxlength') ? 'El campo no puede superar los 8 caracteres' : '';
	}

	backPage(): void {
		this.location.back()
	}


}
