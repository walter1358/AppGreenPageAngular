import { Component, OnInit , EventEmitter, Output} from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../../services/login.servivio";
import { LoginModel, UserModel } from "../../model/login.model";
import Swal from "sweetalert2";
import { debug } from "node:console";
import { response } from "express";
import { responseInterceptor } from "http-proxy-middleware";


@Component({
    selector: 'app-paglogin',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class PagLoginComponent implements OnInit{
    
  isLoggedIn: boolean = false;  
  loginInput: string = 'walter_cm93@hotmail.com';
  passwordInput: string = 'Miclave24';
    

    // Propiedades para el formulario de registro7
    nomUsuario: string = '';
    regLogin: string = '';
    regPassword: string = '';
    regPregunta: string = '';
    regRespuesta: string = '';  

    constructor(
        private authService: AuthService, private router: Router,
      )  { }


        ngOnInit(): void {

        }

        recuperaUser(){
          const usertxt = this.loginInput;

          const userModel:UserModel = {user: usertxt}
          this,this.authService.recuperauser(userModel).subscribe(
            response => {

              this.regPregunta = response.userlogger.pregunta;
              console.log(response.message); // "Login exitoso"
              console.log(response.userlogger);
              console.log(response.userlogger.pregunta);
             /* Swal.fire({
                icon: 'success',
                title: 'Registro exitoso',
                text: response.userlogger ||'El usuario ha sido registrado satisfactoriamente',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Ok'
            });*/

            }
          )

        }
    
        onLogin() {
          // Aquí puedes utilizar localStorage
          
          console.log('Estad de isAuthenticated: ',this.authService.isAuthenticated())
          console.log('Estado de IsLoggedId: ' , this.authService.isLoggedIn)


          const usertxt = this.loginInput;
          const passtxt = this.passwordInput;
        
          const loginModel: LoginModel = { user: usertxt, pass: passtxt };
          console.log('Enviando datos de login...', loginModel);
        
          this.authService.login(loginModel).subscribe(
            response => {

              this.authService.isLoggedIn = true;
              const userName = response.userlogger.nomUsuario;
              const userFound = response.userlogger
              console.log('Usuario:', response.userlogger);  
              this.authService.setUserData(response.userlogger);//////--------------------
              console.log('data',this.authService.getUserData())////////---------------
              if(response.userlogger.idPerfil== 1)/** */
                {
                  this.authService.isOferta = true
                }else{
                  this.authService.isOferta = false/** */
                }              
              console.log('Estad de isAuthenticated: ',this.authService.isAuthenticated())
              console.log('Estado de IsLoggedId: ' , this.authService.isLoggedIn)
              //console.log('Login exitoso:', response);
              console.log(response.message); // "Login exitoso"

            /*  Swal.fire({
                position:"center",
                icon:"info",
                title:"Bienvenido",
                html: `
                <strong>Bienvenido: </strong> ${userName}`<br><br>
                <strong>Perfil: </strong> ${response.userlogger.perfilNombre}
               `,                
                //text: response.message || "Usuario correcto",
                showCancelButton: true            
              }).then((result) => {
                    if (result.isConfirmed) {
                        // Redirige a la ruta /RegistroLibros
                    }
                });*/
                this.router.navigate(['/RegistroLibros']);

             
              //this.router.navigate(['/RegistroLibros'])     

         
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
                    text: error.error || "Usuario o contraseña incorrecta",
                    showConfirmButton: true,
                    showCloseButton: true,
                    showCancelButton: false,
                    timer: 5000 // en milisegundos
                  });
            }
            
          );    
   
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

    isRecuperarModalOpen = false;

    openRecuperaModal(){
      this.isRecuperarModalOpen = true;
      this.recuperaUser();

    }

    closeRecuperaModal(){
      this.isRecuperarModalOpen = false;
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