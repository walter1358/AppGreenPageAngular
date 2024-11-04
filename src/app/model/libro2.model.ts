export class Libro2 {
    constructor(
        public idlibro: number,
        public ideditorial: number,
        public idgenero: number,
        public destitulo: string,
        public estado: string,
        public isbn: string,
        public Sinopsys: string,
        public fecha_inicio: string,
        public fecha_final: string,
        public precio_base: number,
        //public editorialDescripcion: string,  // Nueva propiedad para la descripción de la editorial
       // public generoDescripcion: string       // Nueva propiedad para la descripción del géner        
    ) { }
}
