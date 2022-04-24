import { Component } from "@angular/core";
import { Functions, httpsCallable } from "@angular/fire/functions";
import { from, map, Observable } from "rxjs";

interface Rank {
  rank: number;
  name: string;
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "crypto-speedster";

  ranking$: Observable<Rank[]>;

  constructor(private functions: Functions) {
    this.ranking$ = from(
      httpsCallable(functions, "getRanking?date=2022-04-22")()
    ).pipe(map((value) => value.data as Rank[]));
  }
}
