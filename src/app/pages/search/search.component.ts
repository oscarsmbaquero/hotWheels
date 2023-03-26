import { SpotifyService } from 'src/app/services/spotify.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  artistsSearch: any [] = [];
  

  constructor(private spotify:SpotifyService) { }

  ngOnInit(): void {
  }
 
  buscar(termino: string){
   console.log(termino);
   this.spotify.getArtista(termino)
       .subscribe( (data:any) =>{
         console.log(data.artists.items);
         this.artistsSearch= data.artists.items;
         
       })
  }

}
