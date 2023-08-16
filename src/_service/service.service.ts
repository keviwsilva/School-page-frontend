import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse} from "@angular/common/http";
import { Observable } from 'rxjs';

import { Post } from '../app/homepage/homepage.component'; // Replace with the correct path to the interface file


@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  private serverUrl = "http://localhost:5001";

  constructor(private http:HttpClient) { }

  getPost(): Observable<{ posts: Post[] }> {
    const url = `${this.serverUrl}/post/findall`;
    return this.http.get<{ posts: Post[] }>(url);
  }

  
  deletePost(postId: number): Observable<any> {
    return this.http.delete<any>(`${this.serverUrl}/post/delete/${postId}`);
  }



  sendDataToBackend(formData: FormData) {
    // Replace 'backend_url' with the actual URL where your backend is hosted
    const backendUrl = `${this.serverUrl}/post/create`;

    return this.http.post(backendUrl, formData);
  }


  

  // updatePost(post: any): Observable<any> {
  //   return this.http.put(`${this.serverUrl}/post/update/${pts_id}`, post);
  // }
  updatePost(post: any): Observable<any> {
    const updateUrl = `${this.serverUrl}/api/posts/${post.pts_id}`;
    return this.http.put(updateUrl, post);
  }

}


