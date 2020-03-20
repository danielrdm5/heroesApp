import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeroeModel } from '../models/heroe.model';
import { map, delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class HeroesService {

  url = 'https://login-app-ca761.firebaseio.com';

  constructor(private http: HttpClient) { }


  createHeroe(heroe: HeroeModel) {

    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((resp: any) => {
          heroe.id = resp.name;
          return heroe;
        })
      );

  }

  deleteHeroe( id: string ) {
    return this.http.delete(`${ this.url }/heroes/${ id }.json`);
  }

  getHeroe( id: string ) {

    return this.http.get(`${ this.url }/heroes/${ id }.json`);

  }

  updateHeroe(heroe: HeroeModel) {

    const heroeTemp = {
      ...heroe
    };
    delete heroeTemp.id;
    return this.http.put(`${this.url}/heroes/${ heroe.id }.json`, heroeTemp);

  }

  getHeroes() {
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map( resp => this.createHeroesArray(resp)),
        delay(2000)
      );
  }

  private createHeroesArray( heroesObj: Object ){

    const heroes: HeroeModel[] = [];

    if ( heroes === null ){
      return [];
    }

    Object.keys( heroesObj ).forEach( key => {
      const heroe: HeroeModel = heroesObj[key];
      heroe.id = key;
      heroes.push(heroe);
    });

    return heroes;
  }
  

}
