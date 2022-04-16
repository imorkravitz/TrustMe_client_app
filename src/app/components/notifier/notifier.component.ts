import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifier',
  templateUrl: './notifier.component.html',
  styleUrls: ['./notifier.component.css' , '../../../styles.css']
})
export class NotifierComponent implements OnInit {

  data: any;

  constructor(@Inject (MAT_SNACK_BAR_DATA) data: any,
  public snackBarRef: MatSnackBarRef<NotifierComponent>) {
    this.data = data;
  }

  ngOnInit(): void {
  }

}
