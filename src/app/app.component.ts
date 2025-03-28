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
  continentsData: any[] = [];
  filteredData: any[] = [];
  constructor() {}

  ngOnInit() {
   
  }

  onFilterChange(event: Event, filterType: string) {
    console.log("Component" + this.continentsData);
  }

  onDataReceived(data: any[]) {
    this.continentsData = data;
    this.filteredData = data; // Initialize with all data
  }
}
