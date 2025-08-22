import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from "@angular/router";

@Component({
  selector: 'app-menubar',
  standalone: true,
  imports: [RouterOutlet,RouterLink],
  templateUrl: './menubar.component.html',
  styleUrl: './menubar.component.css'
})
export class MenubarComponent {



  constructor(private router:Router){

  }
onclick() {

 this.router.navigate(['/employee-list'])

}

onTask() {

  this.router.navigate(['/tasklist'])

}
}
