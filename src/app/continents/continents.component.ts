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
  menuContinents : string[] = [];
  filterData: any[] = [];
  dataFormat: any[] = [];
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
            //If the continent doesnt exist en the array, push it with the population data
            if (!this.continentNames.includes(continent)) {
              this.continentNames.push(continent);
              this.populationSums.push(element.population);

              //If the continent already exist find the array position and sum the population data of the continent             
            } else {
              const index = this.continentNames.indexOf(continent);
              this.populationSums[index] += element.population;
            }
            //Saving the names of all the continents in a variable so I will never change with the filters
            this.menuContinents =this.continentNames;
          });
        });

        // If theres a population filter, filter data
        if (this.filterPopulation != 4747386228) {
          const filteredPopulationSums: number[] = [];
          const filteredContinentNames: string[] = [];

          this.populationSums.forEach((population, index) => {
            //If the filter number is smaller than the population data, add to the array
            if (population <= this.filterPopulation) {
              filteredPopulationSums.push(population);
              //Add only the contries with the filterd population (same position index)
              filteredContinentNames.push(this.continentNames[index]);
            }
          });

          //Upgrade data
          this.populationSums = filteredPopulationSums;
          this.continentNames = filteredContinentNames;
        }
        // Emit the continent names to the parent component (menu)
        this.continentEmmiter.emit(this.menuContinents);
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }
}
