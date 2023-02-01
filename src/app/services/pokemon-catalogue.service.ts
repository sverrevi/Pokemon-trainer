import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import { Pokemon, PokemonList } from '../models/pokemon.model';

const { apiPokemons } = environment

@Injectable({
  providedIn: 'root'
})
export class PokemonCatalogueService {

  private _pokemonList?: PokemonList; 
  private _pokemons: Pokemon[] = []; 
  private _error: string = "";

  constructor(private readonly http: HttpClient) { }

  get pokemons(): Pokemon[] { return this._pokemons; }

  get errors(): string { return this._error; }


  public findAllPokemons(): void {
    this.http.get<PokemonList>(apiPokemons)
    .subscribe({
      next:(data : PokemonList ) => {
        this._pokemons = data.results;
      },
      error: (error: HttpErrorResponse) => { 
        this._error = error.message;
      }
      
    })
  }
}
