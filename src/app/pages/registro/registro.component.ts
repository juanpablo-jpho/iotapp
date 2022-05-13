import { Component, OnInit } from '@angular/core';
import { UserInfoI } from 'src/app/models';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss'],
})
export class RegistroComponent implements OnInit {


  newUser: UserInfoI = {
    correo:null,
    password:null,
    nombre:null,
    telefono:null,
    uid:null,
    rol: 'empresa'
  };

  repassword:string = null;

  constructor(private authenticationService:AuthenticationService,
              private firestoreService: FirestoreService) { }

  ngOnInit() {}

  async registrarse() {
     if (this.newUser.password != this.repassword) {
       console.log('passwords no coinciden');  
       return;
     }
     const res = await  this.authenticationService.registrarUser(this.newUser);
     console.log('res -> ',res);
     if (res) {
       
        const path = 'Usuarios';
        const id =  res.user.uid;
        this.newUser.uid = id;
        this.firestoreService.saveDoc(path, id,this.newUser)
        // guardar en la base de datos
     }
     
  }

}
