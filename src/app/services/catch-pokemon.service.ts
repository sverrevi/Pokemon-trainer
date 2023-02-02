import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { PokemonCatalogueService } from './pokemon-catalogue.service';
import { TrainerService } from './trainer.service';

const { apiKey, apiTrainers } = environment; 

@Injectable({
  providedIn: 'root'
})
export class CatchPokemonService {

  constructor(
    private readonly trainerService: TrainerService,
    private readonly pokemonCatalogueService: PokemonCatalogueService,
    private readonly http: HttpClient ) { }
  
  public addPokemonToTrainer(pokemonName: string): Observable<Trainer> {

    if(!this.trainerService.trainer){
      throw new Error("Origin: addPokemonToTrainer:  The user does not exist");
    }
    
    const trainer: Trainer = this.trainerService.trainer;

    const pokemon: Pokemon  | undefined = this.pokemonCatalogueService.findPokemonByName(pokemonName);
    
    if(!pokemon){
      throw new Error('Origin: addPokemonToTrainer: The pokemon does not exist');
    }

    if(this.trainerService.chkCaughtPokemon(pokemonName)){
      throw new Error('Origin: addPokemonToTrainer: You have alredy chaught this pokemon');
    }

    const headers = new HttpHeaders({
      'content-type':'application/json',
      'x-api-key': apiKey
    })

    return this.http.patch<Trainer>(`${apiTrainers}/${trainer.id}`, {
      pokemon: [... trainer.pokemon, pokemon.name]
    }, { headers }).pipe(
      tap((updatedTrainer: Trainer) => {
        this.trainerService.trainer = updatedTrainer;
      })
    )

  }




}
