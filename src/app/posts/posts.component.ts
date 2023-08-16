import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ServiceService } from 'src/_service/service.service';
import { response } from 'express';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGuardService } from '../guard/auth-guard.service';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  
  
  pts_id!: number;
  posts: any[] = [];
  title!: string;
  description!: string;
  videoFile!: File;
  imageFile!: File;
  updatedTitle: any;
  updatedDescription: any;


  constructor(private postService: ServiceService, private route: ActivatedRoute, private authGuardService: AuthGuardService, private router: Router){};


  ngOnInit(): void {
    this.getPosts();
  }

  onSubmit() {
    if (!this.title || !this.description || (!this.videoFile && !this.imageFile)) {
      // Handle form validation here if required
      return;
    }

    const formData = new FormData();
    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('file', this.videoFile || this.imageFile);

  

    this.postService.sendDataToBackend(formData)
      .subscribe(
        (response) => {
          console.log('Data sent to backend successfully:', response);
          window.location.reload();
          // Handle success response from the backend if required
        },
        (error) => {
          console.error('Error while sending data to backend:', error);
          // Handle error response from the backend if required
        }
      );
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


  onVideoSelected(event: any) {
    this.videoFile = event.target.files[0];
  }

  onImageSelected(event: any) {
    this.imageFile = event.target.files[0];
  }

  getImageUrl(imageFileName: string): string {
    return `http://localhost:5001/uploads/${imageFileName}`;
  }

  getVideoUrl(videoFileName: string): string {
    return `http://localhost:5001/uploads/${videoFileName}`;
  }

  
  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(
      (response) => {
        console.log(response.message); // Log the success message from the backend
        this.getPosts(); // Refresh the posts after successful deletion
      },
      (error) => {
        console.error('Erro ao deletar post:', error);
      }
    );
  }
  

  
  onUpdatePost(postId: number) {
    // Find the post with the given postId from the array of posts
    const postToUpdate = this.posts.find((post) => post.pts_id === postId);

    // Check if the post was found
    if (!postToUpdate) {
      console.error('Post not found');
      return;
    }

    // You can use a modal or a form to get the updated values from the user.
    // For this example, I'll assume you have two variables to store the updated values.

    // Assuming you have these two properties in the component to store the updated values:
    // updatedTitle: string;
    // updatedDescription: string;

    // Check if updated values are provided (you can implement validation as per your requirements)
    if (!this.updatedTitle || !this.updatedDescription) {
      console.error('Updated values are missing');
      return;
    }

    // Update the post data
    postToUpdate.pts_title = this.updatedTitle;
    postToUpdate.pts_description = this.updatedDescription;

    // Send the updated data to the backend using the service method
    this.postService.updatePost(postToUpdate).subscribe(
      (response) => {
        console.log('Post updated successfully:', response);
        // Optionally, you can refresh the posts list after successful update
        this.getPosts();
        // Clear the updated values after successful update
        this.updatedTitle = '';
        this.updatedDescription = '';
      },
      (error) => {
        console.error('Error while updating post:', error);
      }
    );
  }

  
  logout() {
    // Remove o token do LocalStorage
    localStorage.removeItem('auth_token');

    // Chama a rota de logout no backend (opcional, apenas se você quiser fazer alguma ação no backend)
    this.authGuardService.logout().subscribe(
      (response) => {
        this.router.navigate(['/login']);
        // Sucesso - Faça algo aqui, como redirecionar para a página de login
      },
      (error) => {
        // Erro - Faça algo aqui, como exibir uma mensagem de erro
      }
    );
  }

}