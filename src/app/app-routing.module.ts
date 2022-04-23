import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AboutUsComponent } from './components/about-us/about-us.component';

import { LoginComponent } from "./components/auth/login/login.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { ContractListComponent } from './components/contract/contract-list/contract-list.component';
import { ContractComponent } from './components/contract/my-contract/contract.component';
import { NewContractComponent } from './components/contract/new-contract/new-contract.component';
import { HomeComponent } from "./components/home/home.component"
import { HomepageComponent } from './components/homepage/homepage.component'

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "benefits", component: HomeComponent },
  { path: "contract", component: ContractComponent },
  { path: "mycontracts", component: ContractListComponent },
  { path: "newcontract", component: NewContractComponent },
  { path: "aboutus", component: AboutUsComponent },
  { path: "homepage", component: HomepageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
