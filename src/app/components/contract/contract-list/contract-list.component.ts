import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Contract } from '../contract.model';
import { ContractService } from '../contract.service';

@Component({
  selector: 'app-contract-list',
  templateUrl: './contract-list.component.html',
  styleUrls: ['contract-list.component.css'],
})
export class ContractListComponent implements OnInit, OnDestroy {
  // private contracts : Contract[] = [];
  private postsSub: Subscription | undefined;

  constructor(public contractService: ContractService) {}
  contracts = [
    {
      title: 'seller1',
      text: 'Some quick example text to build on the card title and make up thebulk of the cards content.',
      item1: 'item1',
      item2: 'item2',
      item3: 'item3',
    },
    {
      title: 'seller2',
      text: 'Some quick example text to build on the card title and make up thebulk of the cards content.',
      item1: 'item1',
      item2: 'item2',
      item3: 'item3',
    },
    {
      title: 'seller3',
      text: 'Some quick example text to build on the card title and make up thebulk of the cards content.',
      item1: 'item1',
      item2: 'item2',
      item3: 'item3',
    },
    {
      title: 'seller4',
      text: 'Some quick example text to build on the card title and make up thebulk of the cards content.',
      item1: 'item1',
      item2: 'item2',
      item3: 'item3',
    },
    {
      title: 'seller5',
      text: 'Some quick example text to build on the card title and make up thebulk of the cards content.',
      item1: 'item1',
      item2: 'item2',
      item3: 'item3',
    },
  ];

  // is a place to put the code that we need to execute at very first as soon as the class is instantiated.
  ngOnInit(): void {
    // this.postService.getPosts();
    // this.postsSub = this.postService.getPostsUpdatedListener().subscribe((posts: Post[]): void =>{
    //   this.posts = posts;
    // })
  }

  ngOnDestroy(): void {
    // this.postsSub?.unsubscribe();
  }

  onDelete(postId: String | undefined): void {
    // console.log("onDelete")
    // if(postId != null) {
    //   this.postService.deletePost(postId);
    // }
  }
}
