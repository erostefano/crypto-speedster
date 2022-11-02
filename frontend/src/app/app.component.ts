import {Component} from '@angular/core';
import {Functions, httpsCallable} from '@angular/fire/functions';
import {catchError, forkJoin, from, map, Observable, of} from 'rxjs';
import {format, subMonths, subWeeks} from 'date-fns';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'crypto-speedster';
}
