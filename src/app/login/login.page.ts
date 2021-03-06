import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss']
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth, 
    public router: Router,
  ) {
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(user =>
      {
        if (user)
        {
          localStorage.setItem('user', JSON.stringify(user));
          this.router.navigateByUrl('');
        }
        else 
        {
          localStorage.setItem('user', null);
        }
      });

  }

  login(){
    this.afAuth.signInWithEmailAndPassword(this.email, this.password).then((data) => {
      this.router.navigateByUrl('actu')
    }, (err) => {
      alert(err);
    })
  }

}
