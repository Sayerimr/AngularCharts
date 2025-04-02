import { Component, EventEmitter, Injectable, Input, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Params, Router, RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { ContinentsComponent } from "../continents/continents.component";
import { CountriesComponent } from "../countries/countries.component";
import { inject } from '@angular/core';
import { of, Observable, switchMap, filter } from 'rxjs';
import { bootstrapApplication } from '@angular/platform-browser';
import { url } from 'node:inspector';
import e from 'express';


@Component({
  selector: 'app-menu',
  imports: [MatMenuModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSliderModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CountriesComponent,
    ContinentsComponent, RouterModule, RouterOutlet
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
@Injectable()
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
  countryName: string = '';


 // constructor(private route: ActivatedRoute, private router: Router) {}
 constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.countryName = params['name'] || '';
      this.continentOption = this.countryName;
      //this.getContinetName(this.continentNames);
    });
 }

 ngOnInit() {
   // Subscribe to the route parameters to get the 'name' parameter
   console.log('Country Name:', this.countryName);
   console.log('continentOption:', this.continentOption);
   console.log('this.continentNames:', this.continentNames);

 }

  // Get the names of the continents
  getContinetName(e: any) {
    this.continentNames = e;
    this.dataChanged.emit(this.continentNames);
    console.log('ENTRO' + e);
  }

  //Clicking the nav menu to charge a continent data
  onClick(option: any) {
    this.continentOption = option;
    this.rendered = !this.rendered;
    //sending the selected continent to child countries
    //this.dataChanged.emit(this.continentOption);
    //this.router.navigate(['/continents',  this.continentOption]);
  }

  //filtering population
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
