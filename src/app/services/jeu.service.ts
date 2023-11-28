import { Injectable } from '@angular/core';
import { Jeu } from '../model/jeu.model';
import { Genre } from '../model/genre.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { apiURL } from '../config';
import { GenreWrapper } from '../model/genreWrapped.model';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders( {'Content-Type': 'application/json'} )
};

@Injectable({
  providedIn: 'root'
})
export class JeuService {
 
  apiURLGenre: string = 'http://localhost:8080/jeux/genre';
  
  jeux! : Jeu[]; //tableau de jeux
  
  //genres! : Genre[];
  

  constructor(private http : HttpClient,
              private authService : AuthService) { 

    /*this.genres = [
      {idG : 1, nomG : "Action"},
        {idG : 2, nomG : "Football"}
    ];*/
    
    /*
    this.jeux = [
      {idJeu : 1, nomJeu : "Valorant", prixJeu : 3000.600, dateCreation : new Date("01/14/2011"), genre : {idG : 1,nomG : "Action"}},
      {idJeu : 2, nomJeu : "Fifa 24", prixJeu : 450, dateCreation : new Date("12/17/2010"), genre : {idG : 1,nomG : "Football"}},
      {idJeu : 3, nomJeu :"Pes 6", prixJeu : 900.123, dateCreation : new Date("02/20/2020"),genre : {idG : 1,nomG : "Action"}}
        ];*/
  }

  listeJeu(): Observable<Jeu[]>{
      
    return this.http.get<Jeu[]>(apiURL+"/all");
    }
    
    ajouterJeu( jeu: Jeu):Observable<Jeu>{
      let jwt = this.authService.getToken();
      jwt = "Bearer "+jwt;
      let httpHeaders = new HttpHeaders({"Authorization":jwt})
      return this.http.post<Jeu>(apiURL+"/addjeu", jeu, {headers:httpHeaders});
      }


      supprimerJeu(id : number) {
        const url = `${apiURL}/deljeu/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.delete(url, {headers:httpHeaders});
        }

        consulterJeu(id: number): Observable<Jeu> {
          const url = `${apiURL}/getbyid/${id}`;
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.get<Jeu>(url,{headers:httpHeaders});
          }

        updateJeu(jeu:Jeu): Observable<Jeu>

        {
          let jwt = this.authService.getToken();
          jwt = "Bearer "+jwt;
          let httpHeaders = new HttpHeaders({"Authorization":jwt})
          return this.http.put<Jeu>(apiURL+"/updatejeu", jeu, {headers:httpHeaders});
        }

        trierJeux(){
          this.jeux = this.jeux.sort((n1,n2) => {
          if (n1.idJeu! > n2.idJeu!) {
          return 1;
          }
          if (n1.idJeu! < n2.idJeu!) {
          return -1;
          }
          return 0;
          });
          }

          /*listeGenres():Genre[] {
            return this.genres;
            }

          consulterGenre(id:number): Genre{
              return this.genres.find(cat => cat.idG == id)!;
              }*/

                listeGenres():Observable<GenreWrapper>{
                  let jwt = this.authService.getToken();
                  jwt = "Bearer "+jwt;
                  let httpHeaders = new HttpHeaders({"Authorization":jwt})
                  return this.http.get<GenreWrapper>(this.apiURLGenre,{headers:httpHeaders}
                  );

                  }

                  rechercherParGenre(idG: number):Observable< Jeu[]> {
                    const url = `${apiURL}/prodscat/${idG}`;
                    return this.http.get<Jeu[]>(url);
                    }

                    rechercherParNom(nom: string):Observable< Jeu[]> {
                      const url = `${apiURL}/prodsByName/${nom}`;
                      return this.http.get<Jeu[]>(url);
                      }

                      ajouterGenre( genre: Genre):Observable<Genre>{
                        return this.http.post<Genre>(this.apiURLGenre, genre, httpOptions);
                        }
                    
}
