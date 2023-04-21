import { Subscription } from 'rxjs';
import { DatePipe, DecimalPipe, formatNumber } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import {
  Component,
  HostBinding,
  HostListener,
  Inject,
  Input,
  LOCALE_ID,
  OnInit,
} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DropdownModels } from './store/store.module';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private firestore: AngularFirestore
  ) {}

  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }
  gotoProfile(add: string, id: number) {
    this.router.navigate(['/edit_product'], {
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

  ngOnInit() {
    this.GetAll();
    this._data.valueChanges;
    console.log(this._data);
  }
  /* -------------------------------------------------------------------------- */
  /*                                  variable                                  */
  /* -------------------------------------------------------------------------- */
  Name: any | null = '';
  _ID: any | null = '';
  amount: any | null = '';
  price: number = 0;
  priceall: number = 0;
  type: any | null = '';
  code: any | null = '';
  isCheckEditMode: boolean = false;
  isCheckValidator: boolean = false;
  _data: any = [];
  dropdownData = new FormControl('', [Validators.required]);

  /* -------------------------------------------------------------------------- */
  /*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  formatMoney(price: string) {
    var numberValue = Number(price);
    return numberValue.toFixed(2).replace(/\d(?=(\d{3})+.)/g, '$&,');
  }
  /* --------------------------------- // Get --------------------------------- */
  // ---- Get All Document

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

  /* -------------------------------------------------------------------------- */
  /*                                    Fake                                    */
  /* -------------------------------------------------------------------------- */
  // data = DATA_TABLE;

  dropdown: DropdownModels[] = [
    { id: 1, value: 'ครอบครัว' },
    { id: 2, value: 'ความรู้สึก' },
    { id: 3, value: 'ตัวเลข' },
    { id: 4, value: 'ผลไม้' },
    { id: 5, value: 'ผัก' },
  ];
  /* -------------------------------------------------------------------------- */
  /*                                   functions Delete                                    */
  /* -------------------------------------------------------------------------- */
  Delete(item?: any, category?: any): void {
    this.firestore
      .collection('product(coffee)')
      .doc(item._ID)
      .delete()
      .then(() => {
        this.resetForm();
        this.isCheckEditMode = false;
        // alert('Data delete successfully!');
      })
      .catch((error) => {
        alert(`Error adding data: ${error}`);
      });
  }
  /* -------------------------------------------------------------------------- */
  /*                                  functions  search                                    */
  /* -------------------------------------------------------------------------- */
  search(item: any, category?: any): void {
    this.firestore
      .collection('product(coffee)')
      .doc(this._ID)
      .get()
      .subscribe((res) => {
        if (res.exists) {
          this.Name = item.Name;
          this.amount = item.amount;
          this.price = item.price;
          this.priceall = item.priceall;
          this.type = item.type;
          this.code = item.code;
          this._ID = item._ID;
        }
      });
  }
  /* -------------------------------------------------------------------------- */
  /*                                 functions   edit                                    */
  /* -------------------------------------------------------------------------- */
  edit(category?: any): void {
    const data: any = {
      Name: this.Name,
      amount: this.amount,
      price: this.price,
      priceall: this.priceall,
      code: this.code,
      type: this.type,
      _ID: this._ID,
    };
    this.firestore
      .collection('product(coffee)')
      .doc(this._ID)
      .set(data)
      .then(() => {
        console.log(data);
        this.resetForm();
        this.isCheckEditMode = false;
        this.router.navigate(['/product']);
        // alert('Data added successfully!');
      })
      .catch((error) => {
        alert(`Error adding data: ${error}`);
      });
  }
  resetForm(): void {
    this.Name = '';
    this._ID = '';
    this.amount = '';
    this.price = 0;
    this.priceall = 0;
    this.code = '';
    this.type = '';
  }
  /* -------------------------------------------------------------------------- */
  /*                                  functions  pull                           */
  /* -------------------------------------------------------------------------- */
  pull(item: any, category?: any): void {
    this.firestore
      .collection('product(coffee)')
      .doc(item._ID)
      .get()
      .subscribe((res) => {
        if (res.exists) {
          this.Name = item.Name;
          this.amount = item.amount;
          this.price = item.price;
          this.priceall = item.priceall;
          this.type = item.type;
          this.code = item.code;
          this._ID = item._ID;
        }
      });
  }
  /* -------------------------------------------------------------------------- */
  /*                               // Search Data                               */
  /* -------------------------------------------------------------------------- */
  // ---- Search Fields inside a Document
  Search(category?: any): void {
    if (this._ID === '') {
      return this.GetAll(category);
    }
    this.firestore
      .collection('product(coffee)')
      .doc(this._ID)
      .valueChanges()
      .subscribe((res) => {
        if (res === undefined) {
          alert('ไม่พบข้อมูล');
          return;
        }
        this._data = [res];
        this.resetForm();
      });
  }
}
