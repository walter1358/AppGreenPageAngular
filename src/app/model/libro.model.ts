
export class Libros {
    constructor(
        public idLibro: number,
        public idEditorial: number,
        public idGenero : number,
        public destitulo: string,
        public estado: string,
        public isbn: string,
        public sinopsys: string,
        public fecha_inicio: string,
        public fecha_final: string,
        public precio_base: number,
        public editorial: string,  // Nueva propiedad para la descripción de la editorial
        public genero: string       // Nueva propiedad para la descripción del géner
    ) { }
}



export class Librosup {
    constructor(
        public idlibro: number,
        public ideditorial: number,
        public idgenero: number,
        public destitulo: string,
        public estado: string,
        public isbn: string,
        public sinopsys: string,
        //public editorial: { ideditorial: number, deseditorial: string },
        //public genero: { idgenero: number, desgenero: string },
        public idusuario: string,
        public fecinicio: string,
        public fecfinal: string,
        public preciobase: number,
        //public editorial: string,  // Nueva propiedad para la descripción de la editorial
        //public genero: string       // Nueva propiedad para la descripción del géner
    ) { }
}

export class soloLibro {
    constructor(
        public idlibro: number,
        public ideditorial: number,
        public idgenero: number,
        public destitulo: string,
        public estado: string,
        public isbn: string,
        public sinopsys: string,
        public idusuario: string,        
    ) { }
}


