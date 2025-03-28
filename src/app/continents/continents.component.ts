import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { environment } from '../environments/environment.development';
import axios from 'axios';
import { ChartComponent } from "../chart/chart.component";
import { MenuComponent } from "../menu/menu.component";


@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrl: './continents.component.css',
  imports: [ChartComponent, MenuComponent]
})

export class ContinentsComponent {
  continentsData: any[] = [];
  continents: any[] = [];
  population: any[] = [];

  populationChart: number[] = [];
  continentChart: string[] = [];
  constructor() { }
  

  ngOnInit(): void {
    //Get the data from the API
    const apiUrl = environment.apiUrl;
    axios
      .get(apiUrl)
      .then((response) => {
        this.continentsData = response.data;
        const populationContinents: { [key: number]: string[] } = {};
        const continentPopulationMap: { [key: string]: number } = {};

        //Object itineration to get the continents
        this.continentsData.forEach(element => {
          //Check if the element has continents and population
          if (element.population && element.continents) {
            element.continents.forEach((continent: string) => {
              //If the element doesn't exist in the array dont sum
              if (!continentPopulationMap[continent]) {
                continentPopulationMap[continent] = 0;
              }
              //Sum the population to each continent
              continentPopulationMap[continent] += element.population;
            });
          }
        });
        const continentName = Object.keys(continentPopulationMap);
        const continentData = Object.values(continentPopulationMap);
        continentName.forEach(element => {    
          this.continents.push(element);
        });
        continentData.forEach(element => {    
          this.population.push(element);
        });
        
        //this.continentChart = this.continents;
        //this.populationChart = this.population;

       console.log('Continent data:', this.continents);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }
}
