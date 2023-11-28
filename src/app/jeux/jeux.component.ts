import { Component, OnInit } from '@angular/core';
import { Jeu } from '../model/jeu.model';
import { JeuService } from '../services/jeu.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jeux',
  templateUrl: './jeux.component.html',
 
})
export class JeuxComponent implements OnInit{

  jeux? : Jeu[];
 

  constructor(private jeuService : JeuService,
    private router: Router,
    public authService: AuthService) {
    //this.jeux = this.jeuService.listeJeux();

    }

    
  ngOnInit(): void {
    this.chargerJeux();
    
  }
 

chargerJeux(){
  this.jeuService.listeJeu().subscribe(jeu => { console.log(jeu);
    this.jeux = jeu;
    });
  }
  
  supprimerJeu(jeu: Jeu)
  {
  let conf = confirm("Etes-vous sûr ?");
  if (conf)
  this.jeuService.supprimerJeu(jeu.idJeu).subscribe(() => {
  console.log("jeu supprimé");
  this.chargerJeux();
  });
  }



}
