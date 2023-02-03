import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CatchPokemonService } from 'src/app/services/catch-pokemon.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent implements OnInit {

  @Input() pokemonName: string ="";

  public isCaughtByTrainer: boolean = false;

  constructor(
    private readonly catchPokemonService: CatchPokemonService,
    private readonly trainerService: TrainerService ) {}

  onCatchPokemonClick(): void {
    //Add pokemon to the trainers pokemon
    this.catchPokemonService.addPokemonToTrainer(this.pokemonName)
    .subscribe({
      next: (response: Trainer) => {
        console.log("NEXT: ", response);
      },
      error: (error: HttpErrorResponse) => {
        alert("ERROR" + error.message);
      }
    });
  }

  ngOnInit(): void {

    this.isCaughtByTrainer = this.trainerService.chkCaughtPokemon(this.pokemonName);
    
  }

}
