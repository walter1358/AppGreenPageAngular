// usuario.model.ts
export interface Usuario {
    id?: number;             // ID del usuario (opcional, ya que se genera en el servidor)
    firstName: string;       // Nombre del usuario
    lastName: string;        // Apellido del usuario 
    email: string;           // Correo electrónico
    password: string;        // Contraseña
    profile: string;         // Perfil del usuario, puede ser 'Ofertador' o 'Administrador'
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

