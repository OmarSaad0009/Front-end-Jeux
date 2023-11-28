import { Component, OnInit} from '@angular/core';
import { Jeu } from '../model/jeu.model';
import { JeuService } from '../services/jeu.service';
import { Genre } from '../model/genre.model';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-add-jeu',
  templateUrl: './add-jeu.component.html',
  
})
export class AddJeuComponent {

  newJeu = new Jeu();
  message!: string;
  genres! : Genre[];
  newidG! : number;
  newGenre! : Genre;
  constructor(private jeuService: JeuService, private router: Router){
    
  }

  ngOnInit():void {
    this.jeuService.listeGenres().subscribe(genres => {this.genres =  genres._embedded.genres;
       console.log(genres);
});
  }

  

    addJeu(){
      this.newJeu.genre = this.genres.find(genre => genre.idG == this.newidG)!;

      this.jeuService.ajouterJeu(this.newJeu)
      .subscribe(jeu => {
      console.log(jeu);
      this.router.navigate(['jeux']);
      });
    }

}
