import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { PokemonCatalogueService } from 'src/app/services/pokemon-catalogue.service';

@Component({
  selector: 'app-pokemon-list-item',
  templateUrl: './pokemon-list-item.component.html',
  styleUrls: ['./pokemon-list-item.component.css']
})
export class PokemonListItemComponent implements OnInit {

  @Input() pokemon?: Pokemon;
  pokemonNr: any; 

  constructor(private readonly pokemonCatalogueService: PokemonCatalogueService) { }

  ngOnInit(): void {
    //Gets the indexnumber of the current pokemon
    this.pokemonNr = this.pokemon?.url.split('/').filter(Boolean).pop()
  }
  
  getSprite(): string {
    //Gets the full url for the pokemonsprite
    return this.pokemonCatalogueService.getPokemonSprite(this.pokemonNr);

  }

}
