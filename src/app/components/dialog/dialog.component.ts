import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';

/**
 * @title Dialog elements
 */
@Component({
  selector: 'dialog-first',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css'],

})
export class DialogElementsExample {
  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(DialogElementsExampleDialog);
  }
}

@Component({
  selector: 'dialog-second',
  templateUrl: './dialog.component.second.html',
})
export class DialogElementsExampleDialog implements OnInit {
  isDarkTheme:boolean = true;

ngOnInit(): void {
  this.isDarkTheme = localStorage.getItem('theme') === "Dark" ? true : false;

}

storeThemeSelection() {
  localStorage.setItem('theme', this.isDarkTheme ? "Dark" : "Light");
}

}
