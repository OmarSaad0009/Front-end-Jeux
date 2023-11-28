import { Component, OnInit } from '@angular/core';
import { Jeu } from '../model/jeu.model';
import { Genre } from '../model/genre.model';
import { JeuService } from '../services/jeu.service';

@Component({
  selector: 'app-recherche-par-genre',
  templateUrl: './recherche-par-genre.component.html',
  styles:[
    
  ]
})
export class RechercheParGenreComponent implements OnInit {
  jeux! : Jeu[];
  IdG! : number;
  genres! : Genre[];


  constructor(private jeuService : JeuService){}

  ngOnInit(): void{
    this.jeuService.listeGenres().
    subscribe(genres => {this.genres = genres._embedded.genres;
    console.log(genres);
   });
  }

  onChange() {
    this.jeuService.rechercherParGenre(this.IdG).
    subscribe(jeux =>{this.jeux=jeux});
    }
}
