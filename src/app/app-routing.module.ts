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


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "home", component: HomeComponent },
  { path: "contract", component: ContractComponent },
  { path: "mycontract", component: ContractListComponent },
  { path: "newcontract", component: NewContractComponent },
  { path: "aboutus", component: AboutUsComponent },
  { path: "profile", component: ProfileComponent },
  { path: "recomendation", component: RecomendationComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
