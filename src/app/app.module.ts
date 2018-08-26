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
import { HashLocationStrategy, LocationStrategy} from '@angular/common';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CservicesComponent } from './cservices/cservices.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component'



@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    RegisterComponent,
    HomeComponent,
    AboutComponent,
    ServicesComponent,
    CservicesComponent,
    ContactComponent,
    NewsComponent,     
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
