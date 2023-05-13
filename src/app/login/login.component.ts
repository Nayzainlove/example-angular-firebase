import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {}

  login() {
    console.log(this.email, this.password);
    // this.auth.login(this.email, this.password);
    if (this.email == 'admin' && this.password == 'admin') {
      this.router.navigate(['/home']);
    } else if (this.email !== 'admin') {
      alert('email ไม่ถูกต้อง');
    } else if (this.password !== 'admin') {
      alert('password ไม่ถูกต้อง');
    } else {
      alert('ไม่พบผู้ใช้งาน');
    }
  }
}
