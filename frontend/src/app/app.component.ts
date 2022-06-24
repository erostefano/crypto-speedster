import { Component } from '@angular/core';
import { Functions, httpsCallable } from '@angular/fire/functions';
import { catchError, forkJoin, from, map, Observable, of } from 'rxjs';
import { format, subMonths, subWeeks } from 'date-fns';

const error$: Observable<string[]> = of([]);

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'crypto-speedster';

    rows$: Observable<any>;

    constructor(private functions: Functions) {
        this.rows$ =
            forkJoin({
                today: from(httpsCallable(functions, `getRanking?date=${format(new Date(), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => error$)),
                oneWeekAgo: from(httpsCallable(functions, `getRanking?date=${format(subWeeks(new Date(), 1), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => error$)),
                twoWeeksAgo: from(httpsCallable(functions, `getRanking?date=${format(subWeeks(new Date(), 2), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => error$)),
                oneMonthAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 1), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => error$)),
                twoMonthsAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 2), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => error$)),
                threeMonthsAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 3), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => error$)),
                halfYearAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 6), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => error$)),
                oneYearAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 12), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => error$))
            })
                .pipe(
                    map(rankings => {
                        return rankings.today.map(rank => {
                            return {
                                today: rank,
                                oneWeekAgo: this.getRank(rankings.oneWeekAgo, rank),
                                twoWeeksAgo: this.getRank(rankings.twoWeeksAgo, rank),
                                oneMonthAgo: this.getRank(rankings.oneMonthAgo, rank),
                                twoMonthsAgo: this.getRank(rankings.twoMonthsAgo, rank),
                                threeMonthsAgo: this.getRank(rankings.threeMonthsAgo, rank),
                                halfYearAgo: this.getRank(rankings.halfYearAgo, rank),
                                oneYearAgo: this.getRank(rankings.oneYearAgo, rank),
                            }
                        })
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
