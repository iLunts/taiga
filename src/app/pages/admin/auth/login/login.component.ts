import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  constructor(
    private _auth: AuthService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {}

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
    if (this._auth.isLoggedIn) {
      this._router.navigate([environment.routing.admin.dashboard]);
    } else {
      this._auth.logout();
      this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
    }
  }

  async send(): Promise<any> {
    if (this.form.invalid) {
      return;
    }

    this._auth
      .signIn(this.f.email.value, this.f.password.value)
      .then((response) => {
        if (response.user) {
          this._auth.setUserData(response.user);
          // this._router.navigate([environment.routing.admin.dashboard]);
          this._router.navigateByUrl(this.returnUrl);
        }
      });
  }
}
