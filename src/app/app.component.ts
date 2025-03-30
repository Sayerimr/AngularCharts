import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from "./menu/menu.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [CommonModule, MenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  constructor() {}

  ngOnInit() {

  }

}
