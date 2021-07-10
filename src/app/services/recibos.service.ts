import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import IrespBackend from '../interfaces/IrespBackend';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class RecibosService {

  constructor(private http: HttpClient) { }

  rutaApi: string = environment.urlApi;

  uploadRecibo(dataForm: {}) {
		return this.http.post<IrespBackend>(`${this.rutaApi}/recibo/uploadRecibo`, dataForm, {});
	}

  crearRecibo(dataForm: {}) {
    return this.http.post<IrespBackend>(`${this.rutaApi}/recibo/create`, dataForm, {});
  }

  listarRecibos(areEmpleado?: boolean) {
		return this.http.get<IrespBackend>(`${this.rutaApi}/recibo/readAll`);
  }
}
