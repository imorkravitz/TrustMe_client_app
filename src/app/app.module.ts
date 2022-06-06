import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ContractComponent } from './components/contract/my-contract/contract.component';
import { NewContractComponent } from './components/contract/new-contract/new-contract.component'
import { ContractListComponent } from './components/contract/contract-list/contract-list.component';
import { ReactiveFormsModule , FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module'
import { GridListOverview } from './components/grid/grid.component'

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
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSortModule } from '@angular/material/sort';

import { InterceptorService } from './components/loader/interceptor.service';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { NotifierComponent } from './components/notifier/notifier.component';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

import { ProfileComponent } from './components/profile/profile.component';
import { RecomendationComponent } from './components/profile/recomendation/recomendation.component';
import { TransactionHistoryComponent } from './components/profile/transaction-history/transaction-history.component';
import { PersonalDetailsComponent } from './components/profile/personal-details/personal-details.component';
import { NewDealsComponent } from './components/profile/new-deals/new-deals.component'
import { HomepageComponent } from './components/homepage/homepage.component';
import { PartnerComponent } from './components/partner/partner.component';
import { PartnerDealsComponent } from './components/partner/partner-deals/partner-deals.component';
import { PartnerDetailsComponent } from './components/partner/partner-details/partner-details.component';
import { PartnerRecomendationComponent } from './components/partner/partner-recomendation/partner-recomendation.component';
import { PartnerTransactionHistoryComponent } from './components/partner/partner-transaction-history/partner-transaction-history.component';
import { CreateRecomendationComponent } from './components/partner/create-recomendation/create-recomendation.component';
import { DialogElementsExample, DialogElementsExampleDialog } from './components/dialog/dialog.component'

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
    NotifierComponent,
    NewContractComponent,
    FooterComponent,
    AboutUsComponent,
    ProfileComponent,
    RecomendationComponent,
    TransactionHistoryComponent,
    PersonalDetailsComponent,
    NewDealsComponent,
    HomepageComponent,
    PartnerComponent,
    PartnerDealsComponent,
    PartnerDetailsComponent,
    PartnerRecomendationComponent,
    PartnerTransactionHistoryComponent,
    CreateRecomendationComponent,
    DialogElementsExample,
    DialogElementsExampleDialog
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
    MatSnackBarModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatBadgeModule,
  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  // a javascript object provided
  // identifier of the token - which angular wil look for both imported above,
  // we can have multi intecptor so value is trueimport { AbstractControl } from '@angular/forms/forms';

  bootstrap: [AppComponent]
})
export class AppModule { }
