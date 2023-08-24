import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import WelcomeComponent from './pages/welcome/welcome.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './pages/error/error.component';
import { ArticoliComponent } from './pages/articoli/articoli.component';
import { CoreModule } from './core/core.module';
import { LogoutComponent } from './pages/logout/logout.component';
import { GridArticoliComponent } from './pages/grid-articoli/grid-articoli.component';
import { ArticoliCardComponent } from './components/articoli-card/articoli-card.component';
import {HttpClientModule} from '@angular/common/http'
import { NgxPaginationModule } from 'ngx-pagination';
import { GestartComponent } from './pages/gestart/gestart.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    ErrorComponent,
    ArticoliComponent,
    LogoutComponent,
    GridArticoliComponent,
    ArticoliCardComponent,
    GestartComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CoreModule,
    HttpClientModule,
    NgxPaginationModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
