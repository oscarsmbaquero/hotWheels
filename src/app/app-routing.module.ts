import { CreateComponent } from './pages/create/create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListadoComponent } from './pages/listado/listado.component';
import { FavoriteComponent } from './pages/favorite/favorite.component';

const routes: Routes = [
  { path: 'list', component: ListadoComponent },
  { path: 'anadir', component: CreateComponent },
  { path: 'favorite', component: FavoriteComponent },
  { path: '', pathMatch:'full', redirectTo:'list'},
  { path: '**', pathMatch:'full', redirectTo:'list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
