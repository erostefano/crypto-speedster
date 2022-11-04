import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {RankingPageComponent} from "./ranking-page/ranking-page.component";
import {MarketcapPageComponent} from "./marketcap-page/marketcap-page.component";

const routes: Routes = [
    {
        path: 'ranking',
        component: RankingPageComponent
    },
    {
        path: 'marketcap',
        component: MarketcapPageComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {
}
