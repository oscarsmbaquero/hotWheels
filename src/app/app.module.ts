import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//modules
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
//Components
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { ListadoComponent } from './pages/listado/listado.component';
import { CreateComponent } from './pages/create/create.component';
import { SearchComponent } from './pages/search/search.component';
//material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FooterComponent } from './core/components/footer/footer.component';
import { MatSelectModule } from '@angular/material/select'; 
import { MatIconModule } from '@angular/material/icon';
import { FavoriteComponent } from './pages/favorite/favorite.component';
// import { MaterialFileInputModule } from 'ngx-material-file-input';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListadoComponent,
    CreateComponent,
    FooterComponent,
    SearchComponent,
    FavoriteComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    CoreModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    //MaterialFileInputModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
