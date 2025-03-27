import { Component } from '@angular/core';
import { ContinentsComponent } from "./continents/continents.component";


@Component({
  selector: 'app-root',
  imports: [ContinentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Technical-Assessment';
  chart: any = [];
  constructor() {}

  ngOnInit() {
    // this.chart = new Chart('canvas', {
    //   type: 'bar',
    //   data: {
    //     labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    //     datasets: [
    //       {
    //         label: '# of Votes',
    //         data: [12, 19, 3, 5, 2, 3],
    //         borderWidth: 1,
    //       },
    //     ],
    //   },
    //   options: {
    //     scales: {
    //       y: {
    //         beginAtZero: true,
    //       },
    //     },
    //   },
    // });
   }
}
