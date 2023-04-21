import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private fireauth: AngularFireAuth, private router: Router) {}

  //login metgod
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        localStorage.setItem('token', 'true');
        this.router.navigate(['dashboard']);
      },
      (err) => {
        alert(err.massage);
        this.router.navigate(['/login']);
      }
    );
  }

  //register method
  register(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(
      () => {
        alert('Registeation Successful');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.massage);
        this.router.navigate(['/register']);
      }
    );
  }

  //sign out
  logout() {
    this.fireauth.signOut().then(
      () => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      },
      (err) => {
        alert(err.massage);
        this.router.navigate(['/register']);
      }
    );
  }
}
