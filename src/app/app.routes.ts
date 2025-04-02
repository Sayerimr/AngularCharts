import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [  
  {
    path: '',
    component: MenuComponent,
    pathMatch: 'full',
  },
  {
    path: 'continents/:name',
    component: MenuComponent,
  },
  {
    path: '**',
    redirectTo: '', // Redirect to the default route
  },

];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }