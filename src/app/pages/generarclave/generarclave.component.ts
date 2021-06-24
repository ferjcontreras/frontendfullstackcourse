import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { GenclaveService } from 'src/app/services/genclave.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-generarclave',
  templateUrl: './generarclave.component.html',
  styleUrls: ['./generarclave.component.css']
})
export class GenerarclaveComponent implements OnInit {

  claveerr:boolean = false;
  messageerr:string = ""

  constructor(public fb:FormBuilder, public genservice: GenclaveService, private activatedRoute: ActivatedRoute,private router: Router) { 
    console.log("se crea")
    
  }

  formGenerar = this.fb.group({
    password: ["", [Validators.required, Validators.minLength(8)]],
		password_repeat: ["", [Validators.required, Validators.minLength(8)]],
    userHash: [""]
  })

  ngOnInit(): void {
    console.log("hola")
  }

  Generar() {
    // Verificamos q las claves coincidan
    if (this.formGenerar.get("password")?.value != this.formGenerar.get("password_repeat")?.value) {
      console.log("hola")
      this.messageerr = "Las claves no coinciden"
      this.claveerr = true
      return
    }
    const hash = this.activatedRoute.snapshot.paramMap.get('hash')
    this.formGenerar.get("userHash")?.setValue(hash)
    if (this.formGenerar.valid) {
      this.genservice.generar(this.formGenerar.value).subscribe((resp: any) => {
        if (resp.estado == 'success') {
          this.router.navigate(["/login"])
				} else {
          this.messageerr = "Error al generar clave"
          this.claveerr = true
          console.log("Error al generar clave")
				}
      })
    }
  }
}
