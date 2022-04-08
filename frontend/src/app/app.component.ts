import { Component } from "@angular/core";
import { listAll, ref, Storage } from "@angular/fire/storage";
import { from, map, Observable } from "rxjs";
import { StorageReference } from "@firebase/storage";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "crypto-speedster";

  items: Observable<StorageReference[]>;

  constructor(private storage: Storage) {
    const storageReference = ref(storage);

    this.items = from(listAll(storageReference)).pipe(
      map((listResult) => listResult.items)
    );
  }
}
