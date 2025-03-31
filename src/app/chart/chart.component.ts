import { Component, Input, Inject, PLATFORM_ID, input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartData } from 'chart.js';
import { CommonModule, isPlatformBrowser } from '@angular/common';


import Chart, { ChartType } from 'chart.js/auto';
import { subscribe } from 'diagnostics_channel';

@Component({
  standalone: true,
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
  imports: [CommonModule]
})
export class ChartComponent  implements OnInit{
  @Input() population: number[] = [];
  @Input() continents: string[] = [];

  isBrowser: boolean;
  public chart: Chart | undefined;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    setTimeout(() => {
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
          // Creamos la gráfica
    this.chart = new Chart("chart", {
      type: 'bar' as ChartType, // tipo de la gráfica 
      data // datos 
    })
      // And any other code that should run only after 5s
    }, 300);
    // datos

    


  }
}




