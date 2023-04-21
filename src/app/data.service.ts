import {
  AngularFirestore,
  AngularFirestoreModule,
} from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { Product } from './model/model';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  getAllproduct: any;
  constructor(private afs: AngularFirestore) {}

  // add
  addProduct(product: Product) {
    product.id = this.afs.createId();
    return this.afs.collection('/product').add(product);
  }
  // getAll
  getAllProduct(product: Product) {
    return this.afs.collection('/product').snapshotChanges;
  }
  // delete
  deleteProduct(product: Product) {
    return this.afs.doc('/product/' + product.id).delete();
  }
  // update
  updateProduct(product: Product) {
    this.deleteProduct;
    this.addProduct;
  }
}
