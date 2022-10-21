import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { TaigaModule } from 'src/app/shared/taiga.module';
import { TuiLinkModule } from '@taiga-ui/core';

@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    SharedModule,
    // TaigaModule,
    TuiLinkModule
  ]
})
export class AuthModule {}
