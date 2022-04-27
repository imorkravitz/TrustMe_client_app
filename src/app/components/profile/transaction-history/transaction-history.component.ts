import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { Contract } from '../profile.model';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})

export class TransactionHistoryComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['side', 'deposit', 'date', 'emailOfAnotherSide'];
  dataSource!: MatTableDataSource<Contract>;
  contracts : Contract[] = [];
  private constractsSub: Subscription | undefined;
  flag: boolean = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public profileService: ProfileService ) {}
  ngOnInit(): void {

    this.profileService.getAllContract();
    this.liveDataOfContract()

    // this.profileService.getAllContract();
    // this.constractsSub = this.profileService.getContractUpdatedListener().subscribe(( contracts : Contract[]): void =>{

    //   this.contracts = contracts;
    //   this.dataSource = new MatTableDataSource(this.contracts);
    // })
  }

  ngAfterViewInit() {
    this.liveDataOfContract()
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;
  }

  // this functions help us to arrange the data in the table
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  liveDataOfContract(){
    this.constractsSub = this.profileService.getContractUpdatedListener().subscribe(( contracts : Contract[]): void =>{
      this.contracts = contracts;
      console.log(this.contracts)
      this.dataSource = new MatTableDataSource(this.contracts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }
}


