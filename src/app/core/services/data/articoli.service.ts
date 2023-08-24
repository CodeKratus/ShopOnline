import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { ApiMsg } from 'src/app/models/ApiMsg';
import { IArticoli, ICat, IIva } from 'src/app/models/Articoli';

@Injectable({
  providedIn: 'root'
})


export class ArticoliService {

/*
articoli: IArticoli[] = [
  {codArt:"012",descrizione:"Barilla farina 1 kg", um: "PZ" , pzCart : 24 , peso : 1 , prezzo : 1.09,active:true,data:new Date(),imageUrl:"assets/images/prodotti/014600301.jpg"},
  {codArt:"013",descrizione:"Barilla pasta ", um: "PZ" , pzCart : 30 , peso : 0.5 , prezzo : 1.50,active:true,data:new Date(),imageUrl:"assets/images/prodotti/1.jpg"},
  {codArt:"014",descrizione:"Croccole findus", um: "PZ" , pzCart : 8 , peso : 0.4 , prezzo : 3.00,active:true,data:new Date(),imageUrl:"assets/images/prodotti/057549001.jpg"},
]
*/


server : string = "localhost";
port : string = "5051";
  constructor(private httpClient : HttpClient) { }


 // getArticoli = () : IArticoli[] => this.articoli;

  getArticoliByDesc = (descrizione : string) =>{
    return this.httpClient.get<IArticoli[]>(`http://${this.server}:${this.port}/api/articoli/cerca/descrizione/${descrizione}`)
    .pipe(map(response =>
      {response.forEach(item => item.desStatoArt = this.getDesStatoArt(item.idStatoArt))
        return response;}
   ))

  }

  getDesStatoArt  =(idStato:string) : string => {
    if(idStato === '1')
    return 'Attivo'
  else if(idStato === '2')
  return 'Sospeso'
  else
   return 'Eliminato'
  }


  getArticoliByCode = (codArt : string)  =>{
    return this.httpClient.get<IArticoli>(`http://${this.server}:${this.port}/api/articoli/cerca/codice/${codArt}`)
    .pipe(map(response =>
      {response.idStatoArt = this.getDesStatoArt(response.idStatoArt)
      return response;}));
  }
 /* getArticoliByCode = (codArt:string) : IArticoli => {
    const index = this.articoli.findIndex(articoli => articoli.codArt === codArt)
    return this.articoli[index]
  }*/


  getArticoliByEan = (barcode : string)  =>{
    return this.httpClient.get<IArticoli>(`http://${this.server}:${this.port}/api/articoli/cerca/barcode/${barcode}`)
    .pipe(map(response =>
      {response.idStatoArt = this.getDesStatoArt(response.idStatoArt)
      return response;}));


  }


  delArticoloByCodArt = (codart:string) =>
  this.httpClient.delete(`http://${this.server}:${this.port}/api/articoli/elimina/${codart}`);



  getIva = () => this.httpClient.get<IIva[]>(`http://${this.server}:${this.port}/api/iva`);

  getCat = () => this.httpClient.get<ICat[]>(`http://${this.server}:${this.port}/api/cat`);


  updArticolo = (articolo: IArticoli) =>
  this.httpClient.put<ApiMsg>(`http://${this.server}:${this.port}/api/articoli/modifica`,articolo)

  insArticolo = (articolo:IArticoli)=>
  this.httpClient.post<ApiMsg>(`http://${this.server}:${this.port}/api/articoli/inserisci`,articolo)
}



