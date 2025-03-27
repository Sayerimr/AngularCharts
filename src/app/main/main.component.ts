import { Component } from '@angular/core';
import { ContinentsComponent } from "../continents/continents.component";

@Component({
  selector: 'app-main',
  imports: [ContinentsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
