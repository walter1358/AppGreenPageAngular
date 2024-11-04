import { Component , OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/login.servivio';


@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'app-ventas';
  userData: any;/** */
  nombre: string = '';/** */



  constructor(public authService: AuthService, private router: Router) {
  }

  userName: string | null = '';/** */
 

  ngOnInit(): void {/** */
    // Suscribirse a los cambios en userData$
    this.authService.userData$.subscribe(data => {
      this.userData = data; // Actualiza userData cuando cambia
    });/** */

  }

ngOnClear(){
}

  logout(): void {
    //if (typeof window !== 'undefined') {
      //sessionStorage.removeItem('userName'); // Elimina el nombre del usuario de localStorage
   // }
   this.userName = null; // Limpia el nombre de usuario

      this.router.navigate(['']); // Redirige al usuario a la página de login
  }



  
  onSubmit() {
    this.router.navigate(['/RegistroLibros']);
  }

  suSubmit() {
    this.router.navigate(['/RegistroSubasta']);
  }

  ofSubmit() {
    this.router.navigate(['/nuevaOferta']);
  }

  geSubmit() {
    this.router.navigate(['/GestionUsuario']);
  }

}
