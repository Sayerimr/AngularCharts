import { Component, EventEmitter, Input, output, Output } from '@angular/core';
import { environment } from '../environments/environment.development';
import axios from 'axios';
import { ChartComponent } from "../chart/chart.component";


@Component({
  selector: 'app-continents',
  templateUrl: './continents.component.html',
  styleUrl: './continents.component.css',
  imports: [ChartComponent]
})

export class ContinentsComponent {
  @Output() continentEmmiter: EventEmitter<string[]> = new EventEmitter<string[]>(); 

  continentsData: any[] = [];
  continents: any[] = [];

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

        const continentNames: string[] = [];
        const populationSums: number[] = [];

        // Iterate over the data to populate the arrays
        this.continentsData.forEach(element => {
          if (element.population && element.continents) {
            element.continents.forEach((continent: string) => {
              if (!continentNames.includes(continent)) {
                continentNames.push(continent);
                populationSums.push(element.population);
              } else {
                const index = continentNames.indexOf(continent);
                populationSums[index] += element.population;
              }
            });
          }
        });

        // Flatten the arrays to ensure they are not grouped
        this.continentChart = continentNames.flat();
        this.populationChart = populationSums.flat();

         // Emit the continent names to the parent component
        this.continentEmmiter.emit(this.continentChart);
        
        //console.log('Continent Names:', typeof this.continentChart);
       // console.log('Population Data:', ...this.populationChart);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }
}
