import { Component, EventEmitter, Input, Output } from '@angular/core';
import { environment } from '../environments/environment.development';
import axios from 'axios';
import { ChartComponent } from "../chart/chart.component";

@Component({
  selector: 'app-countries',
  imports: [ChartComponent],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent {
  @Input() continentSelected: string = "";

  @Input() childData: any; refreshChildData() {
    this.childData.value = this.continentSelected;
  }
  countriesData: any[] = [];
  countryNames: string[] = [];
  countryPopulation: number[] = [];

  contriesChartNames: string[] = [];
  countriesChartPopulation: number[] = [];

  ngOnInit(): void {

    const apiUrl = environment.apiUrl;
    axios
      .get(apiUrl)
      .then((response) => {
        this.countriesData = response.data;

        this.countriesData.forEach(country => {
          //Select only the data from de continent selected
          if (country.continents == this.continentSelected) {
              this.countryNames.push(country.name.common);
              this.countryPopulation.push(country.population);
          }
        });
        this.contriesChartNames = this.countryNames
        this.countriesChartPopulation = this.countryPopulation
        console.log("Countries Name-> " +  this.contriesChartNames)
        console.log("Countries Pop-> " +  this.countriesChartPopulation)
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }

}


