import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { CommonDataService } from './common-data.service';

import { ApiService } from './api.service';
import { AppRoutingModule } from './app-routing.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { HashLocationStrategy, LocationStrategy} from '@angular/common'


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    FormsModule, ReactiveFormsModule,
    
  ],
  providers: [CommonDataService, ApiService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
}
