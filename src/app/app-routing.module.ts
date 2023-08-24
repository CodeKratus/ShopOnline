import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import WelcomeComponent from './pages/welcome/welcome.component';
import { ErrorComponent } from './pages/error/error.component';
import { ArticoliComponent } from './pages/articoli/articoli.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { AuthGuard, PermissionService } from 'src/app/core/services/permission.service';
import { GridArticoliComponent } from './pages/grid-articoli/grid-articoli.component';
import { ArticoliCardComponent } from './components/articoli-card/articoli-card.component';
import { GestartComponent } from './pages/gestart/gestart.component';

const routes: Routes = [
  {path:"" , component: LoginComponent},
  {path:"login", component: LoginComponent},
  {path:"welcome/:userId", component: WelcomeComponent, canActivate:[AuthGuard]},
  {path:"articoli", component: ArticoliComponent,canActivate:[AuthGuard]},
  {path:"articoli/card", component: ArticoliCardComponent,canActivate:[AuthGuard]},
  {path:"articoli/grid", component: GridArticoliComponent,canActivate:[AuthGuard]},
  {path:'gestart/:codart', component:GestartComponent, canActivate:[AuthGuard]},
    {path:'gestart', component:GestartComponent, canActivate:[AuthGuard]},
  {path:"logout",component: LogoutComponent},
  {path:"**",component: ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
