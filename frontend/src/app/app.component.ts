import { Component } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { from, map, Observable, forkJoin } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'crypto-speedster';

    rankings$: Observable<any>;

    constructor(private functions: Functions) {
        this.rankings$ = 
            forkJoin({
                today: from(httpsCallable(functions, 'getRanking?date=2022-04-22')()),
                oneWeekAgo: from(httpsCallable(functions, 'getRanking?date=2022-05-22')()),
            });
    }

    getRank(ranking: string[], coin: string): number {
        return ranking.findIndex(rankCoin => rankCoin === coin) + 1;
    }
}
