import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AgGridModule } from 'ag-grid-angular';
import { GridModule } from '@progress/kendo-angular-grid';

import { WjGridModule } from '@grapecity/wijmo.angular2.grid';

import { IgxNavigationDrawerModule, IgxNavbarModule, IgxLayoutModule,
        IgxRippleModule, IgxGridModule, IgxDropDownModule, IgxExcelExporterService } from 'igniteui-angular';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ResultsComponent } from './results/results.component';

import { IgxGridBaseComponent } from './igxgrid-base/igxgrid-base.component';
import { IgxGridWithFeaturesComponent } from './igxgrid-withFeatures/igxgrid-withFeatures.component';

import { AgGridBaseComponent } from './ag-grid-base/ag-grid-base.component';
import { AgGridWithFeaturesComponent } from './ag-grid-withFeatures/ag-grid-withFeatures.component';

import { KendouiGridBaseComponent } from './kendoui-grid-base/kendoui-grid-base.component';
import { KendouiGridWithFeaturesComponent } from './kendoui-grid-withFeatures/kendoui-grid-withFeatures.component';

import { WijmoGridBaseComponent } from './wijmo-grid-base/wijmo-grid-base.component';
import { WijmoGridWithFeaturesComponent } from './wijmo-grid-withFeatures/wijmo-grid-withFeatures.component';

import { PeopleGenService } from './services/people-gen.service';
import { DataGenService } from './services/data-gen.service';
import { RecordKeepingService } from './services/recordkeeping.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResultsComponent,
    IgxGridBaseComponent,
    IgxGridWithFeaturesComponent,
    AgGridBaseComponent,
    AgGridWithFeaturesComponent,
    KendouiGridBaseComponent,
    KendouiGridWithFeaturesComponent,
    WijmoGridBaseComponent,
    WijmoGridWithFeaturesComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,

    IgxNavigationDrawerModule,
    IgxNavbarModule,
    IgxLayoutModule,
    IgxRippleModule,
    IgxDropDownModule,

    IgxGridModule,
    AgGridModule.withComponents([]),
    GridModule,
    WjGridModule

  ],
  providers: [PeopleGenService, DataGenService, RecordKeepingService, IgxExcelExporterService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
