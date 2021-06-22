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

	constructor(public fb: FormBuilder, public personasservice: PersonasService, private location: Location) { }

	maxDate: Date = new Date();

	formRegistroPersona = this.fb.group({
		nombre_persona: ["", [Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
		apellido_persona: ["", [Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
		tipo_Doc: ["", Validators.required],
		num_Doc: ["", [Validators.required, Validators.maxLength(8), Validators.minLength(6)]],
		fecha_Nac: ["", [Validators.required]],
		email: ["", Validators.required]
	})

	ngOnInit(): void {
		this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
	}

	handleRegistro() {
		if (this.formRegistroPersona.valid) {
			this.personasservice.crearPersona(this.formRegistroPersona.value).subscribe(respuetaBackend => {
				console.log(respuetaBackend)
			})
		}
	}

	getErrorMessageNumDoc(nameControl: string) {
		return this.formRegistroPersona.get(nameControl)?.hasError('required') ? 'El campo es obligatorio' :
			this.formRegistroPersona.get(nameControl)?.hasError('minlength') ? 'Debe completar al menos 4 caracteres' :
				this.formRegistroPersona.get(nameControl)?.hasError('maxlength') ? 'El campo no puede superar los 8 caracteres' : '';
	}

	backPage(): void {
		this.location.back()
	}

}
