import { Component, OnInit } from '@angular/core';
import { DataServiceUsuarios } from '../../services/user.service';
import { Usuario } from '../../model/usuario.model';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.css']
})
export class ComponentsComponent implements OnInit {
  usuarios: Usuario[] = [];
  nuevoUsuario: Usuario = { firstName: '', lastName: '', email: '', password: '', profile: '' };

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
    this.usuarioService.guardarUsuario(this.nuevoUsuario).subscribe((data) => {
      this.usuarios.push(data);
      this.nuevoUsuario = { firstName: '', lastName: '', email: '', password: '', profile: '' }; // Limpiar formulario
    });
  }

  eliminarUsuario(id: number) {
    this.usuarioService.eliminarUsuario(id).subscribe(() => {
      this.usuarios = this.usuarios.filter(usuario => usuario.id !== id);
    });
  }

  // Nueva función onSubmit
  onSubmit(userForm: any) {
    if (userForm.valid) {
      this.crearUsuario();  // Llamar a la función para crear un usuario
    }
  }
}
