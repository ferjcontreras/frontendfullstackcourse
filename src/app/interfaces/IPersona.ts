export default interface IPersona {
	id: number
	tipoDoc: number,
	n_doc: number,
	nombre: string,
	apellido: string,
	fecha_nacimiento: string,
	email?: string
}