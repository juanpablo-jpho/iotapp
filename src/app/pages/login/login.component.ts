import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  correo:number;
  password:string;

  constructor(private  authenticationService: AuthenticationService,
              private router:Router) {
      console.log("hola estoy en login");   
  }

  ngOnInit() {
      console.log('estoy en init login');  
  }

  openMenu() {
    console.log('estoyen open menu');
  }

  async login() {
    // const respuesta =  await this.authenticationService.login(this.correo,this.password);
    // console.log('esta es la respuesta ->', respuesta);
    // if (respuesta) {
    //     this.router.navigate(['/'])
    // }
  }





  

}
