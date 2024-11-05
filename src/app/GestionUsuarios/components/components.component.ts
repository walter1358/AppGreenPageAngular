import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-components',
  templateUrl: './components.component.html',
  styleUrl: './components.component.css'
})
export class ComponentsComponent {
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    profile: ''
  };

  onSubmit(form: NgForm) {
    if (form.valid) {
      console.log('Formulario válido:', this.user);
      // Aquí puedes agregar el código para enviar los datos al backend.
    } else {
      console.log('Formulario no válido');
    }
  }
}

