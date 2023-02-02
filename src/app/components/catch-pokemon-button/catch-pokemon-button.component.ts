import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { Trainer } from 'src/app/models/trainer.model';
import { CatchPokemonService } from 'src/app/services/catch-pokemon.service';
import { TrainerService } from 'src/app/services/trainer.service';

@Component({
  selector: 'app-catch-pokemon-button',
  templateUrl: './catch-pokemon-button.component.html',
  styleUrls: ['./catch-pokemon-button.component.css']
})
export class CatchPokemonButtonComponent {

  @Input() pokemonName: string ="";

  constructor(private readonly catchPokemonService: CatchPokemonService) {}

  onCatchPokemonClick(): void {
    //Add pokemon to the trainers pokemon
    this.catchPokemonService.addPokemonToTrainer(this.pokemonName)
    .subscribe({
      next: (response: Trainer) => {
        console.log("NEXT: ", response);
      },
      error: (error: HttpErrorResponse) => {
        console.log("ERROR", error.message);
      }
    });
  }

}
