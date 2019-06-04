import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ButtonsModule, WavesModule, CardsFreeModule } from 'angular-bootstrap-md'


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpService } from './http.service';
import { HttpClientModule } from '@angular/common/http';
import { ParticlesModule } from 'angular-particle';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MDBBootstrapModulesPro } from 'ng-uikit-pro-standard';
import { MDBSpinningPreloader } from 'ng-uikit-pro-standard';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    HttpClientModule,
    ParticlesModule,
    MDBBootstrapModulesPro.forRoot()
  ],
  providers: [HttpService, MDBSpinningPreloader],
  bootstrap: [AppComponent]
})
export class AppModule { }
