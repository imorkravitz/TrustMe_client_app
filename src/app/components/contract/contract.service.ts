import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Contract } from './contract.model';

@Injectable({providedIn: 'root'})

export class ContractService {

  private contracts : Contract[] = [];


constructor(private http: HttpClient, private router: Router) {}

getAuthStatusListener() {
  //return this.authStatusListener.asObservable();
}

// createcontent(email: string, password: string, confirmPassword: string, firstName: string,
//    lastName: string,birthDate: Date, phoneNumber: string){

//     const authData : AuthData = {
//       email: email,
//       password: password,
//       confirmPassword: confirmPassword,
//       firstName: firstName,
//       lastName: lastName,
//       birthDate: birthDate,
//       phoneNumber: phoneNumber,
//     }
//     this.http.
//     post("http://localhost:3000/api/users/signup",authData).
//     subscribe(response =>{
//       console.log(response);
//     })
//   }

getContract(postId: string | null) {
  // return [...this.posts.filter(post => post.id === postId)];
}

deleteContract(postId: string | undefined) {
  // this.http.delete("http://localhost:3000/api/posts/" + postId)
  // .subscribe(()=>{
  //    const tempPost = this.posts.filter(post => post.id !== postId)
  //    this.posts = tempPost;
  //    this.postUpdated.next([...this.posts]);
  // });
}

addContract(title: string, content: string) {
  // const post : Post ={ id: undefined,title: title, content: content};
  // // post data from client(angular side) to server
  // this.http.post<{message: string, postId : string}>('http://localhost:3000/api/posts', post)
  // .subscribe((responseData)=>{
  //   console.log(responseData.message)
  //   post.id = responseData.postId;
  //   this.posts.push(post);
  //   this.postUpdated.next([...this.posts]);
  // })
}

getAllContract() {
  // get data from a server to client(angular side)
//   this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts')
//   .pipe(map((postData)=>{
//     return postData.posts.map((post: any) => {
//       return {
//         title: post.title,
//         content: post.content,
//         id: post._id
//       };
//     });
//   }))
//   .subscribe((transformedPost)=>{
//     this.posts = transformedPost;
//     this.postUpdated.next([...this.posts]);
//   })
}


}
