import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminLayoutComponent } from 'src/app/layouts/admin-layout/admin-layout.component';
import { AuthGuard } from 'src/app/guards/auth.guard';
// import { ContractorAsideLayoutComponent } from 'src/app/layouts/contractor-aside-layout/contractor-aside-layout.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'dashboard',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () =>
          import('./auth/auth.module').then((m) => m.AuthModule)
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'invoices',
        loadChildren: () =>
          import('./invoices/invoices.module').then((m) => m.InvoicesModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'contract',
        loadChildren: () =>
          import('./contract/contract.module').then((m) => m.ContractModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'contractor',
        loadChildren: () =>
          import('./contractor/contractor.module').then(
            (m) => m.ContractorModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: 'act',
        loadChildren: () => import('./act/act.module').then((m) => m.ActModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'rental-certificate',
        loadChildren: () =>
          import('./rental-certificate/rental-certificate.module').then(
            (m) => m.RentalCertificateModule
          ),
        canActivate: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./settings/settings.module').then((m) => m.SettingsModule),
        canActivate: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
