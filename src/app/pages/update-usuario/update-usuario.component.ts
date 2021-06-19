import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-update-usuario',
  templateUrl: './update-usuario.component.html',
  styleUrls: ['./update-usuario.component.css']
})
export class UpdateUsuarioComponent implements OnInit {

  constructor(public fb: FormBuilder, public usuariosServicio: UsuariosService) { }

  hide: boolean = true;
  hide_repeat: boolean = true;

  formActualizarUsuario = this.fb.group({
    nick: ["", [Validators.required]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.minLength(8)]],
    password_repeat: ["", [Validators.minLength(8)]]
  })

  ngOnInit(): void {
    this.usuariosServicio.getUsuario().subscribe((resp: any) => {
      this.formActualizarUsuario.get('nick')?.setValue(resp.data.nick);
      this.formActualizarUsuario.get('email')?.setValue(resp.data.email)
    })
  }

  actualizar() {
    if (this.formActualizarUsuario.get('password')?.value === this.formActualizarUsuario.get('password_repeat')?.value) {
      if (this.formActualizarUsuario.valid) {
        this.usuariosServicio.updateUsuario(this.formActualizarUsuario.value).subscribe(respuestaBackend => {
          console.log(respuestaBackend)
        })
      }
    } else {

    }
  }

}
