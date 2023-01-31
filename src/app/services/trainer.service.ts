import { Injectable } from '@angular/core';
import { StorageKeys } from '../enums/storage-keys.enum';
import { Trainer } from '../models/trainer.model';
import { StorageUtils } from '../utils/storage.utils';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {

  private _trainer?: Trainer;

   get trainer(): Trainer | undefined { return this._trainer }

   set trainer(trainer: Trainer | undefined) { 
    StorageUtils.localStorageSave<Trainer>(StorageKeys.Trainer, trainer!);
    this._trainer = trainer; }


  constructor() {
    this._trainer = StorageUtils.localStorageRead<Trainer>(StorageKeys.Trainer);
   }
}
