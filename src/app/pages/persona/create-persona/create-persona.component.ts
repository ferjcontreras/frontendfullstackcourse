import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
	selector: 'app-create-persona',
	templateUrl: './create-persona.component.html',
	styleUrls: ['./create-persona.component.css']
})
export class CreatePersonaComponent implements OnInit {

	constructor(public fb: FormBuilder, public personasService: PersonasService, private location: Location) { }

	maxDate: Date = new Date();

	formRegistroPersona = this.fb.group({
		nombre: ["", [Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
		apellido: ["", [Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
		tipoDoc: ["", Validators.required],
		n_doc: ["", [Validators.required, Validators.maxLength(8), Validators.minLength(6)]],
		fecha_Nac: ["", [Validators.required]],
		email: ["", Validators.required, Validators.email]
	})

	ngOnInit(): void {
		this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
	}

	handleRegistro() {
		if (this.formRegistroPersona.valid) {
			this.personasService.crearPersona(this.formRegistroPersona.value).subscribe(respuetaBackend => {
				console.log(respuetaBackend)
			})
		}
	}

	getErrorMessageN_doc(nameControl: string) {
		return this.formRegistroPersona.get(nameControl)?.hasError('required') ? 'El campo es obligatorio' :
			this.formRegistroPersona.get(nameControl)?.hasError('minlength') ? 'Debe completar al menos 4 caracteres' :
				this.formRegistroPersona.get(nameControl)?.hasError('maxlength') ? 'El campo no puede superar los 8 caracteres' : '';
	}

	backPage(): void {
		this.location.back()
	}

}
