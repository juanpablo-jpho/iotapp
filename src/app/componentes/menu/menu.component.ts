import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInfoI } from 'src/app/models';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FirestoreService } from 'src/app/services/firestore.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  isAdmin:boolean = false;
  rol: 'empresa' | 'usuario' = 'usuario';
  suscriberUserInfo: Subscription;

  constructor(private  authenticationService:  AuthenticationService,
              private firestoreService: FirestoreService) { 

        this.authenticationService.authstate().subscribe( res => {
            console.log('res -> ',res);
            if (this.suscriberUserInfo ) {
              this.suscriberUserInfo.unsubscribe(); 
            }
            if (res) {
                this.isAdmin = res.uid === environment.uidAdmin ? true : false;
                this.getRol(res.uid);
            } else {
              this.isAdmin = false;
              this.rol = 'usuario'
            }
        })

  }

  ngOnInit() {}



  salir() {
    this.authenticationService.logout();
  }

  getRol(uid: string) {
      const path = 'Usuarios/';
      this. suscriberUserInfo = this.firestoreService.getDocumentId<UserInfoI>(path, uid).subscribe( res => {
            console.log('datos user: ', res);
            if (res.rol) {
              this.rol = res.rol;
            } else {
              this.rol = 'usuario'
            }
      })
  }

}
