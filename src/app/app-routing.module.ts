import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginComponent } from "./components/auth/login/login.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { ContractListComponent } from './components/contract/contract-list/contract-list.component';
import { ContractComponent } from './components/contract/my-contract/contract.component';
import { NewContractComponent } from './components/contract/new-contract/new-contract.component';
import { HomeComponent } from "./components/home/home.component"
import { ProfileComponent } from './components/profile/profile.component';
import { RecomendationComponent } from './components/profile/recomendation/recomendation.component';
import { HomepageComponent } from './components/homepage/homepage.component'
import { AuthGuard } from "./components/auth/auth.guard"
import { PartnerComponent } from './components/partner/partner.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "benefits", component: HomeComponent },
  { path: "contract", component: ContractComponent, canActivate:[AuthGuard] },
  { path: "mycontracts", component: ContractListComponent, canActivate:[AuthGuard] },
  { path: "newcontract", component: NewContractComponent, canActivate:[AuthGuard] },
  { path: "aboutus", component: AboutUsComponent },
  { path: "profile", component: ProfileComponent, canActivate:[AuthGuard] },
  { path: "recomendation", component: RecomendationComponent },
  { path: "homepage", component: HomepageComponent },
  { path: "partner", component: PartnerComponent, canActivate:[AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard] // protcted routes
})

export class AppRoutingModule {}
