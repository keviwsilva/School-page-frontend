import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { HomepageComponent } from "./homepage/homepage.component";
import { PostsComponent  } from "./posts/posts.component";
import { EditinfoComponent } from "./editinfo/editinfo.component";
import { AuthGuard } from './auth.guard';

const routes: Routes = [ 
  {
  path: '', redirectTo: 'home', pathMatch: 'full'
},
  {
    path: 'home', component: HomepageComponent
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'editposts', component: PostsComponent, canActivate: [AuthGuard] 
  },
  {
    path: 'editinfo', component: EditinfoComponent, canActivate: [AuthGuard] 
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
