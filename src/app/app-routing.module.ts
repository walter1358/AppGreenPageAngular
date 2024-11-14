import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudLibrosComponent } from './components/RegistroLibro/crudRegistro.component';
import { Libro2Component } from './components/RegistroSubasta/libro2.component';
import { PagLoginComponent } from './components/Login/login.component';
import { OfertaComponent } from './components/Oferta/oferta.component';
import { LibrosService } from './services/libros.service';
//import { ComponentsComponent } from './GestionUsuarios/components/components.component';

import { ComponentsComponent } from './GestionUsuarios/components/components.component';



const routes: Routes = [
//  { path: 'RegistroLibros', component: CrudLibrosComponent },
 // { path: 'RegistroSubasta', component: Libro2Component },
 // { path: 'IngresoLogin', redirectTo: '/login', pathMatch: 'full' },
    
  {
    path: '',
    component: PagLoginComponent,
    children: []
  },

   {
     path: 'RegistroLibros',component: CrudLibrosComponent, canActivate: [LibrosService],children: [] },

   {
     path: 'RegistroSubasta',
     component: Libro2Component,
     canActivate: [LibrosService],
     children: []
   },

   {
    path: 'GestionUsuario',
    component: ComponentsComponent,
    canActivate: [LibrosService],
    children: []
  },

 {
     path: 'IngresoLogin',
     component: PagLoginComponent,
     canActivate: [LibrosService],
     children: []
   }
  ,
  {
    path: 'nuevaOferta',
    component: OfertaComponent,
    canActivate: [LibrosService],
    children: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
