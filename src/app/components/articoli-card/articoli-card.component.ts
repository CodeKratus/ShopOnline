import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IArticoli } from 'src/app/models/Articoli';

@Component({
  selector: 'app-articoli-card',
  templateUrl: './articoli-card.component.html',
  styleUrls: ['./articoli-card.component.css']
})
export class ArticoliCardComponent {

  @Output()
  delete = new EventEmitter();

  @Output()
  edit = new EventEmitter();



@Input()
//le variabili vanno sempre inizializzate
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


editArt = () => this.edit.emit(this.articolo.codArt)

deleteArt = () => this.delete.emit(this.articolo.codArt)



}
