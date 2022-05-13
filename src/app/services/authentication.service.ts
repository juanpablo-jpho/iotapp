import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserInfoI } from '../models';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(public auth: AngularFireAuth) { }

  login(correo:string, password:string) {
    return this.auth.signInWithEmailAndPassword(correo, password)
  }

  registrarUser(user:UserInfoI) {
    return  this.auth.createUserWithEmailAndPassword(user.correo,user.password)
  }

  authstate() {
    return  this.auth.authState
  }


  async logout() {
  await  this.auth.signOut();
  }

}
