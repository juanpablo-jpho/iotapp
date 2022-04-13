import { Component, OnInit } from "@angular/core";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  constructor() {
      console.log("hola estoy en login");   
  }

  ngOnInit() {
      console.log('estoy en init login');  
  }

  openMenu() {
    console.log('estoyen open menu');
  }



  

}
