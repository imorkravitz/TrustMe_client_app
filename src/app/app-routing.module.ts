import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { LoginComponent } from "./components/auth/login/login.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { ContractListComponent } from './components/contract/contract-list/contract-list.component';
import { ContractComponent } from './components/contract/newContarct/contract.component';
import { HomeComponent } from "./components/home/home.component"


const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "home", component: HomeComponent },
  { path: "contract", component: ContractComponent },
  { path: "mycontract", component: ContractListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})

export class AppRoutingModule {}
