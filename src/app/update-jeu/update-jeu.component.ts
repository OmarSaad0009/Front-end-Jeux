import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JeuService } from '../services/jeu.service';
import { Jeu } from '../model/jeu.model';
import { Genre } from '../model/genre.model';

@Component({
  selector: 'app-update-jeu',
  templateUrl: './update-jeu.component.html',

})
export class UpdateJeuComponent implements OnInit{
  currentJeu = new Jeu();
  genres! : Genre[];
  updatedGenreId! : number;



constructor(private activatedRoute: ActivatedRoute,
  private router : Router,
   private jeuService: JeuService) { }

  ngOnInit(): void {
    this.jeuService.listeGenres().
    subscribe(genres => {this.genres = genres._embedded.genres;
    console.log(genres);
    });
    

    this.jeuService.consulterJeu(this.activatedRoute.snapshot.params['id']).
    subscribe( jeu =>{ this.currentJeu = jeu;
      this.updatedGenreId =
      this.currentJeu.genre.idG; } ) ;
   
  }

updateJeu()
{
  this.currentJeu.genre = this.genres.find(genre => genre.idG == this.updatedGenreId)!;
  this.jeuService.updateJeu(this.currentJeu).subscribe(jeu => {
  this.router.navigate(['jeux']); }
  );
}



  
}