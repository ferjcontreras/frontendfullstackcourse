import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import IRecibo from 'src/app/interfaces/IRecibo';
import { RecibosService } from 'src/app/services/recibos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import IUsuario from 'src/app/interfaces/IUsuario';
import { environment } from 'src/environments/environment';
import {PageEvent} from '@angular/material/paginator';
import IrespBackend from 'src/app/interfaces/IrespBackend';

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
		id: -1,
		email: '',
		idPersona: -1,
		idRol: -1,
		nick: '',
		avatar: ''
	};
	rutaApi: string = environment.urlApi;
	length = 0;
  	pageSize = 10;
  	pageIndex = 0;
	ctdRecibos = 0;



	ngOnInit(): void {
		
		this.recibosService.listarRecibos(this.pageIndex).subscribe((resp: any) => {
			if (resp.estado == 'success') {
				this.recibos = resp.data;
				this.recibosService.getCantidadRecibos().subscribe((resp: IrespBackend)=>{
					if (resp.estado == 'success') {
						this.length = resp.data[0].c
					}
				})
			}
		});
		this.usuario = this.servicioUsuario.getUsuarioLocal();
	}

	backPage(): void {
		this.location.back()
	}

	descargar(arch:string) {
		window.open(`${this.rutaApi}/recibo/getArchivo/${arch}/${this.usuario.id}`)
	}

	handlePageEvent(event: PageEvent) {
		this.pageIndex = event.pageIndex
		this.recibosService.listarRecibos(this.pageIndex).subscribe((resp: any) => {
			if (resp.estado == 'success') {
				this.recibos = resp.data;
			}
		});

	}

}
