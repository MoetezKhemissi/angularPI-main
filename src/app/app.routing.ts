import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './front/components/components.component';
import { LandingComponent } from './front/examples/landing/landing.component';
import { LoginComponent } from './front/examples/login/login.component';
import { ProfileComponent } from './front/examples/profile/profile.component';
import { NucleoiconsComponent } from './front/components/nucleoicons/nucleoicons.component';
import { ConsultationComponent } from './back/component/consultation/consultation.component';
import {ProfileConsultantComponent} from './front/examples/profileConsultant/profileConsultant.component'
import { BookConsultationComponent } from './front/examples/book-consultation/book-consultation.component';
import { bookConsultationComponent } from './front/examples/profileConsultant copy/bookConsultation';
import { DashboardComponent } from './back/dashboard/dashboard.component';
import { FullComponent } from './back/layouts/full/full.component';
import { ProjectComponent } from './front/components/project/project.component';
import { InvestesmentComponent } from './front/components/investesment/investesment.component';
import { ClaimComponent } from './front/components/claim/claim.component';
import { ClaimsComponent } from './back/component/claims/claims.component';
import { InvestesmentsComponent } from './back/component/investesments/investesments.component';
import { EvenementComponent } from './front/components/evenement/evenement.component';
import { ShowClaimComponent } from './front/components/show-claim/show-claim.component';
import { TabComponent } from './front/tab/tab.component';
import { AccountAssetsComponent } from './front/account-assets/account-assets.component';
import { AssetDetailsComponent } from './front/asset-details/asset-details.component';
import { AssetListComponent } from './front/asset-list/asset-list.component';
import { OrderListComponent } from './front/order-list/order-list.component';
import { TransactionListComponent } from './front/transaction-list/transaction-list.component';

const routes: Routes =[
    { path: 'index',                component: ComponentsComponent },
    { path: 'nucleoicons',          component: NucleoiconsComponent },
    { path: 'examples/landing',     component: LandingComponent },
    { path: 'examples/login',       component: LoginComponent },
    { path: 'examples/profile',     component: ProfileComponent },
    { path: 'consultation',         component: ConsultationComponent},
    { path: 'examples/profileConsultant',component: ProfileConsultantComponent},
    { path: 'examples/bookConsultation',component: BookConsultationComponent},
    { path: 'examples/book',component: bookConsultationComponent},
    { path: 'project',component: ProjectComponent},
    { path: 'investesment',component: InvestesmentComponent},
    { path: 'addclaim',component: ClaimComponent},
    { path: 'claims',component: ShowClaimComponent},
    { path: 'investesments',component: InvestesmentsComponent},
    { path: 'event',component: EvenementComponent},

    { path: 'tabs',component: TabComponent},
    { path: 'account-assets', component: AccountAssetsComponent },
    { path: 'asset-details/:id', component: AssetDetailsComponent },
    { path: 'asset-list', component: AssetListComponent },
    { path: 'order-list', component: OrderListComponent },
    { path: 'transaction-list', component: TransactionListComponent },


    
    
      {
    path: '',
    component: FullComponent,
    children: [
      { path: '', redirectTo: '/examples/landing', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./back/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'component',
        loadChildren: () => import('./back/component/component.module').then((m: { ComponentsModule: any; }) => m.ComponentsModule)
      }
    ]
  }
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule],
})
export class AppRoutingModule { }
