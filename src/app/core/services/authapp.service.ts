import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthappService {

  constructor() { }

  autentica = (userid: string , password: string) :boolean => {
    var retVal = (userid === "Jonathan" && password === "123")? true:false;
if(retVal){
  sessionStorage.setItem("Utente", userid);
}


    return retVal;
  }

  loggedUser = () : string | null => (sessionStorage.getItem("Utente"))? sessionStorage.getItem("Utente"): "";//se l 'utente nella sessione esiste restituiamo il nome utente altrimenti restituiamo null

  isLogged = () : boolean => (sessionStorage.getItem("Utente"))? true:false;
  clearUser = () : void => sessionStorage.removeItem("Utente");//metodo per rimuovere l'utente dalla sessione
  clearAll = () : void => sessionStorage.clear();//metodo per eliminare qualsiasi elemento nella session
}
