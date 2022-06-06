import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { HistoryContract } from '../partner.model';
import { PartnerService } from '../partner.service';
import { AuthService } from '../../auth/auth.service';
import { ActivatedRoute } from '@angular/router';
import { ContractService } from '../../contract/contract.service'

@Component({
  selector: 'app-partner-transaction-history',
  templateUrl: './partner-transaction-history.component.html',
  styleUrls: ['./partner-transaction-history.component.css']
})
export class PartnerTransactionHistoryComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['email', 'depositSeller', 'depositBuyer', 'date', 'status'];
  dataSource!: MatTableDataSource<HistoryContract>;
  historyContracts : HistoryContract[] = [];
  private constractsSub: Subscription | undefined;
  flag: boolean = true;
  contractPerPage = 3;
  pageSizeOptions = [1,3,5,10];
  userId: any;
  emailBuyer: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public partnerService: PartnerService,
    public authService: AuthService,
    private _Activatedroute:ActivatedRoute,
    private contractService: ContractService) {
      this.userId = ""
    }
  ngOnInit(): void {
    this.contractService.getContractById();
    this.emailBuyer = this._Activatedroute.snapshot.paramMap.get("id");
    this.partnerService.getHistoryByEmail(this.emailBuyer)
    this.liveDataOfContract();
    this.authService.getToken();
    this.userId = this.authService.getUserId();
  }

  ngAfterViewInit() {
    this.liveDataOfContract()
  }

  // this functions help us to arrange the data in the table
  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  liveDataOfContract(){
    this.constractsSub = this.partnerService.getHistoryContractUpdatedListener().subscribe(( contracts : HistoryContract[]): void =>{
      this.historyContracts = contracts;
      this.dataSource = new MatTableDataSource(this.historyContracts);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

}
