import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';
import IrespUsuario from 'src/app/interfaces/IUsuario';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import IModalData from 'src/app/interfaces/IModalData';
import IUsuario from 'src/app/interfaces/IUsuario';
import ModalGeneral from 'src/app/services/ModalGeneral';


@Component({
	selector: 'app-update-perfil',
	templateUrl: './update-perfil.component.html',
	styleUrls: ['./update-perfil.component.css']
})
export class UpdatePerfilComponent implements OnInit {

	dataExito: IModalData = {
		title: 'Éxito',
		message: 'Email actualizado correctamente',
		icon: 'check_circle'
	};
	dataError: IModalData = {
		title: 'Error',
		message: 'El Email no se pudo actualizar',
		icon: 'error'
	};
	dataExitoAvatar: IModalData = {
		title: 'Éxito',
		message: 'Avatar actualizado correctamente',
		icon: 'check_circle'
	};
	dataErrorAvatar: IModalData = {
		title: 'Error',
		message: 'El Avatar no se pudo actualizar',
		icon: 'error'
	};

	constructor(
		public fb: FormBuilder,
		public usuariosServicio: UsuariosService,
		private location: Location,
		private dialog: MatDialog,
	) { }

	modals = new ModalGeneral(this.dialog, this.location);
	imageToShow: any = `${environment.defaultAvatar}`

	createImageFromBlob(image: Blob) {
		let reader = new FileReader();
		reader.addEventListener("load", () => {
			this.imageToShow = reader.result;
		}, false);
		if (image) {
			reader.readAsDataURL(image);
		}
	}

	ngOnInit(): void {
		const data: IrespUsuario = this.usuariosServicio.getUsuarioLocal()
		this.usuariosServicio.getAvatar().subscribe(data => {
			this.createImageFromBlob(data);
		});
		this.formUpdateUsuario.get('email')?.setValue(data.email)
	}

	formUpdateUsuario = this.fb.group({
		email: ["", [Validators.required, Validators.email]]
	})

	handleUpdateEmail() {
		if (this.formUpdateUsuario.valid) {
			this.modals.openLoading();
			this.usuariosServicio.updateEmail(this.formUpdateUsuario.value).subscribe(respuestaBackend => {
				this.usuariosServicio.setUsuarioLocal(<IUsuario>respuestaBackend.data);
				this.modals.openModalInfo(respuestaBackend.estado == 'success' ? this.dataExito : this.dataError);
			})
		}
	}

	getErrorMessageEmail(nameControl: string) {
		return this.formUpdateUsuario.get(nameControl)?.hasError('required') ? 'El campo es obligatorio' :
			this.formUpdateUsuario.get(nameControl)?.hasError('email') ? 'Debe ser un email' :
				'';
	}

	backPage(): void {
		this.location.back()
	}

	fileName = ""
	errorMessaje = ""
	file: any

	private validar(event: any): Boolean {
		const maxSize = 500000;
		this.file = event.target.files
		
		if (this.file.length < 0) {
			this.file = "";
			this.errorMessaje = "No se adjuntó ninguna imagen"
			return false
		}
		
		if (this.file[0].size > maxSize) {
			this.file = ""
			this.errorMessaje = "Imagen muy grande (MAX.: 50mb)"
			return false
		}
		
		if (!(this.file[0].type == 'image/gif' || this.file[0].type == 'image/png' ||  this.file[0].type == 'image/jpeg' || this.file[0].type == 'image/jpg')) {
			console.log("El formato no es el permitido")
			this.file = ""
			this.errorMessaje = "Formato no permitido"
			return false
		}
		
		this.fileName = event.target.files[0].name
		return true
	}

	onFileChange(event: any) {
		const validacion = this.validar(event)

		if (validacion) {
			let file = new FormData()
			file.append('avatar', this.file[0], this.fileName);
			this.modals.openLoading();
			this.usuariosServicio.uploadAvatar(file).subscribe(respuestaBackend => {
				this.modals.openModalInfo((respuestaBackend.estado == 'success' ? this.dataExitoAvatar : this.dataErrorAvatar),false);
				respuestaBackend.estado == 'success' && this.usuariosServicio.getAvatar().subscribe(data => {
					this.createImageFromBlob(data);
				});
			})
		}
	}

}
