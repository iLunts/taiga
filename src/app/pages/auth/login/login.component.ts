import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) { }

  get f(): any {
    return this.form.controls;
  }

  ngOnInit(): void {
  }

  async send(): Promise<any>{
    if (this.form.invalid) {
      return;
    }

    this._auth.signIn(this.f.email.value, this.f.password.value).then((response) => {
      if (response.user) {
        this._auth.setUserData(response.user);
        // this._router.navigate([environment.startPageAfterLogin], {
        //   replaceUrl: true,
        // });

        // TODO: Check if email not verified
        // if (!res.user.emailVerified) {
        //   this._auth.SendVerificationMail().then((res: any) => {});
        // }
      }
    });
  }
}
