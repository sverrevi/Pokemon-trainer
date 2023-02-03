import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Pokemon } from '../models/pokemon.model';
import { Trainer } from '../models/trainer.model';
import { StorageUtils } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
//This is in state, so other components have access to it 
  private _trainer?: Trainer;

  get trainer(): Trainer | undefined { return this._trainer }

  set trainer(trainer: Trainer | undefined) { 
    StorageUtils.localStorageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer; }

  constructor() {
    this._trainer = StorageUtils.localStorageRead<Trainer>(StorageKeys.Trainer);
   }


  public chkCaughtPokemon(pokemonName: string): boolean {
    if(this.trainer){
      return Boolean(this.trainer.pokemon.find((pokemon: Pokemon) => pokemon.name === pokemonName))
    }
    return false; 
  } 

  public catchPokemon(pokemon: Pokemon): void {
    if(this._trainer){
      this._trainer.pokemon.push(pokemon);

    }
  }

  public releasePokemon(pokemonName: string): void {
    if (confirm("You are about to release this pokemon. Are you ok with this?")){
      if(this._trainer){
        this._trainer.pokemon = this._trainer.pokemon.filter((pokemon: Pokemon) => pokemon.name !== pokemonName )
      }
    }
  }
}
