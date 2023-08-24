import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SalutiDataService } from 'src/app/core/services/data/saluti-data.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export default class WelcomeComponent implements OnInit{
  titolo:string ="Benvenuti in AlphaShop";
  sottotitolo:string= "Visualizza le offerte del giorno"

  utente: string  = "";
  constructor(private route : ActivatedRoute,private salutiServ : SalutiDataService){}
  ngOnInit(): void {

      this.utente = this.route.snapshot.params["userId"]
    };
    saluti : string =""
    errore : string =""
    getSaluti() : void {
this.salutiServ.getSaluti(this.utente).subscribe({
next: this.handleResponse.bind(this),
error: this.handleError.bind(this)
})
//subscribe sottoscrive (è come una funzione asincrona ... appena arriva il dato esegue il metodo)

    }

handleResponse(response:Object){
  this.saluti = response.toString();

}

handleError(error:any){
 console.log(error );
 this.errore = error.error.message;


}

}
