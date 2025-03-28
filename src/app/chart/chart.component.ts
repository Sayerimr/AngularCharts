import { Component, Input } from '@angular/core';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css'
})
export class ChartComponent {
  @Input() population : number[] = [];
  @Input() continents: string[] = [];

  chart: any = [];
  constructor() { }

  ngOnInit(): void {
    console.log("conti"+ this.continents);
    this.continents.forEach(element => {
      console.log("data"+ element);
    });
  

    // Initialize the chart 
    this.chart = new Chart('canvas', {
      type: 'bar',
      data: {
        labels: this.continents,
        datasets: [
          {
            label: 'Population',
            data: this.population,
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
  }
}
