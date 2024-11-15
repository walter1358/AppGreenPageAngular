// usuario.model.ts
export interface Usuario {
    id?: number;             // ID del usuario (opcional, ya que se genera en el servidor)
    nomUsuario: string;       // Nombre del usuario
    apeUsuario: string;  
    dni: string;      // Apellido del usuario 
    login: string;           // Correo electrónico
    pass: string;        // Contraseña
    idPerfil: string;         // Perfil del usuario, puede ser 'Ofertador' o 'Administrador'
    pregunta:string;
    respuesta:string;
  }

  
  // usuario.model.ts
export class UsuarioUpdate{
  constructor(
    public idPerfil?: number,
    public nomUsuario?: string,      
    public apeUsuario?: string,       
    public dni?: string,        
    public login?: string  
  ){}
}
  
  export interface UsuarioModel{
    user: number;
    pass: string;
}

