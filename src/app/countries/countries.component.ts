import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from '../environments/environment.development';
import axios from 'axios';
import { ChartComponent } from "../chart/chart.component";

@Component({
  selector: 'app-countries',
  imports: [ChartComponent],
  templateUrl: './countries.component.html',
  styleUrl: './countries.component.css'
})
export class CountriesComponent implements OnInit{
  @Input() continentSelected: string = "";
  @Input() childData: any; refreshChildData() {
    this.childData.value = this.continentSelected;
  }
  @Input() filterPopulation: number = 4747386228;

  countriesData: any[] = [];
  countryNames: string[] = [];
  countryPopulation: number[] = [];

  ngOnInit(): void {

    const apiUrl = environment.apiUrl;
    axios
      .get(apiUrl)
      .then((response) => {
        this.countriesData = response.data;

        this.countriesData.forEach(country => {
          // Select only the data from the continent selected
          if (country.continents == this.continentSelected) {
              this.countryNames.push(country.name.common);
              this.countryPopulation.push(country.population);
          }
        });
              // Filtrar los valores menores que filterPopulation
      if (this.filterPopulation != 4747386228) {
        const filteredPopulationSums: number[] = [];
        const filteredCoutriesNames: string[] = [];

        this.countryPopulation.forEach((population, index) => {
          if (population <= this.filterPopulation) {
            filteredPopulationSums.push(population);
            filteredCoutriesNames.push(this.countryNames[index]);
          }
        });

        // Actualizar los arrays con los valores filtrados
        this.countryPopulation = filteredPopulationSums;
        this.countryNames = filteredCoutriesNames;

        console.log('filtro->'+ this.filterPopulation);
        console.log('countryPopulation->'+ this.countryPopulation);
        console.log('countryNames->'+ this.countryNames);
      }
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }

}


