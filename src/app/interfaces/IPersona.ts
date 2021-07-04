export default interface IPersona {
	id: number,
	idUsuario?: number,
	tipoDoc: number,
	n_doc: number,
	nombre: string,
	apellido: string,
	fecha_nacimiento: string,
	email?: string
}