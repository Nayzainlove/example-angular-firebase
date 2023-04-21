import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../model/model';
import { FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export interface MyDataProDuct {
  id: number;
  codee: string;
  typee: string;
  name: string;
  taste: string;
  price: number;
  amount: number;
}
@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css'],
})
export class ProductInformationComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private firestore: AngularFirestore
  ) {}
  /* -------------------------------------------------------------------------- */
  /*                                  variable                                  */
  /* -------------------------------------------------------------------------- */
  Name: any | null = '';
  _ID: any | null = '';
  amount: any | null = '';
  price: any | null = '';
  priceall: any | null = '';
  type: any | null = '';
  code: any | null = '';
  isCheckEditMode: boolean = false;
  isCheckValidator: boolean = false;

  _data: any = [];
  dropdownData = new FormControl('', [Validators.required]);

  ngOnInit(): void {
    this.GetAll();
    this._data.valueChanges;
  }
  GetAll(category?: any): void {
    this.firestore
      .collection('product(coffee)')
      .valueChanges()
      .subscribe((values) => {
        this._data = values;
        console.log(values);
        console.log(this._data);
      });
  }
  gotoProfile(add: string, id: number) {
    this.router.navigate(['/add_product'], {
      queryParams: {
        status: add,
        id: id,
      },
    });
  }
  textHeader: string = 'เพิ่มข้อมูลสินค้า';
  textHead = 'รายการสินค้า';
  details = false;
  list: any[] = [];
  [x: string]: any;
}
