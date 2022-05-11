import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  constructor(private  authenticationService:  AuthenticationService) { }

  ngOnInit() {}

  salir() {
    this.authenticationService.logout();
  }

}
