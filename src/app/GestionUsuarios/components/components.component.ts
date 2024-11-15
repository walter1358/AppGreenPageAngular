import { Component, OnInit } from '@angular/core';
import { DataServiceUsuarios } from '../../services/userDataService.service';
import { Usuario } from '../../model/usuario.model';
import Swal from "sweetalert2";


@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {
  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = { nomUsuario: '', apeUsuario: '', dni:'' ,login: '', pass: '', idPerfil: '',pregunta:'null' , respuesta:'null' };

  constructor(private usuarioService: DataServiceUsuarios) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuarioService.obtenerUsuarios().subscribe((data) => {
      this.usuarios = data;
    });
  }

  crearUsuario() {
    this.usuarioService.guardarUsuario(this.nuevoUsuario).subscribe(
      (data) => {
      //this.usuarios.push(data);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se guardo el usario",
        showConfirmButton: true,
        showCloseButton: true,
    });
      this.nuevoUsuario = { nomUsuario: '', apeUsuario: '', dni:'' ,login: '', pass: '', idPerfil: '' , pregunta:'null' , respuesta:'null'}; // Limpiar formulario
    },
    error => {
        Swal.fire({
            icon: 'error',
            title: 'Error de registro',
            text: error.error || 'No se pudo registrar el usuario',
            confirmButtonColor: '#d33',
            confirmButtonText: 'Cerrar',
           // position: 'top-end',  // Cambia la posición del modal
            toast: true,                     
        });
        console.log(error.error)
        console.error('Validation errors:', error.error.errors);

    }
    
);
}

  eliminarUsuario(id: number) {
    this.usuarioService.eliminarUsuario(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
    });
  }

  // Nueva función onSubmit
  onSubmit(userForm: any) {
    if (userForm.valid) {
     // this.crearUsuario();  // Llamar a la función para crear un usuario
    }
  }
}
