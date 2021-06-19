import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//components
import { RegisterComponent } from '../register/register.component';
import { LoginComponent } from '../login/login.component';
import { UpdateUsuarioComponent } from '../update-usuario/update-usuario.component';

//guard
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "registeruser",
    component: RegisterComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "actualizarusuario",
    component: UpdateUsuarioComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
