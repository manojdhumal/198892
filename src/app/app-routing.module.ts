import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
// 
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ServicesComponent } from './services/services.component';
import { CservicesComponent } from './cservices/cservices.component';
import { ContactComponent } from './contact/contact.component';
import { NewsComponent } from './news/news.component'


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent,
   
  },
  {
    path: 'register',
    component: RegisterComponent,
   
  },
  {
    path: 'about',
    component: AboutComponent,
   
  },
  {
    path: 'services',
    component: ServicesComponent,
   
  },
  {
    path: 'cservices',
    component: CservicesComponent,
   
  },
  {
    path: 'contact',
    component: ContactComponent,
   
  },
  {
    path: 'news',
    component: NewsComponent,
   
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    
  ]
})
export class AppRoutingModule {
}
