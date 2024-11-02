import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/login.servivio";
import { LoginModel } from "../../model/login.model";
import Swal from "sweetalert2";
import { debug } from "node:console";

@Component({
    selector: 'app-paglogin',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class PagLoginComponent {
    
  isLoggedIn: boolean = false;  
  loginInput: string = 'alonso@gmail.com';
  passwordInput: string = '123';
    

    // Propiedades para el formulario de registro
    nomUsuario: string = '';
    regLogin: string = '';
    regPassword: string = '';
    regPregunta: string = '';
    regRespuesta: string = '';  

    constructor(
        private authService: AuthService, private router: Router)  { }
    
        onLogin() {

          
          console.log('Estad de isAuthenticated: ',this.authService.isAuthenticated())
          console.log('Estado de IsLoggedId: ' , this.authService.isLoggedIn)


          const usertxt = this.loginInput;
          const passtxt = this.passwordInput;
        
          const loginModel: LoginModel = { user: usertxt, pass: passtxt };
          console.log('Enviando datos de login...', loginModel);
        
          this.authService.login(loginModel).subscribe(
            response => {

              this.authService.isLoggedIn = true;
              console.log('Estad de isAuthenticated: ',this.authService.isAuthenticated())
              console.log('Estado de IsLoggedId: ' , this.authService.isLoggedIn)
              this.router.navigate(['/RegistroLibros'])     
              console.log('Login exitoso:', response);
              console.log(response.message)
              Swal.fire({
                position:"center",
                icon:"info",
                title:"Bienvenido",
                text:"Usuario correcto",
                showCancelButton: true            
              })   
             
           
         
               //Navega solo después de la respuesta exitosa del backend
            /*  this.router.navigate(['/RegistroLibros']).then(success => {
                console.log('Navegación exitosa:', success);
              }).catch(err => {
                console.error('Error en la navegación:', err);
              });*/
            }
            ,
            error => {
              console.error('Error en el login:', error);
              Swal.fire({
                    position: "center",
                    icon: "warning",
                    title: "Algo pasó!",
                    text: "Usuario incorrecto",
                    showConfirmButton: true,
                    showCloseButton: true,
                    showCancelButton: false,
                    timer: 5000 // en milisegundos
                  });
            }
            
          );      
          
   
        }

      onSubmit() {
    }


    registerUser() {
      const userData = {
          nomUsuario: this.nomUsuario,
          Login: this.regLogin,
          Pass: this.regPassword,
          Pregunta: this.regPregunta,
          Respuesta: this.regRespuesta
      };

      console.log('Datos a enviar:', userData); // Verifica que todos los campos están presentes


      this.authService.register(userData).subscribe(
        
          response => {
              Swal.fire({
                  icon: 'success',
                  title: 'Registro exitoso',
                  text: 'El usuario ha sido registrado satisfactoriamente',
                  confirmButtonColor: '#3085d6',
                  confirmButtonText: 'Ok'
              });
              this.closeRegisterModal();
          },
          error => {
              Swal.fire({
                  icon: 'error',
                  title: 'Error de registro',
                  text: error.error || 'No se pudo registrar el usuario',
                  confirmButtonColor: '#d33',
                  confirmButtonText: 'Cerrar'
              });
              console.log(error.error)
              console.error('Validation errors:', error.error.errors);

          }
          
      );
      console.log('Registering user with data:', userData);

  }

    isRegisterModalOpen = false;

    openRegisterModal() {
      this.isRegisterModalOpen = true;
    }
  
    closeRegisterModal() {
      this.isRegisterModalOpen = false;
    }
  
    register() {
      // Lógica de registro aquí
      console.log('Registro exitoso');
      this.closeRegisterModal(); // Cierra el modal después de registrar
    }

    
    // onLogin(){
    //   const usertxt = this.loginInput;
    //   const passtxt = this.passwordInput;
    
    //   const loginModel: LoginModel = { user: usertxt, pass: passtxt };
    //   console.log(loginModel);
      
    //   //this.router.navigate(['/RegistroLibros']);


    //   // this.authService.login(loginModel).subscribe(response => 
    //   //   {
    //   //     console.log('Login exitoso', response);
    //   //     this.isLoggedIn = true;
          
    //   //     this.router.navigate(['/RegistroLibros']);
         
    //   //     console.log('Cambio de pagina', response);

    //   //   }, error => {
    //   //     console.error('Error de login', error);
    //   //     Swal.fire({
    //   //         position: "center",
    //   //         icon: "warning",
    //   //         title: "Algo pasó!",
    //   //         text: "Usuario incorrecto",
    //   //         showConfirmButton: true,
    //   //         showCloseButton: true,
    //   //         showCancelButton: false,
    //   //         timer: 5000 // en milisegundos
    //   //       });
    //   // });
    // }
}