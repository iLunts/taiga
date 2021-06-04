import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { HomeComponent } from './pages/default/home/home.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((m) => m.AdminModule)
  },
  {
    path: '',
    loadChildren: () =>
      import('./pages/default/default.module').then((m) => m.DefaultModule)
  },
  // {
  //   path: 'auth',
  //   loadChildren: () =>
  //     import('./pages/admin/auth/auth.module').then((m) => m.AuthModule),
  // },
  // {
  //   path: 'home',
  //   loadChildren: () =>
  //     import('./pages/home/home.module').then((m) => m.HomeModule),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'invoices',
  //   loadChildren: () =>
  //     import('./pages/invoices/invoices.module').then((m) => m.InvoicesModule),
  //   canActivate: [AuthGuard],
  // },
  // {
  //   path: 'settings',
  //   loadChildren: () =>
  //     import('./pages/settings/settings.module').then((m) => m.SettingsModule),
  //   canActivate: [AuthGuard],
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
