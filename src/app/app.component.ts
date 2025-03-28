import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ContinentsComponent } from "./continents/continents.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule,ContinentsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor() {}

  ngOnInit() {

  }

}
