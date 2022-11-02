import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RankingPageComponent} from "./ranking-page/ranking-page.component";

const routes: Routes = [
    {
        path: 'ranking',
        component: RankingPageComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
