import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize } from 'rxjs';
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
  private _loading: boolean = false;

  constructor(private readonly http: HttpClient) { }

  get pokemons(): Pokemon[] { return this._pokemons; }


  get errors(): string { return this._error; }

  getPokemonSprite(id: any): string { return `${environment.apiPokemonSprite}${id}.png`}

  public findAllPokemons(): void {
    if(this._pokemons.length > 0 || this._loading)  {
      return;  
    }
    this._loading = true;
    this.http.get<PokemonList>(apiPokemons)
    .pipe(
      finalize(() => {
        this._loading = false;
      })
    )
    
    .subscribe({
      next:(data : PokemonList ) => {
        this._pokemons = data.results;
      },
      error: (error: HttpErrorResponse) => { 
        this._error = error.message;
      }
      
    })
  }

  public findPokemonByName(name: string): Pokemon | undefined {
    return this.pokemons.find((pokemon: Pokemon) => pokemon.name === name);
   }

   
}
