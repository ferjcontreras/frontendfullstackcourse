import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import IRecibo from 'src/app/interfaces/IRecibo';
import { RecibosService } from 'src/app/services/recibos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import IUsuario from 'src/app/interfaces/IUsuario';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listar-recibos',
  templateUrl: './listar-recibos.component.html',
  styleUrls: ['./listar-recibos.component.css']
})
export class ListarRecibosComponent implements OnInit {

  constructor( private location: Location, private recibosService: RecibosService, private servicioUsuario: UsuariosService) { }


  	displayedColumns: string[] = ['fecha', 'sueldo_neto', 'sueldo_bruto', 'visto', 'archivo'];
	recibos: IRecibo[] = [];
	usuario: IUsuario = {
		_id: -1,
		email: '',
		idPersona: -1,
		idRol: -1,
		nick: '',
		avatar: ''
	};
	rutaApi: string = environment.urlApi;

	ngOnInit(): void {
		this.recibosService.listarRecibos().subscribe((resp: any) => {
			console.log("Hola")
			if (resp.estado == 'success') {
				this.recibos = resp.data;
			}
		});
		this.usuario = this.servicioUsuario.getUsuarioLocal();
	}

	backPage(): void {
		this.location.back()
	}

	descargar(arch:string) {
		console.log(this.usuario)
		window.open(`${this.rutaApi}/recibo/getArchivo/${arch}/${this.usuario._id}`)
	}

}
