import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Pokemon } from "src/app/models/pokemon.model";
import { PokemonCatalogueService } from "src/app/services/pokemon-catalogue.service";


@Component({
    selector: 'app-pokemon-catalogue',
    templateUrl: './pokemon-catalogue.page.html',
    styleUrls: ['./pokemon-catalogue.page.css']
  })
  export class PokemonCataloguePage implements OnInit {

    get pokemons() : Pokemon[] { return this.pokemonCatalogueService.pokemons }

    get error(): string { return this.pokemonCatalogueService.errors }
  
    constructor( private readonly router: Router,
        private readonly pokemonCatalogueService: PokemonCatalogueService) { }

    
    ngOnInit(): void {
        this.pokemonCatalogueService.findAllPokemons();

    }
  }