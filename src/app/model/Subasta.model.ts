
export class Subasta {
    constructor( 
        public idsubasta: number,
        public idlibro: number,
        public estado: string,
        public tituloLibro: string,
        public sinopsis: string,
        public fechaInicio: string,
        public fechaFin: string,
        public precioBase: number,
        public isclosed: boolean
        //public editorialDescripcion: string,  // Nueva propiedad para la descripción de la editorial
       // public generoDescripcion: string       // Nueva propiedad para la descripción del géner        
    ) { }
}



