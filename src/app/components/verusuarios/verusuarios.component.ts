import { Component, Inject, OnInit, Renderer2,ViewChild,ElementRef, AfterViewInit } from "@angular/core";
import { UsuarioService } from '../../services/usuario.service';
import { Usuario, UsuarioModel, UsuarioUpdate } from '../../model/usuario.model';
import { response } from 'express';
import Swal from 'sweetalert2';
import { DOCUMENT } from "@angular/common";
import { log } from "console";




@Component({
  selector: 'app-verusuarios',
  templateUrl: './verusuarios.component.html',
  styleUrl: './verusuarios.component.css'
})
export class VerusuariosComponent implements AfterViewInit {
usuarioLst: any[]=[];

idUsuario: number = 0;
idPerfil: number = 0;
nomUsuario: string = '';
apeUsuario: string = '';
dni: string = '';
login: string  = '';

@ViewChild('updateModal') updateModal!: ElementRef;


  constructor(
    private usuarioService: UsuarioService,
    private _renderer2: Renderer2,
    @Inject(DOCUMENT) private _document: Document    
  ){}

      
  ngAfterViewInit() {
    this.obtenerUsuarios();
  }
  // Método para cerrar el modal
  cerrarModal(): void {
    const modalElement = this.updateModal.nativeElement;
    modalElement.style.display = 'none';
    modalElement.classList.remove('show');
    modalElement.removeAttribute('aria-modal');
    modalElement.removeAttribute('role');
  }  


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
              </button>`;
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

        // Evento para el botón de editar
        $('#dataTableUsuario').on('click', '.edit-button', (event) => {
          const idUsuario = $(event.currentTarget).data('id');
          this.editarUser(idUsuario);
        });        

    
        

    // Agregar un listener de cambio para los checkboxes
    this.addCheckboxEventListeners();
  },
   (error) => {
    console.error('Error al cargar los usuarios:', error);
    Swal.fire('Error', 'No se pudieron cargar los usuarios.', 'error');
  }
);
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

    editarUser(idUsuario: number): void {
      this.idUsuario = idUsuario;
      const UsuarioUpdate = this.usuarioLst.find((u) => u.idUsuario === idUsuario);
      if (UsuarioUpdate) {
        this.idPerfil = UsuarioUpdate.idPerfil;
        this.nomUsuario = UsuarioUpdate.nomUsuario;
        this.apeUsuario = UsuarioUpdate.apeUsuario;
        this.dni = UsuarioUpdate.dni;
        this.login = UsuarioUpdate.login;        

        // Muestra el modal usando ElementRef
        const modalElement = this.updateModal.nativeElement;
        modalElement.style.display = 'block';
        modalElement.classList.add('show');
        modalElement.setAttribute('aria-modal', 'true');
        modalElement.setAttribute('role', 'dialog');
      }
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



    modificarUsuario(){
        if (this.idPerfil === 0 || this.nomUsuario === '' || this.apeUsuario === '') {
            Swal.fire({
                icon: 'warning',
                title: 'Hay campos vacíos',
                text: 'Complete los campos solicitados',
                showCloseButton: true,
            })
        }
        else {
            let lib = new UsuarioUpdate(this.idPerfil, this.nomUsuario, this.apeUsuario, this.dni, this.login
                       
            ); 
            console.log("Update", lib)            
            this.usuarioService.actualizarUsuario(this.idUsuario, lib).subscribe(
                (response) => {
                    console.log('Libro actualizado: ', response);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Se actualizó correctamente el libro",
                        showConfirmButton: true,
                        showCloseButton: true,
                    });
                    this.cerrarModal(); // Cierra el modal después de actualizar
                    this.obtenerUsuarios();                    
                },
                (error) => {
                    console.error('Error al actualizar el libro:', error.error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.error.Message || 'No se pudo actualizar el libro',
                        showCloseButton: true,
                    });
                }
            );            
    }
}    


}
 