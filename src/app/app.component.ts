import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/login.servivio';

@Component({
  selector: 'app-root', 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'app-ventas';

  constructor(public authService: AuthService, private router: Router) {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
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

}
