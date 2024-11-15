import { Component, AfterViewInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario, UsuarioModel } from '../../model/usuario.model';
import { response } from 'express';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-verusuarios',
  templateUrl: './verusuarios.component.html',
  styleUrl: './verusuarios.component.css'
})
export class VerusuariosComponent implements AfterViewInit {
usuarioLst: any[]=[];

constructor(
  private usuarioService: UsuarioService
){}


obtenerUsuarios() {
  this.usuarioService.obtenerUsuarios().subscribe(response => {
    this.usuarioLst = response;
    console.log('lista de usuarios', this.usuarioLst);

    // Primero, limpia la tabla (si ya tiene datos)
    $('#dataTableUsuario').DataTable().clear().destroy();

    // Luego, llena el DataTable con los nuevos usuarios
    $('#dataTableUsuario').DataTable({
      data: this.usuarioLst,
      columns: [
        {
          title: '#',
          render: (data, type, row, meta) => meta.row + 1
        },
        { data: 'idUsuario', title: 'idUsuario' },
        { data: 'perfilNombre', title: 'Perfil' },
        { data: 'nomUsuario', title: 'Nombre' },
        { data: 'apeUsuario', title: 'Apellido' },
        { data: 'login' , title:'login'},
        { data: 'fecCreacion', title: 'Fecha Creacion' },
        {
          data: 'isactive',
          title: 'Activo',
          render: (data, type, row, meta) => {
            return `
              <input type="checkbox" ${data ? 'checked' : ''} 
                     class="checkbox-activate" 
                     data-id="${row.idUsuario}" 
                     ${type === 'display' ? '' : 'disabled'} />
            `;
          }
        },
        {
          title: 'Acciones',
          render: (data, type, row) => {
            // Botón con el ícono de lápiz (editar)
            return `
            <button class="btn btn-primary btn-sm change-password-button" data-id="${row.idUsuario}">
            <i class="fas fa-key"></i>
            </button>
            <button class="btn btn-warning btn-sm edit-button" data-id="${row.idUsuario}">
            <i class="fas fa-edit"></i>
            </button>`
            ;
            /*
            <button class="btn btn-danger btn-sm delete-button" data-id="${row.idUsuario}">
            <i class="fas fa-trash"></i>
            </button>
            */
          },
          orderable: false, // Opcional: Desactiva la ordenación en esta columna
        }        
      ],
    });

      // Manejador de evento para el botón de eliminar
      $('#dataTableUsuario').on('click', '.delete-button', (event) => {
        const userId = $(event.currentTarget).data('id');
        this.eliminarUsuario(userId);
      });    

      $('#dataTableUsuario').on('click', '.change-password-button', (event) => {
        const userId = $(event.currentTarget).data('id');
        this.cambiarContrasenaUsuario(userId);
      });      

    // Agregar un listener de cambio para los checkboxes
    this.addCheckboxEventListeners();
  });
}

    addCheckboxEventListeners() {
      const checkboxes = document.querySelectorAll('.checkbox-activate') as NodeListOf<HTMLInputElement>;
      checkboxes.forEach((checkbox: HTMLInputElement) => {
        checkbox.addEventListener('change', (event) => {
          const userId = (event.target as HTMLInputElement).getAttribute('data-id');
          const isActive = (event.target as HTMLInputElement).checked;

          if (userId !== null) {
            // Convertimos `userId` a número y mandamos el estado actualizado
            this.updateUserStatus(Number(userId), isActive);
          } else {
            console.error('Error: userId no encontrado en el elemento.');
          }
        });
      });
    }

      eliminarUsuario(id: number) {
        this.usuarioService.deleteUsuario(id).subscribe(
          () => {
            console.log(`Usuario con ID ${id} eliminado exitosamente`);
            Swal.fire({
              icon: 'info',
              title: 'Delete',
              text: 'Usuario eliminado correctamente',
              showCloseButton: true,
            });
            this.obtenerUsuarios(); // Recarga la tabla después de eliminar
          },
          error => {
            console.error('Error al eliminar el usuario:', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error.Message || 'No se pudo eliminar el usuario',
              showCloseButton: true,
            });
          }
        );
      }
      
      cambiarContrasenaUsuario(id: number) {
        Swal.fire({
          title: 'Cambiar Contraseña',
          input: 'password',
          inputPlaceholder: 'Ingresa la nueva contraseña',
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          preConfirm: (password) => {
            if (!password) {
              Swal.showValidationMessage('Por favor, ingresa una nueva contraseña');
            }
            return { password: password };
          }
        }).then((result) => {
          if (result.isConfirmed) {
            const passwordData = { user: id, pass: result.value.password };
            
            // Llama al servicio para cambiar la contraseña
            this.usuarioService.cambiarContrasena(passwordData).subscribe(
              () => Swal.fire('Contraseña actualizada', '', 'success'),
              error => Swal.fire('Error', 'No se pudo actualizar la contraseña', 'error')
            );
          }
        });
      }
            
    

    updateUserStatus(userId: number, isActive: boolean) {
      this.usuarioService.cambiarEstadoUsuario(userId, isActive).subscribe(
        response => {
          console.log(`Estado de usuario ${userId} actualizado a: ${isActive ? 'Activo' : 'Inactivo'}`);
        },
        error => {
          console.error(`Error actualizando el estado del usuario ${userId}:`, error);
        }
      );
    }
    
    ngAfterViewInit() {
      this.obtenerUsuarios();
    }

}
 