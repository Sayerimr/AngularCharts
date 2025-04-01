import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ContinentsComponent } from './continents/continents.component';
import { CountriesComponent } from './countries/countries.component';
import { MenuComponent } from './menu/menu.component';

export const routes: Routes = [
  
//   {path: '',
//    component: MenuComponent,
//    children: [
//     {
//       path: 'continents', // child route path
//       component: ContinentsComponent, // child route component that the router renders
//     },
//     {
//       path: 'countries',
//       component: CountriesComponent, // another child route component that the router renders
//     },
//   ],
// }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }