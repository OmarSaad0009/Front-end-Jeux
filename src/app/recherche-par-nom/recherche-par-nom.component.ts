import { Component, OnInit } from '@angular/core';
import { Jeu } from '../model/jeu.model';
import { JeuService } from '../services/jeu.service';

@Component({
  selector: 'app-recherche-par-nom',
  templateUrl: './recherche-par-nom.component.html',
  
})
export class RechercheParNomComponent implements OnInit {
nomJeu!: string;
jeux! : Jeu[];
allJeux! : Jeu[];
searchTerm! : string;

constructor(private jeuService : JeuService){}


ngOnInit(): void {
  this.jeuService.listeJeu().subscribe(jeux => {
    console.log(jeux);
    this.jeux = jeux;
    });
}

rechercherJeux(){
    this.jeuService.rechercherParNom(this.nomJeu).subscribe(jeux => this.jeux=jeux);
}

onKeyUp(filterText : string){
  this.jeux = this.allJeux.filter(item =>
  item.nomJeu.toLowerCase().includes(filterText));
  }
}
