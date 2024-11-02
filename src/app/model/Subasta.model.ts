
export class Subasta {
    constructor(
        public idsubasta: number,
        public idlibro: number,
        public fecha_inicio: string,
        public fecha_final: string,
        public precio_base: number,
    ) { }
}
