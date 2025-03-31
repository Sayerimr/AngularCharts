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
  @Input() filterPopulation: number = 4747386228;

  continentsData: any[] = [];
  continentNames: string[] = [];
  populationSums: number[] = [];
  filterData :any[] = [];
  dataFormat:any[] = [];
  constructor() { }


  ngOnInit(): void {
    //Get the data from the API
    const apiUrl = environment.apiUrl;
    axios
      .get(apiUrl)
      .then((response) => {
        this.continentsData = response.data;
        // Iterate over the data 
        this.continentsData.forEach(element => {
          element.continents.forEach((continent: string) => {
            //If continent doesnt exist en the array, push it with the population data
            if (!this.continentNames.includes(continent)) {
              this.continentNames.push(continent);
              this.populationSums.push(element.population);
              
              //If the continent already exsit find the array position and sum the population data
              
            } else {
              const index = this.continentNames.indexOf(continent);
              this.populationSums[index] += element.population;
            }

          });
        });
  
      // Filtrar los valores menores que filterPopulation
      if (this.filterPopulation != 4747386228) {
        const filteredPopulationSums: number[] = [];
        const filteredContinentNames: string[] = [];

        this.populationSums.forEach((population, index) => {
          if (population <= this.filterPopulation) {
            filteredPopulationSums.push(population);
            filteredContinentNames.push(this.continentNames[index]);
          }
        });

        // Actualizar los arrays con los valores filtrados
        this.populationSums = filteredPopulationSums;
        this.continentNames = filteredContinentNames;
      }
        // Emit the continent names to the parent component (menu)
        this.continentEmmiter.emit(this.continentNames);

       
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }
}
