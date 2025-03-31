import { Component, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';
import { ContinentsComponent } from "../continents/continents.component";
import { MatButtonModule } from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSliderModule} from '@angular/material/slider';
import { CountriesComponent } from "../countries/countries.component";
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@Component({
  selector: 'app-menu',
  imports: [MatMenuModule,
    ContinentsComponent,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSliderModule, 
    FormsModule,
    CountriesComponent,
    MatFormFieldModule, MatInputModule,],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Output() dataChanged = new EventEmitter<any>(); 
  
  continentNames: string[] = [];
  continentOption: string = "";
  rendered: boolean = false;
  filterData : number = 0;
  filterEvent : number = 0;
  value = 4747386228;

  getContinetName(e: any){
    this.continentNames = e;
  }

  onClick(option: any){
    this.continentOption = option;
    this.rendered = !this.rendered;
    this.dataChanged.emit( this.continentOption); 

  }

  onFilter(data : number){
    this.filterData = data;
    console.log("FILTRANDO" + this.filterData)

  }


 
}
