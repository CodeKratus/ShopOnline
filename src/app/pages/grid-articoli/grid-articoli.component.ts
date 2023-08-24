import { Component } from '@angular/core';
import { IArticoli } from 'src/app/models/Articoli';
import { ArticoliService } from 'src/app/core/services/data/articoli.service';

@Component({
  selector: 'app-grid-articoli',
  templateUrl: './grid-articoli.component.html',
  styleUrls: ['./grid-articoli.component.css']
})
export class GridArticoliComponent {

errore : string = "";


articoli$ : IArticoli[] = [];

constructor(private articoliService : ArticoliService){}

  ngOnInit():void{
    this.articoliService.getArticoliByDesc("Barilla").subscribe({
      next: this.handleResponse.bind(this),
      error: this.handleError.bind(this)
    });

  }

  handleResponse(response: IArticoli[]){
    this.articoli$ = response;
  }

  handleError(error:Object){
    this.errore = error.toString();
  }

handleDelete = (codArt :string ) => {
  console.log("tasto elimina del cod" + codArt)


 this.articoli$ = this.articoli$.filter(x => x.codArt !== codArt)

}

handleEdit = (codArt :string ) => {
  console.log("tasto modifica del cod" + codArt)

}
}
