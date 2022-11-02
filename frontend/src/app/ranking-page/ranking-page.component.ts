import {Component} from '@angular/core';
import {catchError, forkJoin, from, map, Observable, of} from "rxjs";
import {Functions, httpsCallable} from "@angular/fire/functions";
import {format, subMonths, subWeeks} from "date-fns";

@Component({
    selector: 'app-ranking-page',
    templateUrl: './ranking-page.component.html',
    styleUrls: ['./ranking-page.component.scss']
})
export class RankingPageComponent {

    rows$: Observable<any>;
    displayedColumns: string[] = ['today', 'one week ago', 'two weeks ago', 'one month ago', 'two months ago', 'three months ago', 'half year ago', 'one year ago'];
    error$: Observable<string[]> = of([]);

    constructor(private functions: Functions) {
        this.rows$ =
            forkJoin({
                today: from(httpsCallable(functions, `getRanking?date=${format(new Date(), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => this.error$)),
                oneWeekAgo: from(httpsCallable(functions, `getRanking?date=${format(subWeeks(new Date(), 1), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => this.error$)),
                twoWeeksAgo: from(httpsCallable(functions, `getRanking?date=${format(subWeeks(new Date(), 2), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => this.error$)),
                oneMonthAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 1), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => this.error$)),
                twoMonthsAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 2), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => this.error$)),
                threeMonthsAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 3), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => this.error$)),
                halfYearAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 6), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => this.error$)),
                oneYearAgo: from(httpsCallable(functions, `getRanking?date=${format(subMonths(new Date(), 12), 'yyyy-MM-dd')}`)()).pipe(map(response => response.data as string[]), catchError(_ => this.error$))
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
