import { Component, Input, OnInit } from '@angular/core';
import { countriesAll, environment } from '../environments/environment.development';
import { ChartComponent } from "../chart/chart.component";
import axios from 'axios';

@Component({
  selector: 'app-countries',
  imports: [ChartComponent],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit {
  // Getting the continent selected in the nav menu
  @Input() continentSelected: string = "";
  @Input() childData: any; refreshChildData() {
    this.childData.value = this.continentSelected;
  }
  // Getting the population filtered
  @Input() filterPopulation: number = 4747386228;

  countriesData: any[] = [];
  countryNames: string[] = [];
  countryPopulation: number[] = [];

  ngOnInit(): void {
    //Get the data from the API
    const apiUrl = countriesAll.apiUrl;
    axios
      .get(apiUrl)
      .then((response) => {
        this.countriesData = response.data;
        // Iterate over the data 
        this.countriesData.forEach(country => {
          // Add only the data from the continent selected
          if (country.continents == this.continentSelected) {
            this.countryNames.push(country.name.common);
            this.countryPopulation.push(country.population);
          }
        });
        // If theres a population filter, filter data
        if (this.filterPopulation != 4747386228) {
          const filteredPopulationSums: number[] = [];
          const filteredCoutriesNames: string[] = [];

          this.countryPopulation.forEach((population, index) => {
            //If the filter number is smaller than the population data, add to the array
            if (population <= this.filterPopulation) {
              filteredPopulationSums.push(population);
              //Add only the contries with the filterd population (same position index)
              filteredCoutriesNames.push(this.countryNames[index]);
            }
          });

          //Upgrade data
          this.countryPopulation = filteredPopulationSums;
          this.countryNames = filteredCoutriesNames;
        }
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }

}


