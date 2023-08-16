import { Component } from '@angular/core';
import { ServiceService} from "../../_service/service.service";
import { OnInit } from '@angular/core';

export interface Post {
  pts_video: string;
  pts_id: number
  pts_title: string;
  pts_description: string;
  pts_image: string; 
}

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit{

  posts: Post[] = [];


  constructor(private postService: ServiceService){}

  ngOnInit(): void {
    this.getPosts();
  }


  getPosts() {
    this.postService.getPost().subscribe(
      (response) => {
        this.posts = response.posts;
        console.log(this.posts)
      },
      (error) => {
        console.error('Erro ao obter posts:', error);
      }
    );
  }

  getImageUrl(imageFileName: string): string {
    // Replace 'http://localhost:3000' with the actual base URL of your backend
    return `http://localhost:5001/uploads/${imageFileName}`;
  }

  getVideoUrl(videoFileName: string): string {
    // Replace 'http://localhost:3000' with the actual base URL of your backend
    return `http://localhost:5001/uploads/${videoFileName}`;
  }



}
