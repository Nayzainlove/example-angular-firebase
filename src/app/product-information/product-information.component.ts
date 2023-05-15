import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DropdownModels } from './productstore/productstore.module';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-product-information',
  templateUrl: './product-information.component.html',
  styleUrls: ['./product-information.component.css'],
})
export class ProductInformationComponent implements OnInit {
  /* -------------------------------------------------------------------------- */
  /*                                 constructor                                */
  /* -------------------------------------------------------------------------- */
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private firestore: AngularFirestore
  ) {}
  /* -------------------------------------------------------------------------- */
  /*                                  functions                                  */
  /* -------------------------------------------------------------------------- */
  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }
  gotoProfile(add: string, id: number) {
    this.router.navigate(['/edit_profile'], {
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
  /* -------------------------------------------------------------------------- */
  /*                                 life circle                                */
  /* -------------------------------------------------------------------------- */
  ngOnInit(): void {
    this.GetAll2();
  }
  /* -------------------------------------------------------------------------- */
  /*                                  variable                                  */
  /* -------------------------------------------------------------------------- */
  data_user: any[] = [];
  _ID: any | null = '';
  amount: any | null = '';
  price: number = 0;
  priceall: number = 0;
  type: any | null = '';
  code: any | null = '';
  code_1: any | null = '';
  isCheckEditMode: boolean = false;
  isCheckValidator: boolean = false;
  _data: any = [];
  dropdownData = new FormControl('', [Validators.required]);

  Email: any | null = '';
  Lastname: any | null = '';
  Name: any | null = '';
  Password: any | null = '';
  Phone: any | null = '';
  position: any | null = '';
  id: any | null = '';

  /* -------------------------------------------------------------------------- */
  /*                                  functions                                 */
  /* -------------------------------------------------------------------------- */
  formatMoney(price: string) {
    var numberValue = Number(price);
    return numberValue.toFixed(2).replace(/\d(?=(\d{3})+.)/g, '$&,');
  }
  /* --------------------------------- // Get --------------------------------- */
  // ---- Get All Document

  GetAll(): void {
    this.firestore
      .collection('profile')
      .snapshotChanges()
      .subscribe((data) => {
        data.forEach((doc) => {
          const id = doc.payload.doc.id;
          const dataUser = doc.payload.doc.data();
          const data = { id, dataUser };
          this.data_user.push(data);
        });
      });
    console.log(this.data_user);
  }

  GetAll2(): void {
    this.firestore
      .collection('profile')
      .valueChanges()
      .subscribe((data) => {
        console.log(data);
        this.data_user = data;
      });
  }

  // data = DATA_TABLE;

  dropdown: DropdownModels[] = [
    { id: 1, value: 'ครอบครัว' },
    { id: 2, value: 'ความรู้สึก' },
    { id: 3, value: 'ตัวเลข' },
    { id: 4, value: 'ผลไม้' },
    { id: 5, value: 'ผัก' },
  ];
  Delete(item?: any): void {
    this.firestore
      .collection('profile')
      .doc(item.Email)
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

  pull(payload: any): void {
    console.log(payload);
    this.id = payload.Email;
    this.Name = payload.Name;
    this.Lastname = payload.Lastname;
    this.Email = payload.Email;
    this.Phone = payload.Phone;
    this.position = payload.position;
    this.Password = payload.Password;
  }

  edit(): void {
    this.firestore
      .collection('profile')
      .doc(this.id)
      .update({
        Name: this.Name,
        Lastname: this.Lastname,
        Email: this.Email,
        Phone: this.Phone,
        position: this.position,
        Password: this.Password,
      })
      .then(() => {
        location.reload();
      });
  }
  resetForm(): void {
    this.Name = '';
    this.Lastname = '';
    this.Phone = '';
    this.Email = '';
    this.position = '';
    this.Password = '';
  }
}
