import { RouterModule, Routes } from '@angular/router';
import { ChartComponent } from './chart/chart.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
   
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })

  export class AppRoutingModule { }