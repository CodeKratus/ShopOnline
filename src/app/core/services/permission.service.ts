import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthappService } from './authapp.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private router: Router,private BasicAuth:AuthappService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):boolean {
 if(!this.BasicAuth.isLogged()){
  this.router.navigate(["login"]);
  return false;
 }else{
    return true;
  }
  }
}

export const AuthGuard: CanActivateFn = (next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
  return inject(PermissionService).canActivate(next, state);
}
