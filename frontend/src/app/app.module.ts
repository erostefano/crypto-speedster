import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";

import {AppRoutingModule} from "./app-routing.module";
import {AppComponent} from "./app.component";
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {environment} from "../environments/environment";
import {getFunctions, provideFunctions} from "@angular/fire/functions";
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";


@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFunctions(() => getFunctions()),
        NoopAnimationsModule,
        MatTableModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}
