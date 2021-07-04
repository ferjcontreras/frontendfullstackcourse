import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import IPersona from 'src/app/interfaces/IPersona';
import { PersonasService } from 'src/app/services/personas.service';
import { RecibosService } from 'src/app/services/recibos.service';
import ModalGeneral from 'src/app/services/ModalGeneral';
import { MatDialog } from '@angular/material/dialog';
import IModalData from 'src/app/interfaces/IModalData';

interface Food {
	value: string;
	viewValue: string;
}

@Component({
	selector: 'app-upload-recibo',
	templateUrl: './upload-recibo.component.html',
	styleUrls: ['./upload-recibo.component.css']
})
export class UploadReciboComponent implements OnInit {

	dataExito: IModalData = {
		title: 'Éxito',
		message: 'Recibo subido correctamente',
		icon: 'check_circle'
	};
	dataError: IModalData = {
		title: 'Error',
		message: 'El Recibo no se pudo subir',
		icon: 'error'
	};

	constructor(
		public fb: FormBuilder,
		private location: Location,
		private personaService: PersonasService,
		private recibosService: RecibosService,
		private dialog: MatDialog
	) { }

	maxDate: Date = new Date();
	modals = new ModalGeneral(this.dialog, this.location);


	formUploadRecibo = this.fb.group({
		id_usuario_empleado: ['', [Validators.required]],
		id_tipo_recibo: ["", [Validators.required]],
		fecha: ["", [Validators.required]],
		sueldo_bruto: ["", Validators.required],
		sueldo_neto: ["", [Validators.required]],
		/*archivo: ["", Validators.required]*/
	})

	personas: IPersona[] = [];
	fileName = ""
	file: any



	ngOnInit(): void {
		this.personaService.listarPersonas(true).subscribe((resp: any) => {
			if (resp.estado == 'success') {
				this.personas = resp.data;
			}
		});
	}


	backPage(): void {
		this.location.back()
	}

	handleRegister() {
		if (this.formUploadRecibo.valid) {
			this.modals.openLoading();
			this.recibosService.crearRecibo(this.formUploadRecibo.value).subscribe(respuestaBackend => {
				this.modals.openModalInfo(respuestaBackend.estado == 'success' ? this.dataExito : this.dataError);
			})
		}
	}


	private validar(event: any): Boolean {
		const maxSize = 500000;
		this.file = event.target.files
		this.fileName = event.target.files[0].name

		if (this.file.length < 0) {
			console.log("No se adjunto ningun archivo")
			this.file = "";
			this.fileName = "Error en validacion"
			return false
		}

		if (this.file[0].size > maxSize) {
			console.log("ha superado el tamaño permitido")
			this.file = ""
			this.fileName = "Error en validacion"
			return false
		}

		//console.log("Tipo"+this.file[0].type)
		if (this.file[0].type != 'application/pdf') {
			console.log("El formato no es el permitido")
			this.file = ""
			this.fileName = "Error en validacion"
			return false
		}

		return true

	}

	onFileChange(event: any) {
		console.log("Subimos el archivo")
		const validacion = this.validar(event)
		//console.log(event.target.files);
		//console.log(event)


		if (validacion) {
			let file = new FormData()
			file.append('archivo', this.file[0], this.fileName);
			file.append("id_usuario", this.formUploadRecibo.get("id_usuario_empleado")?.value)
			this.recibosService.uploadRecibo(file).subscribe(resp => {
				if (resp.estado === "error") {
					alert("Error al subir archivo")
				}
			})
		}
	}
}
