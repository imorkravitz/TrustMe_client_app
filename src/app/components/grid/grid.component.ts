import {Component} from '@angular/core';
import { Title } from './grid-data.model'
/**
 * @title Basic grid-list
 */
@Component({
  selector: 'grid-list',
  styleUrls: ['./grid.component.css'],
  templateUrl: './grid.component.html'
})
export class GridListOverview {
  tiles: Title[] = [
    {text: 'Transact Safely With Our Peer-to-Peer', cols: 3, rows: 1, color: 'ffffff'},
    {text: 'TrustMe Payment Platform', cols: 3, rows: 1, color: 'ffffff'},

  ];

}
