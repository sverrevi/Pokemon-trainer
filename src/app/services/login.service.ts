
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap, of, tap } from 'rxjs';
import { environment } from 'src/environment/environment';
import { Trainer } from '../models/trainer.model';


const { apiTrainers, apiKey } = environment;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

//Dependency injection 
  constructor(private readonly http: HttpClient) { }

  public login(username: string) : Observable<Trainer> {
    return this.chkUsername(username).pipe(
      //Using the switchMap for creating a new user in one call. 
      switchMap((trainer: Trainer | undefined) => {
        if(trainer === undefined){
          //Makes a post request to the api with the username
          return this.createTrainer(username)
        }
        return of(trainer)   
      })
    )
  }
    //Needs to make Login function

    //Needs to check if user is in DB 
    private chkUsername(username: string): Observable<Trainer | undefined> {
      return this.http.get<Trainer[]>(`${apiTrainers}?username=${username}`)
        .pipe(
          map((response: Trainer[]) => {
            return response.pop();
          })    
        ) 
    }

    //If user does not exist, make a new user (trainer)
    private createTrainer(username: string): Observable<Trainer> {
      //
      const trainer = {
        username,
        pokemon: []
      };

      const headers = new HttpHeaders({
        "Content-type": "application/json",        
        "x-api-key": apiKey
      });

      return this.http.post<Trainer>(apiTrainers, trainer, {
        headers
      })

      //Maybe making a part that informs the user that its created a new user

    }

    //If user exists || created user  -> Store user


   
}
