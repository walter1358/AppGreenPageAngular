
export class Libros {
    constructor(
        public idlibro: number,
        public ideditorial: number,
        public idgenero: number,
        public destitulo: string,
        public estado: string,
        public isbn: string,
        public sinopsis: string,
        public fecha_inicio: string,
        public fecha_final: string,
        public precio_base: number
    ) { }
}
