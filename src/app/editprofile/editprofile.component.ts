import { formatNumber } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { DataService } from '../data.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Product } from '../model/model';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css'],
})
export class EditprofileComponent implements OnInit {
  curr = formatNumber(100, this.locale, '2.1-5');
  statusUrl: string = '';
  subscriptions$!: Subscription;
  [x: string]: any;

  /* -------------------------------------------------------------------------- */
  /*                                  variable                                  */
  /* -------------------------------------------------------------------------- */

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
  // name: string = 'Nay';
  name1: any;
  count: number = 0;
  isShow: boolean = false;
  textHeader: string = 'เพิ่มข้อมูลสินค้า';
  textHead = 'รายการสินค้า';
  details = false;

  constructor(
    @Inject(LOCALE_ID) public locale: string,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService,
    private data: DataService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit(): void {}

  // ---- Add Document With Customer ID
  add(category?: any): void {
    const data: any = {
      Email: this.Email,
      Lastname: this.Lastname,
      Name: this.Name,
      Password: this.Password,
      Phone: this.Phone,
      position: this.position,
    };
    this.firestore
      .collection('profile')
      .doc(this.Email)
      .set(data)
      .then(() => {
        console.log(data);
        this.resetForm();
        this.isCheckEditMode = false;
        this.router.navigate(['/profile']);
        // alert('Data added successfully!');
      })
      .catch((error) => {
        alert(`Error adding data: ${error}`);
      });
  }
  resetForm(): void {
    this.Email = '';
    this.Name = '';
    this.Lastname = '';
    this.Password = '';
    this.Phone = '';
    this.position = '';
  }

  deleteProduct(product: Product) {
    if (
      window.confirm('Are you sure you want to delete' + product.Name + ' ?')
    ) {
      this.data.deleteProduct(product);
      location.reload();
    }
  }
  // save() {
  //   let url = 'save';
  //   if (this.statusUrl == 'edit') {
  //     url = 'edit';
  //   }

  //   this.subscriptions$ = this.http
  //     .post(
  //       'http://localhost:8080/baiwa-system-api/api/product-nay/' + url,
  //       this.form
  //     )
  //     .subscribe((response: any) => {
  //       console.log(response);
  //       if (response.status == 'SUCCESS') {
  //         alert(response.message);
  //         this.router.navigate(['/product']);
  //       } else {
  //       }
  //     });
  // console.log(typeof this.form)
  // }

  // deleteInfo(i: number) {
  //   this.ListData.splice(i, 1);
  // }

  // changeName(name: string) {
  //   this.name = name;
  // }

  // changHeader(goto: String): string {
  //   if (goto == 'add') {
  //     return 'เพิ่มรายการสินค้า';
  //   } else if (goto == 'edit') {
  //     return 'เเก้ไขรายระเอียด';
  //   } else {
  //     this.details = true;
  //   }
  //   return 'รายละเอียดสินค้า';
  // }

  // setText(data: string) {
  //   if (data == 'a') {
  //   }
  // }
  // countCal(num: string) {
  //   if (num == 'add') {
  //     this.count += 1;
  //   } else if (num == 'delete') {
  //     this.count -= 1;

  //     if (this.count < 0) {
  //       this.count = 0;
  //     }
  //   }
  // }

  // getById(id: number) {
  //   this.form.id = id;
  //   this.http
  //     .post(
  //       'http://localhost:8080/baiwa-system-api/api/product-nay/get-by-id',
  //       this.form
  //     )
  //     .subscribe((response: any) => {
  //       this.form = response.data;
  //     });
  // }
}
