import { Component, OnInit } from '@angular/core';
import { JeuService } from '../services/jeu.service';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-liste-genres',
  templateUrl: './liste-genres.component.html',
  
})
export class ListeGenresComponent implements OnInit{


    genres!: Genre[];

    ajout:boolean=true;

    updatedGenre:Genre = {"idG":0,"nomG":""};

    constructor(private jeuService: JeuService){}
  
    ngOnInit(): void {
      
      this.chargerGenres();
      }

      chargerGenres(){
        this.jeuService.listeGenres().
      subscribe(genres => {this.genres = genres._embedded.genres;
      console.log(genres);
      });
      }

      genreUpdated(genre:Genre){
        console.log("catégorie recue du composant updateGenre", genre);
        this.jeuService.ajouterGenre(genre).subscribe( ()=> this.chargerGenres());
      }

      updateGenre(genre:Genre) {
        this.updatedGenre=genre;
        this.ajout=false; 
        }
  
  }

