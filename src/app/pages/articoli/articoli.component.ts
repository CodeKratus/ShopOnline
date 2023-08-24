import { Component } from '@angular/core';
import { IArticoli } from '../../models/Articoli';
import { ArticoliService } from 'src/app/core/services/data/articoli.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, map, of } from 'rxjs';

@Component({
  selector: 'app-articoli',
  templateUrl: './articoli.component.html',
  styleUrls: ['./articoli.component.css']
})
export class ArticoliComponent {
articoli$ : IArticoli[]=[]
errore : string = ""
filter$ : Observable<string | null> = of ("");
filter : string | null = ""
filterType : number = 0;
pagina : number = 1;
righe : number = 10;
codart: string = "";


constructor(private articoliService : ArticoliService , private route: ActivatedRoute,private router: Router){}

ngOnInit(){
  /*this.articoliService.getArticoliByDesc("Barilla").subscribe({
    next: this.handleResponse.bind(this),
    error: this.handleError.bind(this)
  });*/

  this.filter$ = this.route.queryParamMap.pipe(map((params:ParamMap)=> params.get('filter')),);
  this.filter$.subscribe(param => (this.filter = param));

  if(this.filter){
    this.getArticoli(this.filter);
  }

}
refresh = () => {
  if(this.filter){
    this.getArticoli(this.filter);
}}


getArticoli = (filter: string) =>{
 this.articoli$ = [];

  if(this.filterType === 0){
  this.articoliService.getArticoliByCode(filter).subscribe({
    next: this.handleResponse.bind(this),
    error: this.handleError.bind(this)
  });}
  else  if(this.filterType === 1){
    this.articoliService.getArticoliByDesc(filter).subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });}
    else if(this.filterType === 2){
      this.articoliService.getArticoliByEan(filter).subscribe({
        next: this.handleResponse.bind(this),
        error: this.handleError.bind(this)
      });}

}


handleResponse(response: any){
  if(this.filterType === 0 || this.filterType ===2){
    let newArray :IArticoli[] = [...this.articoli$,response];
    this.articoli$ = newArray;
  }
  else{
  this.articoli$ = response;
      }
  this.filterType = 0;
}

handleError(error:any){
  if(this.filter && this.filterType === 0){
      this.filterType =1;
      this.getArticoli(this.filter);
  }
  else if(this.filter && this.filterType === 1){
    this.filterType =2;
      this.getArticoli(this.filter);
  } else
  {
    console.log(error);
    this.errore = error.error.message;
    this.filterType = 0;
  }
}
 /* articoli :IArticoli[] = [
    {codArt:"012",descrizione:"Barilla farina 1 kg", um: "PZ" , pzCart : 24 , peso : 1 , prezzo : 1.09,active:true,data:new Date(),},
    {codArt:"013",descrizione:"Barilla pasta ", um: "PZ" , pzCart : 30 , peso : 0.5 , prezzo : 1.50,active:true,data:new Date(),},
    {codArt:"014",descrizione:"Bastoncini findus", um: "PZ" , pzCart : 8 , peso : 0.4 , prezzo : 3.00,active:true,data:new Date(),}
  ];

*/

Elimina = (CodArt: string) =>{
  this.errore ="";
  this.codart = CodArt;
  console.log(`Eliminazione articolo ${CodArt}`);
  this.articoliService.delArticoloByCodArt(CodArt).subscribe({
    next: this.handleOkDelete.bind(this),
    error: this. handleErrDelete.bind(this)
  })
  }


  handleOkDelete = (response:any) => {
    console.log(response);
    this.articoli$ = this.articoli$.filter(item => item.codArt !== this.codart);
    this.codart = "";
  }

  handleErrDelete = (error:any) => {
    console.log(error);
    this.errore = error.error.message;
  }

  Modifica = (CodArt:string) =>{
    this.codart = CodArt
    console.log(`Modifica articolo ${CodArt}`)
    this.router.navigate(['gestart',CodArt])
  }

}
