import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './back/layouts/full/full.component';


import { NavigationComponent } from './back/shared/header/navigation.component';
import { SidebarComponent } from './back/shared/sidebar/sidebar.component';

import { AppComponent } from './app.component';
import { SpinnerComponent } from './back/shared/spinner.component';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

import { NavbarComponent } from 'app/front/shared/navbar/navbar.component';
import { ConsultationComponent } from './back/component/consultation/consultation.component';

import { AppRoutingModule } from 'app/app.routing';
import { ComponentsModule } from 'app/front/components/components.module';
import { ExamplesModule } from 'app/front/examples/examples.module';

/* Transactions orders imports */
import { OrderbookComponent } from './front/orderbook/orderbook.component';
import { OrderComponent } from './front/order/order.component';
import { ErrorDialogComponent } from './front/error-dialog/error-dialog.component';

import { AccountAssetsComponent } from './front/account-assets/account-assets.component';

import { TransactionListComponent } from './front/transaction-list/transaction-list.component';
import { OrderListComponent } from './front/order-list/order-list.component';
import { AssetListComponent } from './front/asset-list/asset-list.component';
import { AssetDetailsComponent } from './front/asset-details/asset-details.component';
import { TabComponent } from './front/tab/tab.component';
import { TransactionStatsChartComponent } from './front/transaction-chart/transaction-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

/*--------------------------- */

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    FullComponent,
    NavigationComponent,
    SidebarComponent,
    NavbarComponent,
    ConsultationComponent,
    OrderbookComponent,
    OrderComponent,
    ErrorDialogComponent,
    AccountAssetsComponent,
    TabComponent,
    TransactionListComponent,
         OrderListComponent,
         AssetListComponent,
         NavbarComponent,
         AssetDetailsComponent,
         TransactionStatsChartComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ComponentsModule,
    ExamplesModule,
    NgxChartsModule
  ],
  exports: [  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
