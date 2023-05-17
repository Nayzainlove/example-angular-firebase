import { DataService } from './../data.service';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, async } from 'rxjs';
import { AuthService } from '../auth.service';
import { Product } from '../model/model';
import { FormControl, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { formatNumber } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  curr = formatNumber(100, this.locale, '2.1-5');
  statusUrl: string = '';
  subscriptions$!: Subscription;
  [x: string]: any;

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
  code_1: any | null = '';
  isCheckEditMode: boolean = false;
  isCheckValidator: boolean = false;

  _data: any = [];
  dropdownData = new FormControl('', [Validators.required]);

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

  // add(category?: any): void {
  //   const data: any = {
  //     Name: this.Name,
  //     amount: this.amount,
  //     price: this.price,
  //     priceall: this.priceall,
  //     code: this.code,
  //     code_1: this.code,
  //     type: this.type,
  //     _ID: this._ID,
  //   };
  //   this.firestore
  //     .collection('product(coffee)')
  //     .doc(this._ID)
  //     .set(data)
  //     .then(() => {
  //       console.log(data);
  //       this.resetForm();
  //       this.isCheckEditMode = false;
  //       this.router.navigate(['/product']);
  //       // alert('Data added successfully!');
  //     })
  //     .catch((error) => {
  //       alert(`Error adding data: ${error}`);
  //     });
  // }
  add(category?: any): void {
    Swal.fire({
      title: 'คุณเเน่ใจที่จะเพิ่มหรือไม่ ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ตกลง',
      cancelButtonText: 'ยกเลิก',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        const data: any = {
          Name: this.Name,
          amount: this.amount,
          price: this.price,
          priceall: this.priceall,
          code: this.code,
          code_1: this.code,
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
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        Swal.fire('ยกเลิก');
      }
    });
  }
  resetForm(): void {
    this.Name = '';
    this._ID = '';
    this.amount = '';
    this.price = 0;
    this.priceall = 0;
    this.code = '';
    this.code_1 = '';
    this.type = '';
  }

  deleteProduct(product: Product) {
    if (
      window.confirm('Are you sure you want to delete' + product.Name + ' ?')
    ) {
      this.data.deleteProduct(product);
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
