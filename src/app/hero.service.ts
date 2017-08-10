import { Injectable } from '@angular/core';
import { Hero } from './hero';
import { Http, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class HeroService {

    private headers = new Headers({ 'Content-Type': 'application/json' });
    private heroesUrl = 'api/heroes'; // url to web api

    constructor(private http: Http) { }

    getHeroes(): Promise<Hero[]> {
        // return Promise.resolve(HEROES);
        return this.http.get(this.heroesUrl)
            .toPromise()
            .then(response => response.json().data as Hero[])
            .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {
        console.error('An error occured', error); // for demo purpose only
        return Promise.reject(error.message || error);
    }

    getHero(id: number): Promise<Hero> {
        // return this.getHeroes().then(heroes=>heroes.find(hero => hero.id === id));
        const url = `${this.heroesUrl}/${id}`;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json().data as Hero)
            .catch(this.handleError);
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), { headers: this.headers })
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({ name: name }), { headers: this.headers })
            .toPromise()
            .then(res => res.json().data as Hero)
            .catch(this.handleError);
    }

    delete(id: any): Promise<void> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http
            .delete(url, { headers: this.headers })
            .toPromise()
            .then(() => null)
            .catch(this.handleError);
    }

    getHeroesSlowly(): Promise<Hero[]> {
        return new Promise(resolve => {
            // simulate server latency with 2 sec delay
            setTimeout(() => resolve(this.getHeroes()), 2000);
        });
    }
}
