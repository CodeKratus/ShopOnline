import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ArticoliService } from 'src/app/core/services/data/articoli.service';
import { ApiMsg } from 'src/app/models/ApiMsg';
import { IArticoli, ICat, IIva } from 'src/app/models/Articoli';

@Component({
  selector: 'app-gestart',
  templateUrl: './gestart.component.html',
  styleUrls: ['./gestart.component.css']
})
export class GestartComponent {
title:string = ""
CodArt:string =""
Ean:string = ""
apiMsg!:ApiMsg
conferma:string =""
errore:string=""
isModifica:boolean=false;
//stiamo inizializzando le variabili perche nel caso non ci fosse nessun dato renderebbe i valori riportati di seguito di default
articolo : IArticoli = {
  codArt: '',
  descrizione: '',
  um: '',
  codStat:"",
  pzCart: 0,
  pesoNetto: 0,
  prezzo: 0,
  idStatoArt: "1",
  desStatoArt: "",
  dataCreazione: new Date(),
  imageUrl: '',
  iva:{idIva:0,descrizione:'',aliquota:0},
  famAssort:{id:-1,descrizione:''},
  barcode:[]
}

Iva:IIva[] = [];

Cat:ICat[] = [];
constructor(private route:ActivatedRoute , private articoliService:ArticoliService,private router:Router) {

}


ngOnInit():void{
  this.CodArt = this.route.snapshot.params["codart"];
  if(this.CodArt){
console.log("Selezionato articolo " + this.CodArt);
this.title="Modifica Articoli"
this.isModifica=true;
this.articoliService.getArticoliByCode(this.CodArt).subscribe({
  next: this.handleResponse.bind(this),
  error: this.handleError.bind(this)
})
  }else{
    this.title="Creazione Articolo"
    this.isModifica=false
  }
this.articoliService.getIva().subscribe(response => {
  this.Iva = response;
  console.log(response)
})
this.articoliService.getCat().subscribe(response=>
  {
    this.Cat = response
    console.log(response)
  })
}
handleResponse = (response:any) =>{
  this.articolo = response;
  this.Ean = (this.articolo.barcode)? this.articolo.barcode[0].barcode : ""
  console.log(this.articolo)
}
handleError = (error:any) => {
console.log(error)
}

salva = () =>{

  console.log(this.articolo)
  this.conferma = ""
  this.errore = ""
  if(this.isModifica){  this.articoliService.updArticolo(this.articolo).subscribe({
    next:(response) => {this.apiMsg = response;
    this.conferma = this.apiMsg.message},
    error:(error) =>{
      this.apiMsg = error;
      this.errore = this.apiMsg.message;
    }
  })}
  else{
    this.articoliService.insArticolo(this.articolo).subscribe({
      next:(response) => {this.apiMsg = response;
      this.conferma = this.apiMsg.message},
      error:(error) =>{
        this.apiMsg = error;
        this.errore = this.apiMsg.message;
      }
    })
  }


}


abort = () =>{
  if(this.isModifica)
  this.router.navigate(['articoli'],{queryParams:{filter: this.CodArt}});
else
   this.router.navigate(['articoli'])
}

}
