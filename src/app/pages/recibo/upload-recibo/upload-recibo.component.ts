import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import IPersona from 'src/app/interfaces/IPersona';
import { PersonasService } from 'src/app/services/personas.service';
import { RecibosService } from 'src/app/services/recibos.service';

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

  constructor(public fb: FormBuilder, private location: Location, private personaService: PersonasService, private recibosService: RecibosService) { }

  maxDate: Date = new Date();

  formUploadRecibo = this.fb.group({
		id_usuario_empleado: ['', [Validators.required]],
		id_tipo_recibo: ["", [Validators.required ]],
		fecha: ["", [Validators.required]],
		sueldo_bruto: ["", Validators.required],
		sueldo_neto: ["", [Validators.required]],
    /*archivo: ["", Validators.required]*/
	})

  personas: IPersona[] = [];
  fileName=""
  file:any



  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
    this.personaService.listarPersonas().subscribe((resp: any) => {
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
      this.recibosService.crearRecibo(this.formUploadRecibo.value).subscribe((resp: any)=>{
        //console.log(resp)
        if (resp.estado === "success") {
          alert("¡Registrado Correctamente!")
          this.formUploadRecibo.get("id_usuario_empleado")?.setValue(0);
          this.formUploadRecibo.get("id_tipo_recibo")?.setValue(0);
          this.formUploadRecibo.get("fecha")?.setValue('0000-00-00');
          this.formUploadRecibo.get("sueldo_bruto")?.setValue("");
          this.formUploadRecibo.get("sueldo_neto")?.setValue("");
        }
        else if(resp.estado === "error") {
          alert('Hubo un error al registrar el recibo')
        }
      })
    }
  }


  private validar(event:any):Boolean{
    const maxSize = 500000;
    this.file = event.target.files
    this.fileName = event.target.files[0].name

    if(this.file.length < 0){
      console.log("No se adjunto ningun archivo")
      this.file = "";
      this.fileName = "Error en validacion"
      return false
    }

    if(this.file[0].size > maxSize){
      console.log("ha superado el tamaño permitido")
      this.file = ""
      this.fileName = "Error en validacion"
      return false
    }

    //console.log("Tipo"+this.file[0].type)
    if(this.file[0].type != 'application/pdf'){
      console.log("El formato no es el permitido")
      this.file = ""
      this.fileName = "Error en validacion"
      return false
    }

    return true

  }

  onFileChange(event:any){
    console.log("Subimos el archivo")
    const validacion = this.validar(event)
    //console.log(event.target.files);
    //console.log(event)


    if(validacion){
      let file = new FormData()
      file.append('archivo', this.file[0], this.fileName);
      file.append("id_usuario", this.formUploadRecibo.get("id_usuario_empleado")?.value)
      this.recibosService.uploadRecibo(file).subscribe(resp=>{
         if(resp.estado === "error") {
           alert("Error al subir archivo")
         }
      })
    }
  }
}
