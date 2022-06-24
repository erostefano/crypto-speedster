import { Component } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { from, map, Observable, forkJoin, catchError, of } from 'rxjs';
import { format, subWeeks, subMonths } from 'date-fns';

const error$ = of({data: []});

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
                today: from(httpsCallable(functions, `getRanking?date=${format(new Date(), 'yyyy-MM-dd')}`)()).pipe(catchError(_ => error$)),
                oneWeekAgo: from(httpsCallable(functions, `getRanking?date=${format(subWeeks(new Date(), 1), 'yyyy-MM-dd')}`)()).pipe(catchError(_ => error$)),
                twoWeeksAgo: from(httpsCallable(functions, `getRanking?date=${format(subWeeks(new Date(), 2), 'yyyy-MM-dd')}`)()).pipe(catchError(_ => error$)),
                oneMonthAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 1), 'yyyy-MM-dd')}`)()).pipe(catchError(_ => error$)),
                twoMonthsAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 2), 'yyyy-MM-dd')}`)()).pipe(catchError(_ => error$)),
                threeMonthsAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 3), 'yyyy-MM-dd')}`)()).pipe(catchError(_ => error$)),
                halfYearAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 6), 'yyyy-MM-dd')}`)()).pipe(catchError(_ => error$)),
                oneYearAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 12), 'yyyy-MM-dd')}`)()).pipe(catchError(_ => error$)),
            })
            .pipe(
                map(rankings => {
                    return {
                        today: rankings.today.data,
                        oneWeekAgo: rankings.oneWeekAgo.data,
                        twoWeeksAgo: rankings.twoWeeksAgo.data,
                        oneMonthAgo: rankings.oneMonthAgo.data,
                        twoMonthsAgo: rankings.twoMonthsAgo.data,
                        threeMonthsAgo: rankings.threeMonthsAgo.data,
                        halfYearAgo: rankings.halfYearAgo.data,
                        oneYearAgo: rankings.oneYearAgo.data
                    }                     
                })
            );
    }

    getRank(ranking: string[], coin: string): number {
        if (!ranking) {
            return 0;
        }

        return ranking.findIndex(rankCoin => rankCoin === coin) + 1;
    }
}
