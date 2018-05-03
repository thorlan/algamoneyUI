import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard/dashboard.component';


@NgModule({
  imports: [
    CommonModule,

    ChartModule,
    PanelModule,
    DashboardRoutingModule,
    SharedModule
  ],
  declarations: [DashboardComponent],
  providers: [DecimalPipe]
})
export class DashboardModule { }
