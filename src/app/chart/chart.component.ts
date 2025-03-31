import { Component, Input, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import Chart, { ChartType } from 'chart.js/auto';

@Component({
  standalone: true,
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
  imports: [CommonModule]
})
export class ChartComponent implements OnInit {
  //Getting the data from continents and countries
  @Input() population: number[] = [];
  @Input() continents: string[] = [];

  isBrowser: boolean;
  public chart: Chart | undefined;

  //Solving a browser visualization problem
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    //Setting some time from data to charge
    setTimeout(() => {
      //Setting chart details and data
      const data = {
        labels: this.continents,
        datasets: [{
          label: 'Population',
          data: this.population,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 205, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(201, 203, 207, 0.2)'
          ],
          borderColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 159, 64)',
            'rgb(255, 205, 86)',
            'rgb(75, 192, 192)',
            'rgb(54, 162, 235)',
            'rgb(153, 102, 255)',
            'rgb(201, 203, 207)'
          ],
          borderWidth: 1
        }]
      };
      // Creating the chart
      this.chart = new Chart("chart", {
        type: 'bar' as ChartType, 
        data  
      })
    }, 300);
  }
}




