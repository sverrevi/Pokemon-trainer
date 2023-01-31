import { NgModule } from "@angular/core"
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { LoginPage } from "./pages/login/login.page";
import { PokemonCataloguePage } from "./pages/pokemon-catalogue/pokemon-catalogue.page";
import { TrainerPage } from "./pages/trainer/trainer.page";

const routes: Routes = [

    {
        path: "",
        pathMatch: "full",
        redirectTo: "/login"
    },

    {
        path: "login",
        component: LoginPage
    },
    {
        path:"pokemon-catalogue",
        component: PokemonCataloguePage,
        canActivate: [AuthGuard]
        
    },
    {
        path:"trainer",
        component: TrainerPage,
        canActivate: [AuthGuard]
        
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ], // Import a module
    exports: [
        RouterModule
    ] // Expose module and it's feature

})

export class AppRoutingModule {

}