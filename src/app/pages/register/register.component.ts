import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(public fb:FormBuilder) { }

  formRegistroPersona= this.fb.group({
    nombre_persona:["",[Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]],
    apellido_persona:["",[Validators.required, Validators.pattern(/^([A-Z]|[a-z])+$/)]], 
    tipo_Doc:["", Validators.required],
    num_Doc:["", [Validators.required, Validators.maxLength(8), Validators.minLength(6)]],
    fecha_Nac:["", [Validators.required]],
  })

  ngOnInit(): void {
  }


  registro() {
    
  }

}
