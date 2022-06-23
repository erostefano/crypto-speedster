import { Component } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { from, map, Observable, forkJoin } from 'rxjs';
import { format, subWeeks, subMonths } from 'date-fns';

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
                today: from(httpsCallable(functions, `getRanking?date=${format(new Date(), 'yyyy-MM-dd')}`)()),
                oneWeekAgo: from(httpsCallable(functions, `getRanking?date=${format(subWeeks(new Date(), 1), 'yyyy-MM-dd')}`)()),
                twoWeeksAgo: from(httpsCallable(functions, `getRanking?date=${format(subWeeks(new Date(), 2), 'yyyy-MM-dd')}`)()),
                oneMonthAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 1), 'yyyy-MM-dd')}`)()),
                twoMonthsAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 2), 'yyyy-MM-dd')}`)()),
                threeMonthsAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 3), 'yyyy-MM-dd')}`)()),
                halfYearAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 6), 'yyyy-MM-dd')}`)()),
                oneYearAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 12), 'yyyy-MM-dd')}`)()),
            });
    }

    getRank(ranking: string[], coin: string): number {
        return ranking.findIndex(rankCoin => rankCoin === coin) + 1;
    }
}
