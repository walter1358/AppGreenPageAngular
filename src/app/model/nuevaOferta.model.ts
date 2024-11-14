export class Oferta {
    constructor(
        public idOferta: number,
        public idSubasta: number,
        public precioOferta: number,
        public fecOferta: string,
        public idUsuario: number
    ) { }
}

export class Ofertados{
    constructor(
        public idOferta: number,
        public destitulo:string,
        public precioOferta:number,
        public fecOferta: string

    ){}
}