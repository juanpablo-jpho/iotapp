import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  saveDoc(path: string, id: string, data:any) {
    return this.firestore.collection(path).doc(id).set(data);
  }


}
