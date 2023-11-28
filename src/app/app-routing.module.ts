import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JeuxComponent } from './jeux/jeux.component';
import { AddJeuComponent } from './add-jeu/add-jeu.component';
import { UpdateJeuComponent } from './update-jeu/update-jeu.component';
import { RechercheParGenreComponent } from './recherche-par-genre/recherche-par-genre.component';
import { RechercheParNomComponent } from './recherche-par-nom/recherche-par-nom.component';
import { ListeGenresComponent } from './liste-genres/liste-genres.component';
import { LoginComponent } from './login/login.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { JeuGuard } from './jeu.guard';

const routes: Routes = [
  {path : "jeux", component : JeuxComponent},
  {path : "add-jeu", component : AddJeuComponent, canActivate:[JeuGuard]},
  {path: "updateJeu/:id", component: UpdateJeuComponent},
  {path: "rechercheParGenre", component : RechercheParGenreComponent},
  {path: "listeGenres", component : ListeGenresComponent},
  {path: 'login', component: LoginComponent},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path: "rechercheParNom", component : RechercheParNomComponent},
  { path: "", redirectTo: "jeux", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
