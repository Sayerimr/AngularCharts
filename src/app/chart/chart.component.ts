import { Component, Input, Inject, PLATFORM_ID, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartOptions, ChartData } from 'chart.js';
import { CommonModule, isPlatformBrowser } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.css',
  imports: [BaseChartDirective, CommonModule]
})
export class ChartComponent {
  @Input() population: number[] = [];
  @Input() continents: string[] = [];


  isBrowser: boolean;

  public charOptions: ChartOptions = {
    responsive: true,
  }

  public charData: ChartData<'bar'> = {
    labels: this.continents,
    datasets: [
      {
        data: this.population,
        label: 'Population',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }
    ]
  }

  public charType: 'bar' = 'bar';

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  
  ngOnInit(): void {
    this.continents.forEach(element => {
      console.log("Chart Data:", element);
    });

  }
}

