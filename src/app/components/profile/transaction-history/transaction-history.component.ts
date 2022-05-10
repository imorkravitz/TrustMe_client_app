import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Contract } from '../profile.model';
import { ProfileService } from '../profile.service';
import { AuthService } from '../../auth/auth.service'
import { findContracts } from '../../profile/profile.model'

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})

export class TransactionHistoryComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['depositSeller', 'depositBuyer', 'date', 'email'];
  dataSource!: MatTableDataSource<Contract>;
  contracts : Contract[] = [];
  private constractsSub: Subscription | undefined;
  flag: boolean = true;
  contractPerPage = 3;
  pageSizeOptions = [1,3,5,10];
  userId: String;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public profileService: ProfileService,
    public authService: AuthService ) {
      this.userId = ""
    }
  ngOnInit(): void {
    this.profileService.getAllContract();
    this.liveDataOfContract();
    this.authService.getToken();
    this.userId = this.authService.getUserId();
  }

  ngAfterViewInit() {
    this.liveDataOfContract()
  }

  // this functions help us to arrange the data in the table
  applyFilter(event: Event)
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  liveDataOfContract(){
    this.constractsSub = this.profileService.getContractUpdatedListener().subscribe(( contracts : Contract[]): void =>{
      this.contracts = contracts;
      this.dataSource = new MatTableDataSource(this.contracts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}
