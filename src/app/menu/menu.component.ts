import { Component, EventEmitter, Injectable, Output } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ContinentsComponent } from "../continents/continents.component";
import { CountriesComponent } from "../countries/countries.component";

@Component({
  selector: 'app-menu',
  imports: [MatMenuModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
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
  countryUrl: string = '';

  //Routing to get the url params
  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.params.subscribe((params) => {
      this.countryUrl = params['name'] || '';
      this.continentOption = this.countryUrl;
    });
  }

  // Get the names of the continents for the menu
  getContinentName(e: any) {
    this.continentNames = e;
    this.dataChanged.emit(this.continentNames);
  }

  //Clicking the nav menu to charge a continent data
  onClick(option: any) {
    this.continentOption = option;
    this.rendered = !this.rendered;
    //Routing to the url
    this.router.navigate(['/continents', option]);
  }

  //filtering population
  onFilter(data: number) {
    this.hasChanged = false
    this.filterData = data;
    //Forcing to charge component again to load data
    this.rendered = !this.rendered;
  }

}
