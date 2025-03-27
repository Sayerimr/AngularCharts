import { Component } from '@angular/core';
import { environment } from '../environments/environment.development';
import axios from 'axios';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-continents',
  imports: [],
  templateUrl: './continents.component.html',
  styleUrl: './continents.component.css'
})

export class ContinentsComponent {
  continents: any[] = [];
  chart: any = [];
  arrayContinent: any[] = [];
  uniqueContinents: Set<string> = new Set();
  constructor() { }

  ngOnInit(): void {
    //Get the data from the API
    const apiUrl = environment.apiUrl;
    axios
      .get(apiUrl)
      .then((response) => {
        this.continents = response.data;
        const populationContinents: { [key: number]: string[] } = {};
        const continentPopulationMap: { [key: string]: number } = {};

        //Object itineration to get the continents
        this.continents.forEach(element => {
          //Check if the element has continents and population
          if (element.population && element.continents) {
            element.continents.forEach((continent: string) => {
              //Add the population to the continentPopulationMap
              if (!continentPopulationMap[continent]) {
                continentPopulationMap[continent] = 0;
              }
              continentPopulationMap[continent] += element.population;
            });
          }
        });

        // Transform the continentPopulationMap into the desired format
        Object.entries(continentPopulationMap).forEach(([continent, population]) => {
          if (!populationContinents[population]) {
            populationContinents[population] = [];
          }
          populationContinents[population].push(continent);
        });
        //Save the data so it can be used in the chart
        const FinalPopulation = Object.keys(populationContinents);
        const FinalContinents = Object.values(populationContinents);

        // Initialize the chart after data is ready
        this.chart = new Chart('canvas', {
          type: 'bar',
          data: {
            labels: FinalContinents,
            datasets: [
              {
                label: 'Population',
                data: FinalPopulation,
                borderWidth: 1,
              },
            ],
          },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    })
    .catch((error) => {
      console.error('Error fetching countries:', error);
    });
  }
}
