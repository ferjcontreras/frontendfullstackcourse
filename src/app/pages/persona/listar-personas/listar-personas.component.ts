import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import IPersona from 'src/app/interfaces/IPersona';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
	selector: 'app-listar-personas',
	templateUrl: './listar-personas.component.html',
	styleUrls: ['./listar-personas.component.css']
})
export class ListarPersonasComponent implements OnInit {

	constructor(private personaService: PersonasService, private location: Location) { }

	displayedColumns: string[] = ['n_doc', 'nombre', 'apellido', 'fecha_nacimiento', 'accion'];
	personas: IPersona[] = [];

	ngOnInit(): void {
		this.personaService.listarPersonas().subscribe((resp: any) => {
			console.log("Hola")
			if (resp.estado == 'success') {
				
				this.personas = resp.data;
			}
		});
	}

	backPage(): void {
		this.location.back()
	}

}
