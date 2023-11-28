import { Genre } from "./genre.model";

export class Jeu {
    idJeu! : number;
    nomJeu! : string;
    prixJeu! : number;
    dateCreation! : Date ;
    genre! : Genre;
    }