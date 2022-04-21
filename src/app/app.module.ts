import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ContractComponent } from './components/contract/my-contract/contract.component';
import {NewContractComponent} from './components/contract/new-contract/new-contract.component'
import { ContractListComponent } from './components/contract/contract-list/contract-list.component';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatGridListModule } from '@angular/material/grid-list';
import { GridListOverview } from './components/grid/grid.component'
import { MatExpansionModule } from '@angular/material/expansion';

// for server RestAPI
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
// materials
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthInterceptor } from './components/auth/auth-interceptor';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { InterceptorService } from './components/loader/interceptor.service';
import { NavComponent } from './components/nav/nav.component';
import { DialogComponent } from './components/dialog/dialog.component'
import { HomeComponent } from './components/home/home.component';
import { NotifierComponent } from './components/notifier/notifier.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FooterComponent } from './components/Home-Page-Content/footer/footer.component';
import { AboutUsComponent } from './components/Home-Page-Content/about-us/about-us.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    SignupComponent,
    GridListOverview,
    NavComponent,
    HomeComponent,
    ContractComponent,
    ContractListComponent,
    DialogComponent,
    NotifierComponent,
    NewContractComponent,
    FooterComponent,
    AboutUsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatButtonModule,
    MatTableModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatDialogModule,
    MatSnackBarModule

  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],

  // a javascript object provided
  // identifier of the token - which angular wil look for both imported above,
  // we can have multi intecptor so value is trueimport { AbstractControl } from '@angular/forms/forms';

  bootstrap: [AppComponent]
})
export class AppModule { }
