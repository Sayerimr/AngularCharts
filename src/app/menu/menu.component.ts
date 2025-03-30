import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { ContinentsComponent } from "../continents/continents.component";
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { CountriesComponent } from "../countries/countries.component";


@Component({
  selector: 'app-menu',
  imports: [MatMenuModule, ContinentsComponent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule, CountriesComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  @Output() dataChanged = new EventEmitter<any>(); 
  continentNames: string[] = [];
  continentOption: string = "";
  selectedItem: string= "";
  rendered: boolean = false;


  getContinetName(e: any){
    this.continentNames = e;
  }

  onClick(option: any){
    this.continentOption = option;
    this.rendered = !this.rendered;
    this.dataChanged.emit( this.continentOption); 

  }


 
}
