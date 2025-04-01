import { Component, EventEmitter, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, RouterLink, RouterLinkActive } from '@angular/router';
import { ContinentsComponent } from "../continents/continents.component";
import { CountriesComponent } from "../countries/countries.component";

@Component({
  selector: 'app-menu',
  imports: [ MatMenuModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CountriesComponent,
    ContinentsComponent,RouterModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  //Bringing continents data for navigation menu
  @Output() dataChanged = new EventEmitter<any>();

  continentNames: string[] = [];
  continentOption: string = "";
  filterData: number = 4747386228;
  value = 4747386228;
  filteredNumber: number = 0;
  rendered: boolean = false;
  hasChanged: boolean = false;

  // Get the names of the continents
  getContinetName(e: any) {
    this.continentNames = e;
  }

  //Clicking the nav menu to charge a continent data
  onClick(option: any) {
    this.continentOption = option;
    this.rendered = !this.rendered;
    //sending the selected continent to child countries
    this.dataChanged.emit(this.continentOption);
  }

  //filterin population
  onFilter(data: number) {
    this.hasChanged = false
    this.filterData = data;

    //detecting if theres a new filter petition
    if (this.filteredNumber != this.filterData) {
      this.hasChanged = true;
      this.filteredNumber = this.filterData;
    }
  }
}
