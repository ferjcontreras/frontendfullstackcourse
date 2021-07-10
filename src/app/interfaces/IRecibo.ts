export default interface IRecibo {
	id: number,
	idUsuarioContador: number,
	idUsuarioEmpleado: number,
	tipoRecibo: number,
	fecha: string,
	sueldo_neto: number,
	sueldo_bruto: number,
	visto: number,
	archivo: string
}